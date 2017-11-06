<template>
	<div>
		<n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="roomReserveAsideRight" style="overflow-y: scroll;" :header="false">
	        <div class="asideHeader">
	          分期账单详情
	          <el-tag v-if="currentBill" color="#ff8c14">{{currentBill.orderState | installmentOrderState}}</el-tag>
	          <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
	        </div>
	        <div v-if="currentBill" class="n3AsideBody">
	        	<p class="asideHouseName basicInfo">{{currentBill.apartmentName}} {{currentBill.roomNumber}}室
	        	</p>
		        <p class="tabSectionTitle">
		          <i class="bf_icon_infos"></i>
		          账单信息
		        </p>
		        <div class="roomSection unEditState">
		          <el-col :span="5">申请人姓名</el-col>
		          <el-col :span="19">{{currentBill.realName}}</el-col>
		          <el-col :span="5">手机号</el-col>
		          <el-col :span="19">{{currentBill.cellphone}}</el-col>
		          <el-col :span="5">身份证号</el-col>
		          <el-col :span="19">{{currentBill.credentialNo}}</el-col>
		          <el-col :span="5">合同编号</el-col>
		          <el-col :span="19">{{currentBill.contractNo}}</el-col>
		          <el-col :span="5">账单编号</el-col>
		          <el-col :span="19">{{currentBill.loanNo}}</el-col>
		          <!-- <el-col :span="5">贷款编号</el-col>
		          <el-col :span="19">{{currentBill.loanNo}}</el-col> -->
		          <el-col :span="5">账单金额</el-col>
		          <el-col :span="19">{{(currentBill.amount + currentBill.interestAmount + currentBill.serviceCharge + currentBill.penaltyAmount) | amount2}}元</el-col>
		          <!-- <el-col :span="5">本金金额</el-col>
		          <el-col :span="19">{{currentBill.apartmentName}}元</el-col> -->
		          <el-col :span="5">利息金额</el-col>
		          <el-col :span="19">{{currentBill.interestAmount | amount2}}元</el-col>
		          <el-col :span="5">手续费</el-col>
		          <el-col :span="19">{{currentBill.serviceCharge | amount2}}元</el-col>
		          <el-col :span="5">违约金</el-col>
		          <el-col :span="19">{{currentBill.penaltyAmount | amount2}}元</el-col>
		          <el-col :span="5">应还款日</el-col>
		          <el-col :span="19">{{currentBill.paymentTime | dateYYMMDD}}</el-col>
		          <el-col :span="5">实还款日</el-col>
		          <el-col :span="19">{{currentBill.actualPaymentTime | dateYYMMDD}}</el-col>
		          <el-col :span="5">利率</el-col>
		          <el-col :span="19">{{currentBill.ratio | amount2}}%</el-col>
		          <el-col :span="5">还款类型</el-col>
		          <el-col :span="19">{{currentBill.repayType | repayType}}</el-col>
		        </div>

		        <p  v-if="transactionsInfo && transactionsInfo.length > 0" class="tabSectionTitle">
		          <i class="bf_icon_devify"></i>
		          支付信息
		        </p>
		        <div v-if="transactionsInfo && transactionsInfo.length > 0" class="roomSection unEditState">
		          <el-col :span="5">支付方式</el-col>
		          <el-col :span="19">{{transactionsInfo[0].transactionMethod | transactionMethod}}</el-col>
		          <el-col :span="5">支付账户</el-col>
		          <el-col :span="19"></el-col>
		          <el-col :span="5">支付日期</el-col>
		          <el-col :span="19">{{transactionsInfo[0].paymentTime | dateYYMMDD}}</el-col>
		        </div>
	        </div>
	    </n3-aside>
	</div>
</template>
<script>
	import constants from '../../constants'
	// import { n3Aside} from 'N3-components'
	export default {
		data: function() {
			return {
				currentBill: null,
				transactionsInfo: null
			}
		},
		methods: {
			openRight (val) {
				this.currentBill = val;
				var _this = this;
				_this.transactionsInfo = null;
			    _this.$api.get(constants.KCURLS.GETTRANSACTIONSBYORDERID + val.installmentOrderId,
			      function(res) {
			        _this.transactionsInfo = res;
			      },
			      function(err) {

			      });
		        this.$refs.roomReserveAsideRight.open();
		    },
		     closeRight () {
		        this.$refs.roomReserveAsideRight.close();
		    },
	    },
		watch: {
			
		},
		events: {
			
		},
		components: {
	        // n3Aside
	    }
	}
</script>
