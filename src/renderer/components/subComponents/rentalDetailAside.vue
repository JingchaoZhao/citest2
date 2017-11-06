<template>
    <div>
        <n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="rentalAsideRight"
                  style="overflow-y: scroll;" :header="false">
            <div class="asideHeader">
                租房合同信息详情
                <el-tag v-if="currentContract" color="#ff8c14">
                    {{currentContract.contractResponse.contractType | contractType}}
                </el-tag>
                <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
            </div>
            <div v-if="currentContract" class="n3AsideBody">
                <p class="asideHouseName">
                    {{currentContract.roomResponse.apartmentName}} {{currentContract.roomResponse.roomNumber}}室</p>
                <div v-show="currentContract && currentContract != '' && currentContract.contractResponse.confirmed && (currentContract.contractResponse.checkoutType == 'NotCheckout')"class="roomEditDiv">
                    <el-button class="greenNewBtn" @click.native="openAddContractDlg">续租</el-button>
                    <el-button class="redNewBtn" @click.native="openThrowALeaseDlg">退租</el-button>
                </div>
                <contractdetail :contractDetail="currentContract"></contractdetail>
            </div>
        </n3-aside>
        <addcontractdlg :showDialog='openContractDlg' @on-result-change="onContractResultChange"></addcontractdlg>
        <throwleasedlg v-if="throwLeaseDlg" :showDialog='throwLeaseDlg' :contractId="currentContractId"
                       @on-result-change="onThrowALeaseResultChange"
                       @on-result-checkout="onThrowLeaseCheckout"></throwleasedlg>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    // import {n3Aside} from 'N3-components'
    import contractdetail from './contractDetail'
    import addcontractdlg from './addContractDlg'
    import throwleasedlg from './throwLeaseDlg'
    import constants from '../../constants/index'
    export default {
        data: function () {
            return {
                currentContract: null,
                openContractDlg: false,
                throwLeaseDlg: false,
                currentContractId: ""
            }
        },
        methods: {
            ...mapActions([
                'visibledialog',
                'showLoading',
                'hideLoading'
            ]),
            openRight (contractId) {
                this.currentContractId = contractId;
                this.getcontract();
                this.$refs.rentalAsideRight.open();
            },
            closeRight () {
                this.$refs.rentalAsideRight.close();
            },
            openAddContractDlg: function () {
                this.openContractDlg = true;
            },
            onContractResultChange(val) {
                this.openContractDlg = val;
            },
            openThrowALeaseDlg: function () {
                var contractId = this.currentContractId;
                var that = this;
                that.showLoading();
                that.$api.get(constants.KCURLS.CHECKOUTFIRSTSTEP + contractId, function (res) {
                    that.hideLoading();
                    if (res.data.staged) {
                        if (res.data.amount > 0) {
                            that.$confirm('处理该房间的所有分期账单?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                that.showLoading();
                                that.$api.get(constants.KCURLS.CHECKOUTSECONDSTEP + contractId, function () {
                                    that.hideLoading();
                                    that.throwLeaseDlg = true;
                                }, () => {
                                    that.hideLoading();
                                });
                            });
                        } else {
                            that.throwLeaseDlg = true;
                        }
                    } else if (res.data.canCheckouted) {
                        that.throwLeaseDlg = true;
                    } else {
                        that.$confirm('请先处理完房间中的账单！', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                        });
                    }
                }, () => {
                    that.hideLoading();
                });
            },
            onThrowALeaseResultChange(val) {
                this.throwLeaseDlg = val;
            },
            onThrowLeaseCheckout(val){
                this.getcontract();
            },
            getcontract: function () {
                var that = this;
                this.$api.get(constants.KCURLS.GETCONTRACTBYCONTRACTID + this.currentContractId,
                    function (res) {
                        that.currentContract = res;
                        that.currentContract.contractImgList = [];
                        that.currentContract.idcardImgList = [{
                            name: 'idcard1',
                            url: that.currentContract.simpleTenantInfoResponse.credentialFacePhotoUrl
                        },
                            {
                                name: 'idcard2',
                                url: that.currentContract.simpleTenantInfoResponse.credentialBackPhotoUrl
                            }];
                        var resposeConImgList = that.currentContract.contractResponse.contractPictures.split(',');
                        for (var i = 0; i < resposeConImgList.length; i++) {
                            var item = {
                                name: 'contractInfo' + i,
                                url: resposeConImgList[i]
                            }
                            that.currentContract.contractImgList.push(item);
                        }
                    });
            }
        },
        watch: {},
        events: {},
        components: {
            // n3Aside,
            contractdetail,
            addcontractdlg,
            throwleasedlg
        }
    }
</script>
<style scoped>
    .el-button.smallTextBtn.el-button--default {
        width: 55px;
    }
</style>
<style type="less">
</style>