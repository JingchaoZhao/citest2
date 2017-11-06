<template>
	<div>
		<n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="roomReserveAsideRight" style="overflow-y: scroll;" :header="false">
	        <div class="asideHeader">
	          预定房间<el-tag  color="#31c366">{{reservationItem.reservationState | reservationState}}</el-tag>
	          <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
	        </div>
	        <div class="n3AsideBody">
	        	<p class="asideHouseName basicInfo">{{reservationItem.apartmentName}} {{reservationItem.roomNumber}}室
	        	</p>
		        <div class="roomEditDiv">
		          <div v-show="reservationItem.reservationState == 'Created'">
			          <!-- <el-button @click="editSelectRoomInfo(true)" v-bind:class="{ active: roomEditing }" icon="edit"></el-button>
			          <el-button @click="deleteRoomInfo" icon="delete" class="delBtn"></el-button> -->
			          <el-button class="greenNewBtn" @click="editSelectRoomInfo(true)" v-bind:class="{ active: roomEditing }">编辑</el-button>
			          <el-button class="redNewBtn" @click="deleteRoomInfo">删除</el-button>
		          </div>

				  <div v-show="reservationItem.reservationState == 'Reserved'">
			          <el-button class="greenNewBtn"  @click.native="openAddContractDlg(reservationItem)">转合同</el-button>
	    			  <el-button class="redNewBtn" @click.native="openReservationDlgFunc">撤销</el-button>
    			  </div>
		        </div>
		        <p class="tabSectionTitle">
		          <i class="bf_icon_infos"></i>
		          预定信息
		        </p>
		        <div class="roomSection unEditState">
			        <el-form :model="editBillForm" label-position="left" :rules="editBillFormRules" ref="editBillForm" label-width="100px" style="margin-top:20px;">
			          <el-col :span="5">租客姓名</el-col>
			          <el-col :span="19">{{reservationItem.tenantName}}</el-col>
			          <el-col :span="5">联系方式</el-col>
			          <el-col :span="19">{{reservationItem.tenantCellphone}}</el-col>
			          <div v-show="!roomEditing">
			          	  <el-col :span="5">入住日期</el-col>
			          	  <el-col :span="19">{{reservationItem.checkInTime | dateYYMMDD}}</el-col>
			          	  <el-col :span="5">定金总额</el-col>
				          <el-col :span="19">{{reservationItem.depositeAmount | amount0}}元</el-col>
				          <el-col :span="5">应收款日</el-col>
				          <el-col :span="19">{{reservationItem.paymentTime | dateYYMMDD}}</el-col>   
			          </div>
		          	 
			          <div style="clear: both"></div>
			          <div v-show="roomEditing">
				          <el-form-item  label="入住日期" prop="checkInTime">
				    		<el-date-picker
						      v-model="editBillForm.checkInTime"
						      align="left"
						      type="date"
						      placeholder="选择日期">
						    </el-date-picker>
						  </el-form-item>
				          <el-form-item label="应收款日" prop="paymentTime">
				    		<el-date-picker
						      v-model="editBillForm.paymentTime"
						      align="left"
						      type="date"
						      placeholder="选择日期">
						    </el-date-picker>
						  </el-form-item>
				          <el-form-item label="定金总额" prop="deposite">
			                <el-input placeholder="输入定金总额" v-model="editBillForm.deposite">
			                  <template slot="append">元</template>
			                </el-input>
			              </el-form-item>
			          </div>
			          <el-col :span="5">实收款日</el-col>
				      <el-col :span="19">{{reservationItem.actualPaymentTime | dateYYMMDD}}</el-col>
			          <el-col :span="5">合同编号</el-col>
			          <el-col :span="19">{{reservationItem.contractNo}}</el-col>
			          <el-col v-show="roomEditing" :span="24">
			          	<div @click="updateReserve('editBillForm')" class=" blockBtn greenBtn" style="width:96px;height:36px;line-height:36px; margin-bottom: 20px; float: right;">确定</div>
			          	<div class="primaryBtn" @click="editSelectRoomInfo(false)" style="width:96px;height:36px;line-height:36px; margin-bottom: 20px; float: right; margin-right: 20px;">取 消</div>
			          </el-col>
			        </el-form>
		        </div>
		        <!-- <p v-if="reservationItem.transactionInfo" class="tabSectionTitle">
			          <i class="bf_icon_devify"></i>
			          流水信息
			    </p>
			    <div v-if="reservationItem.transactionInfo" class="roomSection unEditState">
		          <el-col :span="5">应收款日</el-col>
		          <el-col :span="19">{{reservationItem.paymentTime | dateTirm10}}</el-col>
		          <el-col :span="5">实收款日</el-col>
		          <el-col :span="19">{{reservationItem.actualPaymentTime | dateTirm10}}</el-col>
		          <el-col :span="5">流水备注</el-col>
		          <el-col :span="19">{{reservationItem.transactionInfo.description}}</el-col>
		        </div> -->

	        </div>
	    </n3-aside>
	    <addcontractdlg v-if="openContractDlg" :showDialog='openContractDlg' :roomInfo="currentRoom" :roomReservationId="roomReservationId"  @on-result-change="onContractResultChange" @on-add-success="contractCreateSuccess"></addcontractdlg>
	    <revokeRoomReservationDlg v-if="openReservationDlg" :showDialog="openReservationDlg" :currentReservInfo="reservationItem" @on-result-change="openReservationDlgChange" @on-reserve-revoke="revokeReserve"></revokeRoomReservationDlg>
	</div>
