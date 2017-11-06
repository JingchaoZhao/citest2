<template>
    <el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false" title="添加账单"
               v-model="isDlgVisable">
        <p v-if="this.isContractVisable" class="apartNameP">{{roomInfo.apartmentName}} {{roomInfo.roomNumber}}室</p>
        <p v-if="this.isContractVisable" class="basicInfo" style="margin-bottom:20px">
            <span>租客: {{tenantInfo.realName}}</span>
            <span>手机: {{tenantInfo.cellphone}}</span>
            <span>身份证: {{tenantInfo.idCardNo}}</span>
        </p>
        <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px">
            <p class="dlgSectionTitle"><i class="bf_icon_roomInfo"></i>账单类型</p>
            <el-form-item prop="orderCategory">
                <el-radio-group v-model="ruleForm.orderCategory">
                    <el-radio label="In" :disabled="category=='Out'">收款</el-radio>
                    <el-radio label="Out" :disabled="category=='In'">付款</el-radio>
                </el-radio-group>
            </el-form-item>
            <div v-if="!this.isContractVisable">
                <p class="dlgSectionTitle"><i class="bf_icon_uDetail"></i>账单人信息</p>
                <el-col :span="11">
                    <el-form-item label="姓名" prop="payeeDraweeName">
                        <el-input placeholder="输入姓名" v-model="ruleForm.payeeDraweeName">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item label="手机号" prop="payeeDraweeCellphone">
                        <el-input placeholder="输入手机号" :maxlength="11" v-model="ruleForm.payeeDraweeCellphone">
                        </el-input>
                    </el-form-item>
                </el-col>
                <p class="dlgSectionTitle"><i class="bf_icon_roomInfo"></i>房间信息</p>
                <div style="clear: both"></div>
                <el-col :span="11">
                    <el-form-item label="公寓名称" prop="apartmentId">
                        <el-select v-model="ruleForm.apartmentId" placeholder="请选择公寓">
                            <el-option v-for="item in apartmentsList" :label="item.apartmentName"
                                       :value="item.apartmentId"  :key="item.apartmentId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2">&nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item label="房间编号">
                        <el-input placeholder="输入房间编号" v-model="ruleForm.roomNumber">
                        </el-input>
                    </el-form-item>
                </el-col>
                <div style="clear: both"></div>
            </div>
            <el-form-item label="费用类型" prop="orderType">
                <el-radio-group v-model="ruleForm.orderType">
                    <el-col :span="6" v-for="item in getOrderType" :key="item.key">
                        <el-radio :label="item.key">{{item.value}}</el-radio>
                    </el-col>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="账单周期" prop="period">
                <el-date-picker v-model="ruleForm.period" type="daterange" align="right" placeholder="选择日期范围"
                                :picker-options="pickerOptions2">
                </el-date-picker>
            </el-form-item>
            <el-col :span="11">
                <el-form-item label="账单金额" prop="amount">
                    <el-input placeholder="输入账单金额" v-model="ruleForm.amount">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;
            </el-col>
            <el-col :span="11">
                <el-form-item label="应收款日" prop="paymentTime">
                    <el-date-picker v-model="ruleForm.paymentTime" align="left" type="date" placeholder="输入应收款日">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <div style="clear: both"></div>
            <el-form-item label="账单描述" prop="description">
                <el-input type="textarea" :rows="1" placeholder="请输入账单描述" v-model="ruleForm.description"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <div class="primaryBtn" @click="hideDialog">取 消</div>
            <div class="blockBtn greenBtn" @click="submitForm('collection')">直接收款</div>
            <div class="blockBtn greenBtn" @click="submitForm('bill')">生成账单</div>
        </div>
    </el-dialog>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import constants from '../../constants/index'
    import validation from '../../validation/index'
    export default {
        props: ['showDialog', 'currentContract', 'category'],
        data: function () {
            return {
                categoryInit: this.category,
                isDlgVisable: this.showDialog,
                isContractVisable: false,
                contract: null,
                roomInfo: null,
                tenantInfo: null,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近半年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 180);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 365);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                apartmentsList: null,
                ruleForm: {
                    contractId: "",
                    apartmentId: "",
                    roomId: "",
                    tenantId: "",
                    payeeDraweeName: "",
                    payeeDraweeCellphone: "",
                    payeeDraweeIdCardNo: "",
                    orderCategory: "",
                    orderType: "",
                    amount: "",
                    paymentTime: "",
                    description: "",
                    roomNumber: "",
                    period: ""
                },
                rules: {
                    orderCategory: validation.requiredChange,
                    payeeDraweeName: validation.requiredBlur,
                    payeeDraweeCellphone: validation.cellphone,
                    apartmentId: validation.requiredBlur,
                    orderType: validation.requiredChange,
                    period: validation.requiredDaterange,
                    paymentTime: validation.requiredDate,
                    amount: validation.amount
                }
            }
        },
        methods: {
            ...mapActions([
                'showLoading',
                'hideLoading'
            ]),
            createOrder: function (op) {
                var that = this;
                var params = {
                    contractId: that.ruleForm.contractId,
                    apartmentId: that.ruleForm.apartmentId,
                    roomId: that.ruleForm.roomId,
                    tenantId: that.ruleForm.tenantId,
                    payeeDraweeName: that.ruleForm.payeeDraweeName,
                    payeeDraweeCellphone: that.ruleForm.payeeDraweeCellphone,
                    payeeDraweeIdCardNo: that.ruleForm.payeeDraweeIdCardNo,
                    orderCategory: that.ruleForm.orderCategory,
                    orderType: that.ruleForm.orderType,
                    amount: that.ruleForm.amount,
                    paymentTime: that.ruleForm.paymentTime,
                    description: that.ruleForm.description,
                    roomNumber: that.ruleForm.roomNumber,
                    period: that.ruleForm.period
                };
                params.orderStartTime = (!(params.period[0] instanceof Date)) ? params.period[0].substr(0, 10) : params.period[0].Format("yyyy-MM-dd");
                params.orderEndTime = (!(params.period[1] instanceof Date)) ? params.period[1].substr(0, 10) : params.period[1].Format("yyyy-MM-dd");
                params.paymentTime = (!(params.paymentTime instanceof Date)) ? params.paymentTime.substr(0, 10) : params.paymentTime.Format("yyyy-MM-dd");
                params.amount = params.amount * 100;
                that.showLoading();
                that.$api.post(constants.KCURLS.ORDERCREATE, params, function (res) {
                    that.hideLoading();
                    if (res.succeeded) {
                        that.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        that.isDlgVisable = false;
                        if (op == "collection") {
                            that.$emit('on-add-success', res.data.orderId);
                        } else {
                            that.$emit('on-add-success');
                        }

                    } else {
                        that.$message.error(res.message);
                    }
                }, function (err) {
                    that.hideLoading();
                });
            },
            submitForm(op) {
                var that = this;
                that.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        if (that.isContractVisable) {
                            that.createOrder(op);
                        } else if (that.ruleForm.roomNumber != "") {
                            var data = {
                                apartmentId: that.ruleForm.apartmentId,
                                roomNumber: that.ruleForm.roomNumber
                            };
                            that.showLoading();
                            that.$api.post(constants.KCURLS.QUERYROOMBYROOMNUMBER, data, function (res) {
                                that.ruleForm.roomId = res.roomId;
                                that.createOrder(op);
                            }, function (err) {
                                that.hideLoading();
                                that.$message.error(err.message);
                            });
                        } else {
                            that.createOrder(op);
                        }
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            hideDialog: function () {
                this.isDlgVisable = false;
            },
            getApartmentsList() {
                var that = this;
                that.$api.get(constants.KCURLS.GETAPARTMENTS, function (res) {
                    that.apartmentsList = res;
                    // that.ruleForm.apartmentId = res.
                });
            },
        },
        watch: {
            showDialog(val) {
                this.isDlgVisable = val;
            },
            isDlgVisable(val) {
                this.$emit("on-result-change", val);
            }
        },
        computed: {
            ...mapGetters([
                'getOrderType'
            ])
        },
        created: function () {
            this.contract = this.currentContract;
            if (this.contract != null) {
                this.isContractVisable = true;
                this.ruleForm.orderCategory = this.category;
                this.ruleForm.contractId = this.contract.contractResponse.contractId;
                //
                this.roomInfo = this.contract.roomResponse;
                this.ruleForm.apartmentId = this.roomInfo.apartmentId;
                this.ruleForm.roomId = this.roomInfo.roomId;
                this.ruleForm.roomNumber = this.roomInfo.roomNumber;
                //
                this.ruleForm.tenantId = this.contract.contractResponse.tenantId;
                this.tenantInfo = this.contract.simpleTenantInfoResponse;
                this.ruleForm.payeeDraweeName = this.tenantInfo.realName;
                this.ruleForm.payeeDraweeCellphone = this.tenantInfo.cellphone;
                this.ruleForm.payeeDraweeIdCardNo = this.tenantInfo.idCardNo;
            } else {
                this.isContractVisable = false;
                this.getApartmentsList();
            }
        }
    }
</script>
<style scoped>
    p.apartNameP {
        font-size: 30px;
        color: rgba(58, 58, 58, 0.87);
        margin-bottom: 20px;
    }

    p.singleFileModule {
        font-size: 30px;
        color: red;
    }
</style>
