<template>
	<div>
		<n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="hydropowerAsideRight" style="overflow-y: scroll;" :header="false">
	        <div class="asideHeader">
	          水电信息详情 <el-tag color="#ff8c14">{{orderInfo.orderState | orderState}}</el-tag>
	          <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
	        </div>
	        <div class="n3AsideBody">
	        	<p class="asideHouseName basicInfo">{{utilitiesExpense.apartmentName}} {{utilitiesExpense.roomNumber}}室
	        	</p>
	        	<p class="basicInfo" style="margin: -20px 0 30px"><span>租客: {{utilitiesExpense.tenantName}}</span> <span> 合同编号: {{orderInfo.contractNo}}</span></p>
		        <div v-if="orderInfo.orderState == 'Created' || orderInfo.orderState == 'Overdue'" class="roomEditDiv">
		          <el-button class="greenNewBtn" @click="editSelectRoomInfo(true)" v-bind:class="{ active: roomEditing }">编辑</el-button>
		          <el-button class="redNewBtn" @click="deleteUtilitiesInfo">删除</el-button>
		        </div>
		        <p class="tabSectionTitle">
		          <i class="bf_icon_shuidian"></i>
		          水电信息
		        </p>
		        <div class="roomSection unEditState">
		          <el-col :span="5">类型</el-col>
		          <el-col :span="19">{{utilitiesExpense.utilitiesExpenseType | utilitiesExpenseType}}</el-col>
		          <div v-show="!roomEditing">
			          <div v-if="utilitiesExpense.chargingType == 'Meter'">
				          <el-col :span="5">上次抄表日</el-col>
				          <el-col :span="19">{{utilitiesExpense.lastTime | dateTirm10}}</el-col>
				          <el-col :span="5">上次抄表数</el-col>
				          <el-col :span="19">{{utilitiesExpense.lastRecord}}</el-col>
				          <el-col :span="5">本次抄表日</el-col>
				          <el-col :span="19">{{utilitiesExpense.currentTime | dateTirm10}}</el-col>
				          <el-col :span="5">本次抄表数</el-col>
				          <el-col :span="19">{{utilitiesExpense.currentRecord}}</el-col>
				          <el-col :span="5">单价</el-col>
				          <el-col :span="19">{{utilitiesExpense.unitPrice | amount2}}</el-col>
			          </div>
			          <el-col :span="5">总价</el-col>
			          <el-col :span="19">{{utilitiesExpense.totalAmount | amount2}}</el-col>
			          <el-col :span="5">应付款日期</el-col>
			          <el-col :span="19">{{utilitiesExpense.paymentTime | dateTirm10}}</el-col>
		          </div>
		          <div v-show="roomEditing">
			          <el-form :model="editBillForm" label-position="left" :rules="editBillFormRules" ref="editBillForm" label-width="92px" style="margin-top:20px;">
			            <el-col :span="16" style="margin-bottom: 0;">
				            <div v-if="utilitiesExpense.chargingType == 'Meter'">
				            	 <el-form-item label="上次抄表日" prop="lastTime">
					                <el-date-picker
								      v-model="editBillForm.lastTime"
								      align="left"
								      type="date"
								      placeholder="选择日期">
								    </el-date-picker>
					              </el-form-item>
					              <el-form-item label="上次抄表数" prop="lastRecord">
					                <el-input placeholder="输入上次抄表数" v-model="editBillForm.lastRecord"></el-input>
					              </el-form-item>
					              <el-form-item label="本次抄表日" prop="currentTime">
					                <el-date-picker
								      v-model="editBillForm.currentTime"
								      align="left"
								      type="date"
								      placeholder="选择日期">
								    </el-date-picker>
					              </el-form-item>
					              <el-form-item label="本次抄表数" prop="currentRecord">
					                <el-input placeholder="输入本次抄表数" v-model="editBillForm.currentRecord"></el-input>
					              </el-form-item>
					              <el-form-item label="单价" prop="unitPrice">
					                <el-input placeholder="输入单价" v-model="editBillForm.unitPrice"></el-input>
					              </el-form-item>
					              <el-form-item label="总价">
					                <el-input placeholder="输入总价" disabled v-model="totalAmount"></el-input>
					              </el-form-item>
					              <!-- <el-col :span="5">总价</el-col>
			          			  <el-col :span="19">{{totalAmount}}{{utilitiesExpense.totalAmount | amount2}}</el-col> -->
				            </div>
				            <div style="clear: both"></div>
				            <div v-if="utilitiesExpense.chargingType == 'Fixed'">
				            	<el-form-item label="总价" prop="totalAmount">
					                <el-input placeholder="输入总价" v-model="editBillForm.totalAmount"></el-input>
					            </el-form-item>
				            </div>
							<el-form-item label="应付款日期" prop="paymentTime">
					            <el-date-picker
							      v-model="editBillForm.paymentTime"
							      align="left"
							      type="date"
							      placeholder="选择日期">
							    </el-date-picker>
					        </el-form-item>
			            </el-col> 
			          </el-form>
			      </div>
			      <el-col :span="5">实付款日期</el-col>
			      <el-col :span="19">{{utilitiesExpense.actualPaymentTime | dateTirm10}}</el-col>
			      <el-col :span="5">账单编号</el-col>
		          <el-col :span="19">{{orderInfo.orderNo}}</el-col>
		        </div>
		       
		        <el-col v-show="roomEditing" :span="24">
		            <div@click="updateUtilities('editBillForm')" class=" blockBtn greenBtn" style="width:96px;height:36px;line-height:36px; margin-bottom: 20px; float: right;">确定</div>
		            <div class="primaryBtn" @click="editSelectRoomInfo(false)" style="width:96px;height:36px;line-height:36px; margin-bottom: 20px; float: right; margin-right: 20px;">取 消</div>
		        </el-col>
		        <!-- <p v-if="orderInfo.transactionInfos && orderInfo.transactionInfos.length > 0" class="tabSectionTitle">
			          <i class="bf_icon_devify"></i>
			          流水信息
			    </p>
			    <div v-show="!roomEditing" v-if="orderInfo.transactionInfos && orderInfo.transactionInfos.length > 0" class="roomSection unEditState">
		          <el-col :span="5">应付款日期</el-col>
		          <el-col :span="19">{{orderInfo.paymentTime | dateTirm10}}</el-col>
		          <el-col :span="5">实付款日期</el-col>
		          <el-col :span="19">{{orderInfo.actualPaymentTime | dateTirm10}}</el-col>
		          <el-col :span="5">流水备注</el-col>
		          <el-col :span="19">{{orderInfo.transactionInfos[0].description}}</el-col>
		        </div> -->
		        
	        </div>
	    </n3-aside>
	</div>