</template>
<script>
	import constants from '../../constants/index'
	// import { n3Aside} from 'N3-components'
	import addcontractdlg from './addContractDlg'
    import revokeRoomReservationDlg from './revokeRoomReservationDlg'
    import { mapActions } from 'vuex'
    import validation from '../../validation/index'

	export default {
		data: function() {
			return {
				currentRoom: null,
				roomReservationId: null,
				openContractDlg: false,
				roomEditing: false,
				openReservationDlg: false,
				reservationItem: {},
				editBillForm: {
					deposite: null,
					checkInTime: null, 
					paymentTime: null
				},
				editBillFormRules: {

				}
			}
		},
		methods: {
			...mapActions([
                'visibledialog',
                'showLoading',
                'hideLoading'
            ]),
			openReservationDlgFunc() {
                this.openReservationDlg = true;
            },
            openReservationDlgChange(val) {
                this.openReservationDlg = val;
            },
			openRight (val) {
				this.roomEditing = false;
				this.reservationItem = val;
				this.editBillForm.deposite = (this.reservationItem.depositeAmount / 100).toFixed(2);
		    	this.editBillForm.checkInTime = new Date(this.reservationItem.checkInTime.substr(0, 4), parseInt(this.reservationItem.checkInTime.substr(5, 2)) - 1, this.reservationItem.checkInTime.substr(8, 2));
		    	this.editBillForm.paymentTime = new Date(this.reservationItem.paymentTime.substr(0, 4), parseInt(this.reservationItem.paymentTime.substr(5, 2)) - 1, this.reservationItem.paymentTime.substr(8, 2));
		        this.$refs.roomReserveAsideRight.open();
		    },
		    closeRight () {
		        this.$refs.roomReserveAsideRight.close();
		    },
			editSelectRoomInfo(val) {
				this.roomEditing = val;
			},
			updateReserve(ruleForm) {
                  var _this = this;
                  _this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                          var params = {
                          		roomReservationId: _this.reservationItem.roomReservationId,
                                deposite: _this.editBillForm.deposite * 100,
								checkInTime: (!(_this.editBillForm.checkInTime instanceof Date)) ? _this.editBillForm.checkInTime.substr(0, 10) : _this.editBillForm.checkInTime.Format("yyyy-MM-dd"), 
								paymentTime: (!(_this.editBillForm.paymentTime instanceof Date)) ? _this.editBillForm.paymentTime.substr(0, 10) : _this.editBillForm.paymentTime.Format("yyyy-MM-dd")
                          };

                          _this.showLoading();
                          _this.$api.post(constants.KCURLS.UPDATEROOMRESERVATIONINFO, params, function(res) {
                            _this.hideLoading();
                            if (res.succeeded) {
                              _this.$message({
                                message: '预订信息更新成功',
                                type: 'success'
                              });
                              _this.reservationItem.depositeAmount = _this.editBillForm.deposite * 100;
                              _this.reservationItem.checkInTime = params.checkInTime;
                              _this.reservationItem.paymentTime = params.paymentTime;
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
			deleteRoomInfo() {
				var _this = this;
				_this.$confirm('确定删除该预定?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$api.post(constants.KCURLS.CANCELROOMRESERVATIONSTATE, {roomReservationId: _this.reservationItem.roomReservationId},
						res => {
							if (res.succeeded) {
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
			revokeReserve() {
				this.closeRight();
			},
			openAddContractDlg: function(val) {
				this.currentRoom = val;
				this.roomReservationId = val.roomReservationId;
		        this.openContractDlg = true;
	        },
	        onContractResultChange(val) {
	       		 this.openContractDlg = val;
	        },
	        contractCreateSuccess() {
	        	this.reservationItem.reservationState = 'Turned';
	        }
	    },
	    created() {
	    	
	    },
		watch: {

		},
		events: {

		},
		components: {
	        // n3Aside,
	        addcontractdlg,
	        revokeRoomReservationDlg
	    }
	}
</script>
<style scoped>
</style>
<style type="less">
</style>