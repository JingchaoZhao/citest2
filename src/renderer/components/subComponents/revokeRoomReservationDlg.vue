<template>
    <el-dialog v-if="reservInfo" :close-on-click-modal="false" :close-on-press-escape="false" title="预定撤销"
               v-model="isDlgVisable">
        <p class="apartNameP">{{reservInfo.apartmentName}} {{reservInfo.roomNumber}}室</p>
        <p class="basicInfo">
            <span>租客: {{reservInfo.tenantName}}</span>
            <span>手机号: {{reservInfo.tenantCellphone}}</span>
        </p>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-top: 30px" label-position="top"
                 label-width="100px" class="demo-ruleForm">
            <el-form-item label="退款金额" prop="refundAmount">
                <el-input placeholder="输入金额" v-model="ruleForm.refundAmount"></el-input>
            </el-form-item>
            <el-form-item label="退款方式" prop="transactionMethod">
                <el-radio-group v-model="ruleForm.transactionMethod">
                    <el-col :span="6" v-for="item in getTransactionType" :key="item.key">
                        <el-radio :label="item.key">{{item.value}}</el-radio>
                    </el-col>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="收款凭证">
                <el-upload :action="uploadUri"   list-type="picture-card" :on-success="handleUpload"
                           :on-remove="handleRemove" :on-preview="handlePreview">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="流水编号" prop="transactionNo">
                <el-input placeholder="输入流水编号" v-model="ruleForm.transactionNo"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input placeholder="输入备注信息" v-model="ruleForm.description"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <div class="primaryBtn" @click="hideDialog">取 消</div>
            <div class="blockBtn greenBtn" @click="submitForm()">确 定</div>
        </div>
    </el-dialog>
</template>
<script>
    import constants from '../../constants/index'
    import validation from '../../validation/index'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        props: ['showDialog', 'currentReservInfo'],
        data: function () {
            return {
                uploadUri: this.$api.uploadUri,
                isDlgVisable: this.showDialog,
                reservInfo: this.currentReservInfo,
                uploadFiles: null,
                transactionVoucher: [],
                ruleForm: {
                    refundAmount: null,
                    transactionMethod:null,
                    transactionNo: null,
                    description: null,
                },
                rules: {
                    refundAmount: validation.amount,
                    transactionMethod: validation.requiredChange
                }
            }
        },
        methods: {
            ...mapActions([
                'visibledialog',
                'showLoading',
                'hideLoading'
            ]),
            handleUpload(res, file, imgs) {
                this.uploadFiles = imgs;
            },
            handleRemove(file, imgs) {
                this.uploadFiles = imgs;
            },
            handlePreview(file) {
                this.visibledialog({
                    url: file.url
                });
            },
            getUploadFiles: function () {
                this.transactionVoucher = [];
                if (this.uploadFiles != null && this.uploadFiles.length > 0) {
                    for (var i = 0; i < this.uploadFiles.length; i++) {
                        this.transactionVoucher.push(this.uploadFiles[i].response[0].url);
                    }
                }
            },
            hideDialog() {
                this.isDlgVisable = false;
            },
            submitForm: function () {
                var that = this;
                that.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        that.getUploadFiles();
                        var params = {
                            roomReservationId: this.currentReservInfo.roomReservationId,
                            refundAmount: that.ruleForm.refundAmount * 100,
                            transactionMethod: that.ruleForm.transactionMethod,
                            transactionNo: that.ruleForm.transactionNo,
                            description: that.ruleForm.description,
                            transactionVoucher: that.transactionVoucher.join(",")
                        }
                        that.showLoading();
                        that.$api.post(constants.KCURLS.REVOKEROOMRESERVATION, params, function (res) {
                            that.hideLoading();
                            if (res.succeeded) {
                                that.$emit('on-reserve-revoke');
                                that.$message({
                                    type: 'success',
                                    message: '撤销成功!'
                                });
                                that.hideDialog();

                            } else {
                                that.$message.error(res.message);
                            }

                        }, function (err) {
                            that.hideLoading();
                            that.$message.error(err.message);
                        });
                    }
                });
            }
        },
        created: function () {
            this.ruleForm.refundAmount = (this.reservInfo.depositeAmount / 100).toFixed(2);
        },
        watch: {
            isDlgVisable(val) {
                this.$emit("on-result-change", val);
            }
        },
        computed: {
            ...mapGetters([
                'getTransactionType'
            ])
        }
    }
</script>
<style scoped>
    p.apartNameP {
        font-size: 30px;
        color: rgba(58, 58, 58, 0.87);
        margin-bottom: 20px;
    }

    p.apartAddressP {
        font-size: 16px;
        color: #8c96ab;
        margin-bottom: 30px;
    }

    p.apartAddressP i {
        font-size: 20px;
        margin-right: 10px;
    }

    p.singleFileModule {
        font-size: 30px;
        color: #ff0000;
    }

    .tagTotal {
        background: #07bf96;
        border-radius: 43px;
        width: auto;
        height: 20px;
        line-height: 20px;
        display: inline-block;
        text-align: center;
        margin-left: 10px;
    }
</style>
<style>
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #07bf96;
        background: #07bf96;
    }

    .el-dialog .el-form-item__label {
        font-size: 16px;
        color: #3c4144;
    }
</style>
