<template>
	<div>
		<n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="roomReserveAsideRight" style="overflow-y: scroll;" :header="false">
	        <div class="asideHeader">
	          贷款详情
	          <el-tag v-if="currentLoan" color="#ff8c14">{{currentLoan.loanState | loanStateFinance}}</el-tag>
	          <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
	        </div>
	        <div v-if="currentLoan" class="n3AsideBody">
	        	<p class="asideHouseName basicInfo">{{currentLoan.apartmentName}} {{currentLoan.roomNumber}}室
	        	</p>
		        <p class="tabSectionTitle">
		          <i class="bf_icon_loanInfos"></i>
		          贷款信息
		        </p>
		        <div class="roomSection unEditState">
		          <el-col :span="5">申请人姓名</el-col>
		          <el-col :span="19">{{currentLoan.realName}}</el-col>
		          <el-col :span="5">手机号</el-col>
		          <el-col :span="19">{{currentLoan.cellphone}}</el-col>
		          <el-col :span="5">身份证号</el-col>
		          <el-col :span="19">{{currentLoan.credentialNo}}</el-col>
		          <el-col :span="5">合同编号</el-col>
		          <el-col :span="19">{{currentLoan.contractNo}}</el-col>
		          <el-col :span="5">贷款编号</el-col>
		          <el-col :span="19">{{currentLoan.loanNo}}</el-col>
		          <el-col :span="5">申请时间</el-col>
		          <el-col :span="19">{{currentLoan.loanApplyTime | dateYYMMDD}}</el-col>
		          <el-col :span="5">每期还款日</el-col>
		          <el-col :span="19">{{currentLoan.repayDay}}</el-col>
		          <el-col :span="5">贷款周期</el-col>
		          <el-col :span="19">{{currentLoan.loanPeriod}}</el-col>
		          <el-col :span="5">贷款额度</el-col>
		          <el-col :span="19">{{currentLoan.amount | amount2}}元</el-col>
		          <el-col :span="5">待还款额</el-col>
		          <el-col :span="19">{{currentLoan.repayRemainAmount | amount2}}元</el-col>
		          <el-col :span="5">贷款状态</el-col>
		          <el-col :span="19">{{currentLoan.loanState | loanStateFinance}}</el-col>
		          <el-col :span="5">利率</el-col>
		          <el-col :span="19">{{currentLoan.interestRate}}&#8241;</el-col>
		          <el-col :span="5">还款方式</el-col>
		          <el-col :span="19">{{currentLoan.repayMethod | repayMethod}}</el-col>
		        </div>
	        </div>
	    </n3-aside>
	</div>
</template>
<script>
	// import { n3Aside} from 'N3-components'
	export default {
		data: function() {
			return {
				currentLoan: null
			}
		},
		methods: {
			openRight (val) {
				this.currentLoan = val;
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
