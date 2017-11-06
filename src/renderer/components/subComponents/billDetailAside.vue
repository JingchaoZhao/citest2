<template>
    <div>
        <n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="billAsideRight"
                  style="overflow-y: scroll;" :header="false">
            <div class="asideHeader">
                租客账单详情
                <el-tag v-if="currentOrder && currentOrder.stageOrderResponse && (currentOrder.stageOrderResponse.length > 0) " color="#ff8c14">已分期</el-tag>
                <el-tag v-if="currentOrder && (!currentOrder.stageOrderResponse || (currentOrder.stageOrderResponse.length == 0))" color="#ff8c14">{{currentOrder.orderState | orderState}}</el-tag>
                <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
            </div>
            <div v-if="currentOrder" class="n3AsideBody">
                <p class="asideHouseName">{{currentOrder.apartmentName }} {{currentOrder.roomNumber }}<span
                        v-if="currentOrder.roomNumber">室</span></p>
                <div  class="roomEditDiv" v-if="!isAssert && isCollectionVisable">
                    <el-button class="greenNewBtn" @click="showCollectionDialog">收款</el-button>
                    <el-button class="greenNewBtn" v-if="currentOrder.orderType != 'Reservation' && currentOrder.orderType != 'HotWaterFee' && currentOrder.orderType != 'ColdWaterFee' && currentOrder.orderType != 'ElectricityFee'" @click="editSelectRoomInfo(true)" v-bind:class="{ active: roomEditing }">编辑</el-button>
                    <el-button class="redNewBtn" @click="deleteOrder">删除</el-button>
                </div>
                <p class="tabSectionTitle">
                    <i class="bf_icon_infos"></i> 账单信息
                </p>
                <div class="roomSection unEditState">
                    <el-col :span="4">租客姓名</el-col>
                    <el-col :span="20">{{currentOrder.payeeDraweeRealName || currentOrder.tenantName}}</el-col>
                    <el-col :span="4">合同编号</el-col>
                    <el-col :span="20">{{currentOrder.contractNo}}</el-col>
                    <el-col :span="4">账单类型</el-col>
                    <el-col :span="20">{{currentOrder.orderType | orderType}}</el-col>
                    <el-col :span="4">实收款日</el-col>
                    <el-col :span="20">{{currentOrder.actualPaymentTime | dateTirm10}}</el-col>
                    <div v-show="!roomEditing" >
                        <el-col :span="4">应收款日</el-col>
                        <el-col :span="20">{{currentOrder.paymentTime | dateTirm10}}</el-col>
                        <div v-show="currentOrder.feeAmount == 0 && currentOrder.orderPropertyAmount == 0">
                            <el-col :span="4">账单金额</el-col>
                            <el-col :span="20">{{currentOrder.totalAmount | amount2}}元</el-col>
                        </div>
                        <div v-show="currentOrder.feeAmount != 0 || currentOrder.orderPropertyAmount != 0">
                            <el-col :span="4">账单总额</el-col>
                            <el-col :span="20">{{currentOrder.totalAmount | amount2}}元  ( 包含： 房租{{currentOrder.amount | amount2}}元<span v-show="currentOrder.orderPropertyAmount != 0">, 物业费{{currentOrder.orderPropertyAmount | amount2}}元</span><span v-show="currentOrder.feeAmount != 0">, 服务费{{currentOrder.feeAmount | amount2}}元</span> )</el-col>
                        </div>
                        
                        <el-col :span="4">账单周期</el-col>
                        <el-col :span="20">
                            {{currentOrder.orderStartTime | dateTirm10}} 至 {{currentOrder.orderEndTime | dateTirm10}}
                        </el-col>
                    </div>
                    <el-col v-show="currentOrder.penaltyAmount" :span="4">违约金</el-col>
                    <el-col v-show="currentOrder.penaltyAmount" :span="20">{{currentOrder.penaltyAmount | amount2}}元</el-col>
                    <div style="clear: both"></div>
                    <div v-show="roomEditing">
                        <el-form :model="editBillForm" label-position="left" :rules="editBillFormRules" ref="editBillForm"
                                 label-width="92px">
                            <el-col :span="16" style="margin-bottom: 0;">
                                <el-form-item label="应收款日" prop="paymentTime">
                                    <el-date-picker v-model="editBillForm.paymentTime" align="left" type="date" placeholder="输入应收款日">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item v-if="currentOrder.feeAmount == 0 && currentOrder.orderPropertyAmount == 0" label="账单金额" prop="amount">
                                    <el-input placeholder="输入账单金额" v-model="editBillForm.amount">
                                        <template slot-scope="append">元</template>
                                    </el-input>
                                </el-form-item>

                                <el-form-item v-if="currentOrder.feeAmount != 0 || currentOrder.orderPropertyAmount != 0" label="房租金" prop="amount">
                                    <el-input placeholder="输入房租金" v-model="editBillForm.amount">
                                        <template slot-scope="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item v-if="currentOrder.orderPropertyAmount != 0" label="物业费" prop="propertyManagementAmount">
                                    <el-input placeholder="输入物业费金额" v-model="editBillForm.propertyManagementAmount  ">
                                        <template slot-scope="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item v-if="currentOrder.feeAmount != 0" label="服务费" prop="feeAmount">
                                    <el-input placeholder="输入服务费金额" v-model="editBillForm.feeAmount">
                                        <template slot-scope="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item required v-if="currentOrder.feeAmount != 0 || currentOrder.orderPropertyAmount != 0" label="账单总额">
                                    <el-input placeholder="输入账单总额" disabled v-model="totalAmount"></el-input>
                                  </el-form-item>

                                <el-form-item required label="账单周期">
                                    <el-col :span="11">
                                        <el-form-item label="" prop="orderStartTime">
                                            <el-date-picker v-model="editBillForm.orderStartTime" align="left" type="date" placeholder="开始时间"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="2">&nbsp;
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="" prop="orderEndTime">
                                            <el-date-picker v-model="editBillForm.orderEndTime" align="left" type="date" placeholder="结束时间"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-form>
                        <el-col :span="24">
                            <div @click="submitEditForm('editBillForm')" class=" blockBtn greenBtn"
                                 style="width:96px;height:36px;line-height:36px; margin-bottom: 20px; float: right;">确定
                            </div>
                            <div class="primaryBtn" @click="unEditSelectRoomInfo(false)" style="width:96px;height:36px;line-height:36px; margin-bottom: 20px; float: right; margin-right: 20px;">取 消</div>
                        </el-col>
                    </div>
                </div>
                <!-- 资金方显示 -->
                <p  v-if="isAssert && currentOrder.transactionInfos && currentOrder.transactionInfos.length > 0" class="tabSectionTitle">
                  <i class="bf_icon_devify"></i>
                  支付信息
                </p>
                <div v-if="isAssert && currentOrder.transactionInfos && currentOrder.transactionInfos.length > 0" class="roomSection unEditState">
                  <el-col :span="5">支付方式</el-col>
                  <el-col :span="19">{{currentOrder.transactionInfos[0].transactionMethod | transactionMethod}}</el-col>
                  <el-col :span="5">支付账户</el-col>
                  <el-col :span="19"></el-col>
                  <el-col :span="5">支付日期</el-col>
                  <el-col :span="19">{{currentOrder.transactionInfos[0].paymentTime | dateYYMMDD}}</el-col>
                </div>
                
                <p v-if="currentOrder.stageOrderResponse && (currentOrder.stageOrderResponse.length > 0)" class="tabSectionTitle" style="margin-bottom: 20px;">
                    <i class="bf_icon_bookInfo"></i>分期账单
                </p>
                <div>
                    <el-table class="littleTable" v-if="currentOrder.stageOrderResponse && (currentOrder.stageOrderResponse.length > 0)" :data="currentOrder.stageOrderResponse" style="width: 100%; margin-bottom: 20px;">
                        <el-table-column label="还款日期">
                            <template slot-scope="scope">
                                <span>{{scope.row.repayTime | dateYYMMDD}}</span>
                                <el-tag v-if="scope.row.orderState == 'Overdue'" color="#ff6260" close-transition>逾</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="还款金额">
                            <template slot-scope="scope">
                                <span>{{scope.row.repaidAmount | amount2}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="剩余应还金额">
                            <template slot-scope="scope">
                                <span>{{scope.row.repayAmount  | amount2}}元</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                
            </div>

        </n3-aside>
        <collectionDlg v-if="isCollectionDlg" :showDialog='isCollectionDlg' :currentOrderId="currentOrder.orderId"
                       @on-result-change='hideCollectionDialog'
                       @on-refresh-collection="refreshCollection"></collectionDlg>
    </div>
</template>
<script>
    import constants from '../../constants/index'
    // import {n3Aside} from 'N3-components'
    import collectionDlg from './collectionDlg'
    import { mapActions } from 'vuex'
    import validation from '../../validation/index'
    export default {
        data: function () {
            return {
                orderId: "",
                currentOrder: null,
                isCollectionDlg: false,
                isCollectionVisable: false,
                roomEditing: false,
                editBillForm: {
                    orderId: null,
                    amount: null,
                    propertyManagementAmount: null,
                    feeAmount: null,
                    orderStartTime: null,
                    orderEndTime: null,
                    paymentTime: null
                },
                editBillFormRules: {
                    paymentTime: validation.requiredDate,
                    orderStartTime: validation.requiredDate,
                    orderEndTime: validation.requiredDate,
                    amount: validation.amount,
                    propertyManagementAmount: validation.amount,
                    feeAmount: validation.amount,
                }, 
                isAssert: false,
                isStagOrder: false
            }
        },
        methods: {
            ...mapActions([
                'visibledialog',
                'showLoading',
                'hideLoading'
            ]),
            openRight(orderId, isAssert, isStagOrder) {
                this.isStagOrder = isStagOrder;
                this.isAssert = isAssert;
                this.orderId = orderId;
                this.roomEditing = false;
                this.$refs.billAsideRight.open();
                this.getOrderByOrderId();
            },
            closeRight() {
                this.$refs.billAsideRight.close();
            },
            editSelectRoomInfo(val) {
                this.roomEditing = val;
            },
            unEditSelectRoomInfo(val) {
                this.roomEditing = val;
            },
            submitEditForm(ruleForm) {
                var _this = this;
                _this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                          var params = {
                                orderId: _this.editBillForm.orderId,
                                amount: _this.editBillForm.amount * 100,
                                propertyManagementAmount: _this.editBillForm.propertyManagementAmount * 100,
                                feeAmount: _this.editBillForm.feeAmount * 100,
                                orderStartTime: (!(_this.editBillForm.orderStartTime instanceof Date)) ? _this.editBillForm.orderStartTime.substr(0, 10) : _this.editBillForm.orderStartTime.Format("yyyy-MM-dd"),
                                orderEndTime: (!(_this.editBillForm.orderEndTime instanceof Date)) ? _this.editBillForm.orderEndTime.substr(0, 10) : _this.editBillForm.orderEndTime.Format("yyyy-MM-dd"),
                                paymentTime: (!(_this.editBillForm.paymentTime instanceof Date)) ? _this.editBillForm.paymentTime.substr(0, 10) : _this.editBillForm.paymentTime.Format("yyyy-MM-dd")
                          };

                          _this.showLoading();
                          _this.$api.post(constants.KCURLS.UPDATEORDER, params, function(res) {
                            _this.hideLoading();
                            if (res.succeeded) {
                              _this.isDlgVisable = false;
                              _this.$message({
                                message: '账单更新成功',
                                type: 'success'
                              });
                              _this.refreshCollection();
                              _this.roomEditing = false;
                            } else {
                              _this.$message.error(res.message);
                            }
                          }, err => {
                            _this.hideLoading();
                          });
                    }
                });
            },
            deleteOrder() {
                var _this = this;
                _this.$confirm('确认删除该账单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$api.post(constants.KCURLS.DELETEORDER, {orderId: this.orderId},
                        res => {
                            if (res.succeeded ) {
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                _this.$refs.billAsideRight.close();
                            }
                            else {
                                _this.$message.error(res.message);
                            }
                        }, 
                        err => {

                        });
                   
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getOrderByOrderId: function () {
                var that = this;
                if (!this.isStagOrder) {
                    this.$api.get(constants.KCURLS.GETNORMALORDERBYORDERID + this.orderId,
                        function (res) {
                            that.currentOrder = res;
                            that.editBillForm = {
                                orderId: that.currentOrder.orderId,
                                amount: (that.currentOrder.amount / 100).toFixed(2),
                                propertyManagementAmount: (that.currentOrder.orderPropertyAmount / 100).toFixed(2),
                                feeAmount: (that.currentOrder.feeAmount / 100).toFixed(2),
                                orderStartTime: new Date(that.currentOrder.orderStartTime.substr(0, 4), parseInt(that.currentOrder.orderStartTime.substr(5, 2)) - 1, that.currentOrder.orderStartTime.substr(8, 2)),
                                orderEndTime: new Date(that.currentOrder.orderEndTime.substr(0, 4), parseInt(that.currentOrder.orderEndTime.substr(5, 2)) - 1, that.currentOrder.orderEndTime.substr(8, 2)),
                                paymentTime: new Date(that.currentOrder.paymentTime.substr(0, 4), parseInt(that.currentOrder.paymentTime.substr(5, 2)) - 1, that.currentOrder.paymentTime.substr(8, 2))
                            };
                            that.visableCollection();
                        });
                }
                else {
                    this.$api.get(constants.KCURLS.QUERYINSTALLMENTORDERINFO + this.orderId,
                        res => {
                            that.currentOrder = res;
                            that.visableCollection();
                        });
                }
                
            },
            showCollectionDialog: function () {
                this.isCollectionDlg = true;
            },
            hideCollectionDialog: function (val) {
                this.isCollectionDlg = val;
            },
            refreshCollection: function () {
                this.isCollectionDlg = false;
                this.getOrderByOrderId();
                this.$emit('on-refresh-order');
            },
            visableCollection: function () {
                if (this.currentOrder == null)
                    return;
                if ((this.currentOrder.orderState == 'Created' || this.currentOrder.orderState == 'Overdue') && (this.currentOrder.orderModel != 'Staging')) {
                    this.isCollectionVisable = true;
                } else {
                    this.isCollectionVisable = false;
                }
            }
        },
        computed: {
            totalAmount() {
                return (parseFloat(this.editBillForm.amount) + parseFloat(this.editBillForm.propertyManagementAmount) +  parseFloat(this.editBillForm.feeAmount)).toFixed(2);
            }
        },
        components: {
           // n3Aside,
            collectionDlg
        }
    }
</script>
<style scoped>
</style>
<style type="less">
</style>
