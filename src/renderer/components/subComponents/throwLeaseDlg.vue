<template>
    <el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false"
               title="退租" class="throwLeaseDlgContent" v-model="isDlgVisable">
        <p class="apartNameP" v-if="roomInfo">{{roomInfo.apartmentName}} {{roomInfo.roomNumber}}室</p>
        <p class="basicInfo" v-if="tenantInfo">
            <span>租客: {{tenantInfo.realName}}</span>
            <span>手机: {{tenantInfo.cellphone}}</span>
            <span>身份证: {{tenantInfo.idCardNo}}</span>
        </p>
        <p class="basicInfo" v-if="contractInfo">
            <span>合同编号: {{contractInfo.contractNo}}</span>
        </p>
        <el-steps class="throwStep" :active="active" finish-status="success">
            <el-step title="费用处理"></el-step>
            <el-step title="账单处理"></el-step>
            <el-step title="退租"></el-step>
        </el-steps>

        <div v-show="active==0">
            <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm"
                     label-width="100px" class="demo-ruleForm">
                <el-form-item label="费用处理" prop="orderTypes">
                    <el-checkbox-group v-model="ruleForm.orderTypes">
                        <el-col :span="6" v-for="item in getOrderType" :label="item.value" :key="item.value">
                            <el-checkbox :label="item">{{item.value}}</el-checkbox>
                        </el-col>
                    </el-checkbox-group>
                </el-form-item>
                <el-row :gutter="20" style="overflow: hidden;" class="gutterrowInput">
                    <el-col :span="12" v-for="(item,index) in ruleForm.feeLoanList" :label="item.label" :key="item.label">
                        <el-form-item :label="item.label" :prop="'feeLoanList[' + index + '].amount'"
                                      :rules="rules.inputMoney">
                            <el-input placeholder="请输入金额" v-model="item.amount">
                                <el-select class="selectInInput" v-model="item.orderCategory" slot="prepend"
                                           placeholder="请选择">
                                    <el-option label="应收" value="In" key="In">应收</el-option>
                                    <el-option label="应付" value="Out" key="Out">应付</el-option>
                                </el-select>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div v-show="active==1">
            <div style="margin-bottom:10px" class="littleTableLable">
                支付账单<span @click="queryAllorders" style="float:right;cursor:pointer"><i
                    class="bf_icon_refresh"></i></span>
            </div>
            <el-table class="littleTable" :data="unFinishOrders" border style="width: 100%">
                <el-table-column label="账单类型">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.orderCategory == 'In'" color="#07bf96">收</el-tag>
                        <el-tag v-else color="#ff8c14">付</el-tag>
                        <span style="margin-left:5px">{{scope.row.orderType | orderType}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="账单金额">
                    <template slot-scope="scope">
                        {{scope.row.amount | amount2}}
                    </template>
                </el-table-column>
                <el-table-column label="应收租日期">
                    <template slot-scope="scope">
                        {{scope.row.paymentTime | dateTirm10}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="deleteOrder(scope.row.orderId)" size="small">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-form v-show="active==2" :model="ruleForm2" label-position="top" :rules="rules2" ref="ruleForm2"
                 label-width="100px" class="demo-ruleForm">
            <el-form-item label="待处理金额">
                <span style="font-size:24px;color:#000000;">{{totalOrdersAmount | amount2}}元
          		    <el-tag style="vertical-align: middle"
                            color="#07bf96">{{totalOrderCategory | transactionCategory}}</el-tag>
          		</span>
            </el-form-item>
            <el-form-item label="支付方式" prop="paymentChannel">
                <el-radio-group style="width: 100%" v-model="ruleForm2.paymentChannel">
                    <el-col style="margin-bottom: 10px;" :span="4" v-for="item in getTransactionType" :key="item.key">
                        <el-radio :label="item.key">{{item.value}}</el-radio>
                    </el-col>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="费用处理">
                <el-upload :action="uploadUri"   list-type="picture-card" :on-success="handleUpload"
                           :on-preview="handlePreview" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="流水编号" prop="transactionNo">
                <el-input v-model="ruleForm2.transactionNo"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="description">
                <el-input type="textarea" v-model="ruleForm2.description"></el-input>
            </el-form-item>
        </el-form>
        <el-form v-show="active==3" :model="ruleForm3" label-position="top" :rules="rules3" ref="ruleForm3"
                 label-width="100px" class="demo-ruleForm">
            <el-form-item label="退租方式" prop="checkoutType">
                <el-radio-group style="width: 100%" v-model="ruleForm3.checkoutType">
                    <el-col style="margin-bottom: 10px;" :span="6" v-for="item in checkoutTypes" :key="item.key">
                        <el-radio :label="item.key">{{item.value}}</el-radio>
                    </el-col>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <div v-show="active==0" class="blockBtn greenBtn" @click="submitForm()">下一步</div>
            <span v-show="active==1" style="float:left;font-size:16px;color:#8c96ab;font-weight:normal">
                {{totalOrderCategory | transactionCategory}}合计：<span style="color:#545454">{{totalOrdersAmount | amount2}}元</span></span>
            <div v-show="active==1" class="blockBtn greenBtn" @click="submitForm2()">下一步</div>
            <div v-show="active==2" class="blockBtn greenBtn" @click="submitForm3()">确定</div>
            <div v-show="active==3" class="blockBtn greenBtn" @click="submitForm4()">完成</div>
        </div>
    </el-dialog>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import constants from '../../constants/index'
    import validation from '../../validation/index'
    export default {
        props: ['showDialog', 'contractId'],
        data: function () {
            return {
                active: 0,
                isDlgVisable: this.showDialog,
                tenantInfo: null,
                roomInfo: null,
                contractInfo: null,
                ruleForm: {
                    orderTypes: [],
                    feeLoanList: []
                },
                rules: {
                    inputMoney: [{
                        required: true,
                        message: '请输入金额',
                        trigger: 'blur'
                    },
                        {
                            validator: (rule, value, callback) => {
                                if (!constants.REGEXS.AMOUNT.test(value)) {
                                    callback(new Error("金额格式错误"));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        },
                    ]
                },
                unFinishOrders: null,
                totalOrdersAmount: 0,
                totalOrderCategory: "In",
                //
                uploadUri: this.$api.uploadUri,
                uploadFiles: null,
                ruleForm2: {
                    paymentChannel: "",
                    transactionNo: "",
                    description: ""
                },
                rules2: {
                    transactionMethod: validation.requiredChange
                },
                checkoutTypes: [{
                        key: 'Normal',
                        value: '到期退租'
                    },
                    {
                        key: 'BreakContracts',
                        value: '违约退租'
                    }, {
                        key: 'Sublet',
                        value: '转租退租'
                    },
                    {
                        key: 'Agreement',
                        value: '协议退租'
                    }
                ],
                ruleForm3: {
                    checkoutType: ''
                },
                rules3: {
                    checkoutType: validation.requiredChange
                }
            }
        },
        methods: {
            ...mapActions([
                'visibledialog',
                'showLoading',
                'hideLoading'
            ]),
            submitForm() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.feeLoanList.length > 0) {
                            var createOrderlist = [];
                            this.ruleForm.feeLoanList.forEach(function (item) {
                                createOrderlist.push({
                                    orderCategory: item.orderCategory,
                                    orderType: item.orderType,
                                    amount: item.amount * 100
                                });
                            });
                            var data = {
                                contractId: this.contractId,
                                apartmentId: this.contractInfo.apartmentId,
                                roomId: this.contractInfo.roomId,
                                tenantId: this.contractInfo.tenantId,
                                createOrderParams: createOrderlist
                            };
                            var that = this;
                            that.showLoading();
                            this.$api.post(constants.KCURLS.BATCHCREATE, data, function (res) {
                                that.hideLoading();
                                if (res.succeeded) {
                                    that.queryAllorders();
                                    that.active = 1;
                                } else {
                                    that.$message.error(res.message);
                                }
                            }, err=> {
                                that.hideLoading();
                            });
                        } else {
                            this.active = 1;
                        }
                    } else {
                        return false;
                    }
                });
            },
            submitForm2() {
                if (!this.unFinishOrders || this.unFinishOrders.length == 0) {
                    this.active = 3;
                }
                else {
                    this.active = 2;
                }
            },
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
            submitForm3() {
                this.$refs['ruleForm2'].validate((valid) => {
                    if (valid) {
                        var transactionVouchers = [];
                        if (this.uploadFiles != null && this.uploadFiles.length > 0) {
                            for (var i = 0; i < this.uploadFiles.length; i++) {
                                transactionVouchers.push(this.uploadFiles[i].response[0].url);
                            }
                        }
                        var data = Object.assign({
                            contractId: this.contractId,
                            transactionVoucher: transactionVouchers.join(',')
                        }, this.ruleForm2);
                        var that = this;
                        that.showLoading();
                        this.$api.post(constants.KCURLS.PAIDALLORDERS, data, function (res) {
                            that.hideLoading();
                            if (res.succeeded) {
                                that.active = 3;
                            } else {
                                that.$message.error(res.message);
                            }
                        }, err => {
                            that.hideLoading();
                        });
                    }
                });
            },
            submitForm4() {
                this.$refs['ruleForm3'].validate((valid) => {
                    if (valid) {
                        var data = Object.assign({
                            contractId: this.contractId
                        }, this.ruleForm3);
                        var that = this;
                        that.showLoading();
                        this.$api.post(constants.KCURLS.CHECKOUT, data, function (res) {
                            that.hideLoading();
                            if (res.succeeded) {
                                that.isDlgVisable = false;
                                that.$emit("on-result-checkout", true);
                            } else {
                                that.$message.error(res.message);
                            }
                        }, err => {
                            that.hideLoading();
                        });
                    }
                });
            },
            getContract: function () {
                var that = this;
                this.$api.get(constants.KCURLS.GETCONTRACTBYCONTRACTID + this.contractId, function (res) {
                    that.tenantInfo = res.simpleTenantInfoResponse;
                    that.roomInfo = res.roomResponse;
                    that.contractInfo = res.contractResponse;
                });
            },
            queryAllorders: function () {
                var that = this;
                that.showLoading();
                this.$api.get(constants.KCURLS.QUERYALLORDERSBYCONTRACTID + this.contractId, function (res) {
                    that.hideLoading();
                    that.unFinishOrders = res;
                    var totalAmount = 0;
                    that.unFinishOrders.forEach(function (item) {
                        if (item.orderCategory == "In") {
                            totalAmount += item.notPaidAmount;
                        } else {
                            totalAmount -= item.notPaidAmount;
                        }
                    }, err => {
                        that.hideLoading();
                    });
                    if (totalAmount >= 0) {
                        that.totalOrderCategory = "In";
                    } else {
                        that.totalOrderCategory = "Out";
                    }
                    that.totalOrdersAmount = Math.abs(totalAmount);
                });
            },
            deleteOrder: function (orderId) {
                var that = this;
                that.$confirm('删除该账单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.showLoading();
                    this.$api.post(constants.KCURLS.DELETEORDER, {orderId: orderId}, function (res) {
                        that.hideLoading();
                        if (res.succeeded) {
                            that.queryAllorders();
                        } else {
                            that.$message.error(res.message);
                        }
                    }, err => {
                        that.hideLoading();
                    });
                });
            }
        },
        created: function () {
            this.getContract();
            // this.queryAllorders();
        },
        watch: {
            'ruleForm.orderTypes': {
                handler(curVal) {
                    var that = this;
                    that.ruleForm.feeLoanList = [];
                    curVal.forEach(function (item) {
                        that.ruleForm.feeLoanList.push({
                            orderCategory: 'In',
                            orderType: item.key,
                            label: item.value,
                            amount: null
                        });
                    });
                },
                deep: true
            },
            isDlgVisable(val){
                this.$emit("on-result-change", val);
            }
        },
        computed: {
            ...mapGetters([
                'getOrderType',
                'getTransactionType'
            ])
        }
    }
</script>
<style scoped>
    p.singleFileModule {
        font-size: 30px;
        color: #ff0000;
    }

    .throwStep {
        margin: 30px auto 20px auto;
        padding-left: 80px;
    }

    .bf_icon_refresh {
        font-size: 20px;
    }
    .bf_icon_refresh:active {
        color: #13ce66;
    }
</style>
<style type="less">
    .el-row.gutterrowInput {
        overflow: hidden;
    }

    .el-row.gutterrowInput .el-row {
        overflow: hidden;
    }

    .selectInInput.el-select .el-input {
        width: 80px;
    }

    .throwLeaseDlgContent.el-dialog__wrapper .el-dialog__body {
        height: 613px;
    }
</style>