<template>
	<el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false" title="添加水电账单" class="hyDropDlg" v-model="isDlgVisable" >
		<!-- <p class="dlgSectionTitle"><i class="bf_icon_roomInfo"></i>房间信息</p> -->
		<p class="apartNameP" v-if="contractInfo.roomResponse">{{contractInfo.roomResponse.apartmentName}} {{contractInfo.roomResponse.roomNumber}}室</p>
	    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px">
	   		<p class="dlgSectionTitle"><i class="bf_icon_shuidian"></i>水电信息</p>
			<span @click="togglePayStyle('Meter')" v-bind:class="{active: payStyle == 'Meter'}" class="hydropTab">
				<p><i class="bf_icon_record"></i></p>
				<span>抄表</span>
			</span>
			<span @click="togglePayStyle('Fixed')" v-bind:class="{active: payStyle == 'Fixed'}" class="hydropTab">
				<p><i class="bf_icon_casher"></i></p>
				<span>固定</span>
			</span>
		</el-form>
		<el-form v-show="payStyle == 'Meter'" :model="form1" label-position="top" :rules="rules1" ref="form1" label-width="100px">
	   		<el-form-item label="抄表类型" prop="utilitiesExpenseType">
				<el-radio-group v-model="form1.utilitiesExpenseType">
				  	<el-radio v-for="item in meterType" :label="item.key" :key="item.key">{{item.value}}</el-radio>
	            </el-radio-group>
		    </el-form-item>
		    <el-col :span="11">
		    	<el-form-item label="上次抄表日期" prop="lastTime">
				    <el-date-picker
				      v-model="form1.lastTime"
				      align="left"
				      type="date"
				      placeholder="选择上次抄表日期">
				    </el-date-picker>
				</el-form-item>
		    </el-col>
		    <el-col :span="2">&nbsp;
		    </el-col>
		    <el-col :span="11">
		    	<el-form-item label="上次抄表读数" prop="lastRecord">
				    <el-input placeholder="输入上次抄表数值" v-model="form1.lastRecord">
				    </el-input>
				</el-form-item>
		    </el-col>
		    <el-col :span="11">
		    	<el-form-item label="本次抄表日期" prop="currentTime">
				    <el-date-picker
				      v-model="form1.currentTime"
				      align="left"
				      type="date"
				      placeholder="选择本次抄表日期">
				    </el-date-picker>
				</el-form-item>
		    </el-col>
		    <el-col :span="2">&nbsp;
		    </el-col>
		    <el-col :span="11">
		    	<el-form-item label="本次抄表读数" prop="currentRecord">
				    <el-input placeholder="输入本次抄表数值" v-model="form1.currentRecord">
				    </el-input>
				</el-form-item>
		    </el-col>
		    <el-col :span="11">
		    	<el-form-item label="单价" prop="unitPrice">
				    <el-input placeholder="输入单价" v-model="form1.unitPrice">
				    	<template slot="append">元</template>
				    </el-input>
				</el-form-item>
		    </el-col>
		    <el-col :span="2">&nbsp;
		    </el-col>
		    <el-col :span="11">
		    	<el-form-item required label="总价" prop="">
				    <el-input disabled placeholder="输入总金额" v-model="totalAmount">
				    	<template slot="append">元</template>
				    </el-input>
				</el-form-item>
		    </el-col>
		    <el-form-item required label="计费周期">
			    <el-col :span="11">
			    	<el-form-item label="" prop="chargeStartTime">
			      		<el-date-picker type="date" placeholder="输入计费开始时间" v-model="form1.chargeStartTime" style="width: 100%;"></el-date-picker>
			    	</el-form-item>
			    </el-col>
			    <el-col class="line" :span="2"> &nbsp;</el-col>
			    <el-col :span="11">
			    	<el-form-item label="" prop="chargeEndTime">
			      		<el-date-picker type="date" placeholder="输入计费结束时间" v-model="form1.chargeEndTime" style="width: 100%;"></el-date-picker>
			    	</el-form-item>
			    </el-col>
			</el-form-item>
			<el-form-item label="应付款日期" prop="paymentTime">
			    <el-date-picker
			      v-model="form1.paymentTime"
			      align="left"
			      type="date"
			      placeholder="选择应付款日期">
			    </el-date-picker>
			</el-form-item>
		</el-form>
		<el-form v-show="payStyle == 'Fixed'" :model="form2" label-position="top" :rules="rules1" ref="form2" label-width="100px">
	   		<el-form-item label="固定类型" prop="utilitiesExpenseType">
				<el-radio-group v-model="form2.utilitiesExpenseType">
				  	<el-radio v-for="item in fixedType" :label="item.key" :key="item.key">{{item.value}}</el-radio>
	            </el-radio-group>
		    </el-form-item>
		    <el-form-item required label="计费周期">
			    <el-col :span="11">
			    	<el-form-item label="" prop="chargeStartTime">
			      		<el-date-picker type="date" placeholder="输入计费开始时间" v-model="form2.chargeStartTime" style="width: 100%;"></el-date-picker>
			    	</el-form-item>
			    </el-col>
			    <el-col class="line" :span="2"> &nbsp;</el-col>
			    <el-col :span="11">
			    	<el-form-item label="" prop="chargeEndTime">
			      		<el-date-picker type="date" placeholder="输入计费结束时间" v-model="form2.chargeEndTime" style="width: 100%;"></el-date-picker>
			    	</el-form-item>
			    </el-col>
			</el-form-item>
		    <el-col :span="11">
		    	<el-form-item label="总价" prop="totalAmount">
				    <el-input placeholder="输入总金额" v-model="form2.totalAmount">
				    	<template slot="append">元</template>
				    </el-input>
				</el-form-item>
		    </el-col>
		    <el-col :span="2">&nbsp;
		    </el-col>
		    <el-col :span="11">
		    	<el-form-item label="应付款日期" prop="">
				    <el-date-picker
				      v-model="form2.paymentTime"
				      align="left"
				      type="date"
				      placeholder="选择应付款日期">
				    </el-date-picker>
				</el-form-item>
		    </el-col>
		</el-form>
		<div slot="footer" class="dialog-footer">
		  	<div class="primaryBtn"  @click="isDlgVisable = false">取 消</div>
		  	<div class="blockBtn greenBtn" v-show="payStyle == 'Meter'" @click="submitForm('form1', 1)">直接收款</div>
		  	<div class="blockBtn greenBtn" v-show="payStyle == 'Meter'" @click="submitForm('form1', 2)">生成账单</div>
		  	<div class="blockBtn greenBtn" v-show="payStyle == 'Fixed'" @click="submitForm('form2', 1)">直接收款</div>
		  	<div class="blockBtn greenBtn" v-show="payStyle == 'Fixed'" @click="submitForm('form2', 2)">生成账单</div>
		</div>
	</el-dialog>