</template>
<script>
	// import { n3Aside} from 'N3-components'
	import { mapActions } from 'vuex'
    import constants from '../../constants/index'
	export default {
		data: function() {
			return {
				utilitiesExpense: {},
				orderInfo: {},
				roomEditing: false,
				editBillForm: {
				  paymentTime: null,
				  lastTime: null,
				  lastRecord: null,
				  currentTime: null,
				  currentRecord: null,
				  unitPrice: null,
				  totalAmount: null
				},
				editBillFormRules: {
					unitPrice: {
				        validator: (rule, value, callback) => {
				          if (constants.REGEXS.AMOUNT.test(value) == false) {
				            callback(new Error("金额格式错误"));
				          } else {
				          	callback();
				          }
				        },
				        trigger: 'blur'
				    },
					totalAmount: {
				        validator: (rule, value, callback) => {
				          if (constants.REGEXS.AMOUNT.test(value) == false) {
				            callback(new Error("金额格式错误"));
				          } else {
				          	callback();
				          }
				        },
				        trigger: 'blur'
				    }
				}
			}
		},
		methods: {
			...mapActions([
                'visibledialog',
                'showLoading',
                'hideLoading'
            ]),
			openRight (val) {
				var _this = this;
				_this.utilitiesExpense = val;
				_this.editBillForm.paymentTime = new Date(_this.utilitiesExpense.paymentTime.substr(0, 4), parseInt(_this.utilitiesExpense.paymentTime.substr(5, 2)) - 1, _this.utilitiesExpense.paymentTime.substr(8, 2));
				if (_this.utilitiesExpense.chargingType == 'Meter') {
					_this.editBillForm.lastTime = new Date(_this.utilitiesExpense.lastTime.substr(0, 4), parseInt(_this.utilitiesExpense.lastTime.substr(5, 2)) - 1, _this.utilitiesExpense.lastTime.substr(8, 2)),
					_this.editBillForm.lastRecord = _this.utilitiesExpense.lastRecord;
					_this.editBillForm.currentTime = new Date(_this.utilitiesExpense.currentTime.substr(0, 4), parseInt(_this.utilitiesExpense.currentTime.substr(5, 2)) - 1, _this.utilitiesExpense.currentTime.substr(8, 2)),
					_this.editBillForm.currentRecord = _this.utilitiesExpense.currentRecord;
					_this.editBillForm.unitPrice = (_this.utilitiesExpense.unitPrice / 100).toFixed(2);
				}
				else {
					_this.editBillForm.totalAmount = (_this.utilitiesExpense.totalAmount / 100).toFixed(2);
				}
		        _this.$refs.hydropowerAsideRight.open();
                _this.$api.get(constants.KCURLS.GETNORMALORDERBYORDERID + val.orderId,
                    function (res) {
                        _this.orderInfo = res;
                    });
		    },
		    closeRight () {
		        this.$refs.hydropowerAsideRight.close();
		    },
			editSelectRoomInfo(val) {
				this.roomEditing = val;
			},
			deleteUtilitiesInfo() {
				var _this = this;
                _this.$confirm('确认删除该水电账单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$api.post(constants.KCURLS.DELETEUTILITIESEXPENSE, {utilitiesExpenseId: _this.utilitiesExpense.utilitiesExpenseId},
                        res => {
                            if (res.succeeded ) {
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                _this.closeRight();
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
			updateUtilities(ruleForm) {
                  var _this = this;
                  _this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                    	  var params; 
                    	  if (_this.utilitiesExpense.chargingType == 'Meter') {
                    	  	params = {
							   lastTime: (!(_this.editBillForm.lastTime instanceof Date)) ? _this.editBillForm.lastTime.substr(0, 10) : _this.editBillForm.lastTime.Format("yyyy-MM-dd"),
							   lastRecord: _this.editBillForm.lastRecord,
							   currentTime: (!(_this.editBillForm.currentTime instanceof Date)) ? _this.editBillForm.currentTime.substr(0, 10) : _this.editBillForm.currentTime.Format("yyyy-MM-dd"),
							   currentRecord: _this.editBillForm.currentRecord,
							   unitPrice: _this.editBillForm.unitPrice * 100,
							   totalAmount: _this.totalAmount * 100
                    	  	}
                    	  }
                    	  else {
                    	  	params = {
                    	  		unitPrice: _this.editBillForm.totalAmount * 100,
                    	  		totalAmount: _this.editBillForm.totalAmount * 100
                    	  	}
                    	  }
                    	  params.utilitiesExpenseId = _this.utilitiesExpense.utilitiesExpenseId;
                    	  params.paymentTime = (!(_this.editBillForm.paymentTime instanceof Date)) ? _this.editBillForm.paymentTime.substr(0, 10) : _this.editBillForm.paymentTime.Format("yyyy-MM-dd"),
                          

                          _this.showLoading();
                          _this.$api.post(constants.KCURLS.UPDATEUTILITIESEXPENSE, params, function(res) {
                            _this.hideLoading();
                            if (res.succeeded) {
                              _this.$message({
                                message: '水电信息更新成功',
                                type: 'success'
                              });
                              if (_this.utilitiesExpense.chargingType == 'Meter') { 
                              	_this.utilitiesExpense.lastTime = params.lastTime;
                              	_this.utilitiesExpense.lastRecord = params.lastRecord;
                              	_this.utilitiesExpense.currentTime = params.currentTime;
                              	_this.utilitiesExpense.currentRecord = params.currentRecord;
                              	_this.utilitiesExpense.unitPrice = _this.editBillForm.unitPrice * 100;
                              	_this.utilitiesExpense.totalAmount = _this.totalAmount * 100;
                              }
                              else {
                              	_this.utilitiesExpense.totalAmount = _this.editBillForm.totalAmount * 100;
                              }
                              _this.utilitiesExpense.paymentTime = params.paymentTime;
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
	    },
		computed: {
            totalAmount() {
            	return (this.editBillForm.currentRecord - this.editBillForm.lastRecord) *  this.editBillForm.unitPrice;
            }
        },
		events: {
			
		},
		components: {
	        // n3Aside,
	        // collectionDlg
	    }
	}
</script>
<style scoped>
</style>
<style type="less">
</style>