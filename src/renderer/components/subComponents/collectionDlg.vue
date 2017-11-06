<template>
    <el-dialog v-if="orderInfo" :close-on-click-modal="false" :close-on-press-escape="false" title="收款"
               v-model="isDlgVisable">
        <p class="apartNameP">{{orderInfo.apartmentName}}{{orderInfo.roomNumber}}<span
                v-if="orderInfo.roomNumber">室</span></p>
        <p class="basicInfo">
            <span>租客: {{orderInfo.payeeDraweeRealName}}</span>
            <span>账单周期:{{orderInfo.orderStartTime | dateTirm10}} - {{orderInfo.orderEndTime | dateTirm10}}</span>
        </p>
        <p v-if="orderInfo.contractNo" class="basicInfo">
            <span>合同编号: {{orderInfo.contractNo}}</span>
        </p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-top: 30px" label-position="top"
                 label-width="100px" class="demo-ruleForm">
            <el-form-item label="待支付金额">
                <span style="font-size: 16px">{{orderInfo.notPaidAmount | amount2}}元</span>
                <el-tag class="tagTotal">{{orderInfo.orderType | orderType}}</el-tag>
            </el-form-item>
            <el-form-item label="流水方式" prop="transactionMethod">
                <el-radio-group v-model="ruleForm.transactionMethod">
                    <el-col :span="6" v-for="item in getTransactionType" :key="item.key">
                        <el-radio :label="item.key">{{item.value}}</el-radio>
                    </el-col>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="收款凭证" prop="contractNo">
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
        props: ['showDialog', 'currentOrderId'],
        data: function () {
            return {
                uploadUri: this.$api.uploadUri,
                isDlgVisable: this.showDialog,
                orderId: this.currentOrderId,
                orderInfo: null,
                uploadFiles: null,
                transactionVoucher: [],
                ruleForm: {
                    transactionMethod: "",
                    transactionNo: "",
                    description: ""
                },
                rules: {
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
            getOrderByOrderId: function () {
                var that = this;
                this.$api.get(constants.KCURLS.GETNORMALORDERBYORDERID + this.orderId,
                    function (res) {
                        that.orderInfo = res;
                    });
            },
            hideDialog() {
                this.isDlgVisable = false;
            },
            submitForm: function () {
                var that = this;
                that.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        that.getUploadFiles();
                        var data = Object.assign({
                            paymentSource: 'Others',
                            orderId: that.orderId,
                            amount: that.orderInfo.notPaidAmount,
                            transactionCategory: that.orderInfo.orderCategory,
                            orderModel: "Normal",
                            transactionVoucher: that.transactionVoucher.join(",")
                        }, that.ruleForm);
                        that.showLoading();
                        that.$api.post(constants.KCURLS.CREATETRANSACTION, data, function (res) {
                            if (res.succeeded) {
                                var transaction = {
                                    transactionId: res.data.transactionId,
                                    transactionState: "Succeed"
                                };
                                that.$api.post(constants.KCURLS.UPDATETRANSACTIONANONYMOUS, transaction, function (res1) {
                                    that.$emit('on-refresh-collection');
                                    that.hideLoading();
                                    that.isDlgVisable = false;
                                }, function (err) {
                                    that.hideLoading();
                                    that.$message.error(err.message);
                                });
                            } else {
                                that.$message.error(res.message);
                                that.hideLoading();
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
            this.getOrderByOrderId();
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