</template>
<script>
	import constants from '../../constants/index'
	import { mapActions } from 'vuex'
	import validation from '../../validation/index'
	export default {
		props: ['showDialog', 'currentContract'],
		data: function() {
			return {
				lastHotInfos: null,
				lastColdInfos: null,
				lastEleInfos: null,
				isDlgVisable: this.showDialog,
				contractInfo: this.currentContract,
				payStyle: 'Meter',
				fixedType: [],
				meterType: [],
		        form1: {
		        	utilitiesExpenseType: null,
		        	lastTime: null,
		        	lastRecord: null,
		        	currentTime: null,
		        	currentRecord: null,
		        	unitPrice: null,
		        	totalAmount: null,
		        	chargeStartTime: null,
		        	chargeEndTime: null,
		        	paymentTime: null
		        },
		        rules1: {
		        	utilitiesExpenseType: validation.requiredChange,
		        	lastTime: validation.requiredDate,
		        	lastRecord: validation.record,
		        	currentTime: validation.requiredDate,
		        	currentRecord: validation.record,
		        	unitPrice: validation.amount,
		        	totalAmount: validation.amount,
		        	chargeStartTime: validation.requiredDate,
		        	chargeEndTime: validation.requiredDate,
		        	paymentTime: validation.requiredDate
		        },
		        form2: {
		        	utilitiesExpenseType: null,
		        	chargeStartTime: null,
		        	chargeEndTime: null,
		        	totalAmount: null,
		        	paymentTime: null
		        },
		        rules2: {
		        	utilitiesExpenseType: validation.requiredChange,
		        	totalAmount: validation.amount,
		        	chargeStartTime: validation.requiredDate,
		        	chargeEndTime: validation.requiredDate,
		        	paymentTime: validation.requiredDate
		        }
			}
		},
		methods: {
	      ...mapActions([
	        'showLoading',
	        'hideLoading'
		  ]),
	      submitForm(formName, type) {
	      	var _this = this;
	      	if (formName == 'form1') {
	      		this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.$emit('on-add-success');
		            var params = {
		            	contractId: this.contractInfo.contractResponse.contractId,
		            	chargingType: this.payStyle,
		            	utilitiesExpenseType: this.form1.utilitiesExpenseType,
			        	lastTime: (!(this.form1.lastTime instanceof Date)) ? this.form1.lastTime : this.form1.lastTime.Format("yyyy-MM-dd"),
			        	lastRecord: this.form1.lastRecord,
			        	currentTime: (!(this.form1.currentTime instanceof Date)) ? this.form1.currentTime : this.form1.currentTime.Format("yyyy-MM-dd"),
			        	currentRecord: this.form1.currentRecord,
			        	unitPrice: this.form1.unitPrice * 100,
			        	totalAmount: this.totalAmount * 100,
			        	chargeStartTime: (!(this.form1.chargeStartTime instanceof Date)) ? this.form1.chargeStartTime : this.form1.chargeStartTime.Format("yyyy-MM-dd"),
			        	chargeEndTime: (!(this.form1.chargeEndTime instanceof Date)) ? this.form1.chargeEndTime : this.form1.chargeEndTime.Format("yyyy-MM-dd"),
			        	paymentTime: (!(this.form1.paymentTime instanceof Date)) ? this.form1.paymentTime : this.form1.paymentTime.Format("yyyy-MM-dd")
		            }
		            _this.createUtilities(params, type);
		          } else {
		            return false;
		          }
		        });
	      	}
	      	else if (formName == 'form2') {
	      		this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.$emit('on-add-success');
		            var params = {
		            	contractId: this.contractInfo.contractResponse.contractId,
		            	chargingType: this.payStyle,
		            	utilitiesExpenseType: this.form2.utilitiesExpenseType,
			        	unitPrice: this.form2.totalAmount * 100,
			        	totalAmount: this.form2.totalAmount * 100,
			        	chargeStartTime: (!(this.form2.chargeStartTime instanceof Date)) ? this.form2.chargeStartTime : this.form2.chargeStartTime.Format("yyyy-MM-dd"),
			        	chargeEndTime: (!(this.form2.chargeEndTime instanceof Date)) ? this.form2.chargeEndTime : this.form2.chargeEndTime.Format("yyyy-MM-dd"),
			        	paymentTime: (!(this.form2.paymentTime instanceof Date)) ? this.form2.paymentTime : this.form2.paymentTime.Format("yyyy-MM-dd")
		            }
		            _this.createUtilities(params, type);
		          } else {
		            return false;
		          }
		        });
	      	}
	        
	      },
	      createUtilities(params, type) {
	      	var _this = this;
	      	_this.showLoading();
            _this.$api.post(constants.KCURLS.CREATEUTILITIESEXPENSE, params,
            	res => {
            		_this.hideLoading();
            		if (res.succeeded) {
            			_this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        _this.isDlgVisable = false;
            			if (type == 1) {
            				_this.$emit('on-add-success', res.data.orderId);
            			}
            			else {
            				_this.$emit('on-add-success');
            			}
            		}
            		else {
            			_this.$message.error(res.message);
            		}
            	}, 
            	err => {
            		_this.hideLoading();
            	});
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
	      togglePayStyle(val) {
	      	if (this.fixedType.length == 0 && val == 'Fixed') {
				return false;
			}
			if (this.meterType.length == 0 && val == 'Meter') {
				return false;
			}
	      	this.payStyle = val;
	      }
	    },
	    created() {
	    	var currentInfo = this.currentContract;;
	    	var hot = {
		        key: "HotWaterFee",
		        value: '热水'
		    };
		    var cold = {
		        key: "ColdWaterFee",
		        value: '冷水'
		    }
		    var electrict = {
		        key: "ElectricityFee",
		        value: '电费'
		    }
			
			if (currentInfo.contractResponse.coldWaterPayMethod == 'Unknown') {
				this.fixedType.push(cold);
				this.meterType.push(cold);
			}
			else if (currentInfo.contractResponse.coldWaterPayMethod == 'Fixed') {
				this.fixedType.push(cold);
			}
			else {
				this.meterType.push(cold);
			}
			if (currentInfo.contractResponse.hotWaterPayMethod == 'Unknown') {
				this.fixedType.push(hot);
				this.meterType.push(hot);
			}
			else if (currentInfo.contractResponse.hotWaterPayMethod == 'Fixed') {
				this.fixedType.push(hot);
			}
			else {
				this.meterType.push(hot);
			}
			if (currentInfo.contractResponse.electricityPayMethod == 'Unknown') {
				this.fixedType.push(electrict);
				this.meterType.push(electrict);
			}
			else if (currentInfo.contractResponse.electricityPayMethod == 'Fixed') {
				this.fixedType.push(electrict);
			}
			else {
				this.meterType.push(electrict);
			}
			if (this.fixedType.length == 0) {
				this.payStyle = "Meter";
			}
			if (this.meterType.length == 0) {
				this.payStyle = "Fixed";
			}

			var _this = this;
			_this.$api.get(constants.KCURLS.GETLASTUTILITIESEXPENSE + currentInfo.contractResponse.contractId, res => {
				for (var i = 0; i < res.length; i++) {
					if (res[i].utilitiesExpenseType == 'HotWaterFee') {
						_this.lastHotInfos = {
							lastRecord: res[i].currentRecord.toString(),
							lastTime: new Date(res[i].currentTime.substr(0, 4), parseInt(res[i].currentTime.substr(5, 2)) - 1, res[i].currentTime.substr(8, 2))
						};
					}
					else if (res[i].utilitiesExpenseType == 'ColdWaterFee') {
						_this.lastColdInfos = {
							lastRecord: res[i].currentRecord.toString(),
							lastTime: new Date(res[i].currentTime.substr(0, 4), parseInt(res[i].currentTime.substr(5, 2)) - 1, res[i].currentTime.substr(8, 2))
						};
					}
					else {
						_this.lastEleInfos = {
							lastRecord: res[i].currentRecord.toString(),
							lastTime: new Date(res[i].currentTime.substr(0, 4), parseInt(res[i].currentTime.substr(5, 2)) - 1, res[i].currentTime.substr(8, 2))
						};
					}
				}
			});
			
	    },
	    computed: {
	    	totalAmount: function() {
	    		if (this.form1.currentRecord && this.form1.lastRecord && this.form1.unitPrice) {
	    			return this.form1.totalAmount = (this.form1.currentRecord - this.form1.lastRecord) * (this.form1.unitPrice);
	    		}
	    		else {
	    			return null;
	    		}
	    	}
	    },
		watch: {
			"form1.utilitiesExpenseType"(val) {
				if (!this.contractInfo) {
					return false;
				}
				switch(val) {
					case 'ColdWaterFee': 
						this.form1.unitPrice = this.contractInfo.contractResponse.coldWaterUnitPrice == 0 ? null : (this.contractInfo.contractResponse.coldWaterUnitPrice / 100).toFixed(2);
						if (this.lastColdInfos) {
							this.form1.lastTime = this.lastColdInfos.lastTime;
							this.form1.lastRecord = this.lastColdInfos.lastRecord;
						}
						break;
					case 'HotWaterFee': 
						this.form1.unitPrice = this.contractInfo.contractResponse.hotWaterUnitPrice == 0 ? null : (this.contractInfo.contractResponse.hotWaterUnitPrice / 100).toFixed(2);
						if (this.lastHotInfos) {
							this.form1.lastTime = this.lastHotInfos.lastTime;
							this.form1.lastRecord = this.lastHotInfos.lastRecord;
						}
						break;
					case 'ElectricityFee': 
						this.form1.unitPrice = this.contractInfo.contractResponse.electricityUnitPrice == 0 ? null : (this.contractInfo.contractResponse.electricityUnitPrice / 100).toFixed(2);
						if (this.lastEleInfos) {
							this.form1.lastTime = this.lastEleInfos.lastTime;
							this.form1.lastRecord = this.lastEleInfos.lastRecord;
						}
						break;
				}
			},
			showDialog(val) {
				this.isDlgVisable = val;
			},
			isDlgVisable(val) {
				this.$emit("on-result-change",val);
			}
		}
	}
</script>
<style scoped>
	p.apartNameP {
		font-size:30px;
		color:rgba(58,58,58,0.87);
		margin-bottom: 20px;
	}
	p.singleFileModule {
		font-size: 30px;
		color: red;
	}
	span.hydropTab {
		display: inline-block;
		margin-right: 30px;
		width: 74px;
		height: 74px;
		margin-bottom: 20px;
		border:1px solid #a4aab1;
		border-radius:4px;
		cursor: pointer;
		text-align: center;
		color: #a4aab1;
	}
	span.hydropTab p {
		height: 48px;
		font-size: 35px;
		line-height: 50px;
		width: 100%;
		margin-bottom: 0;
	}
	span.hydropTab span {
		background:#a4aab1;
		height:24px;
		display: inline-block;
		width: 100%;
		color: #fff;
		font-size: 16px;
		line-height: 24px;
	}
	span.hydropTab.active {
		border:1px solid #07bf96;
		color: #07bf96;
	}
	span.hydropTab.active span {
		background:#07bf96;
	}
</style>
<style type="less">
.hyDropDlg .el-dialog__body {
	height: 613px;
}
</style>