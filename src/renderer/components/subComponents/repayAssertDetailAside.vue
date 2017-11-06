<template>
	<div>
		<n3-aside class="asideCommon" placement="right" title="Title" width="692px" ref="roomReserveAsideRight" style="overflow-y: scroll;" :header="false">
	        <div class="asideHeader">
	          还款详情
	          <i @click="closeRight()" class="el-dialog__close el-icon el-icon-close"></i>
	        </div>
	        <div class="n3AsideBody">
	        	<p class="asideHouseName basicInfo">青年汇 A楼1层 A0103室
	        	</p>
	        	<p class="tabSectionTitle">
		          <i class="bf_icon_devify"></i>
		          支付信息
		        </p>
		        <div class="roomSection unEditState">
		          <el-col :span="5">支付方式</el-col>
		          <el-col :span="19">微信支付</el-col>
		          <el-col :span="5">支付账户</el-col>
		          <el-col :span="19">kjajakdfhlll_opooook</el-col>
		          <el-col :span="5">支付日期</el-col>
		          <el-col :span="19">2017-02-26</el-col>
		          <el-col :span="5">支付人姓名</el-col>
		          <el-col :span="19">王志锐</el-col>
		          <el-col :span="5">手机号</el-col>
		          <el-col :span="19">16216885609</el-col>
		          <el-col :span="5">身份证号</el-col>
		          <el-col :span="19">420928199610090018</el-col>
		        </div>
		        <p class="tabSectionTitle">
		          <i class="bf_icon_payType"></i>
		          还款信息
		        </p>
		        <div class="roomSection unEditState">
		          <el-col :span="5">合同编号</el-col>
		          <el-col :span="19">10695893834432343</el-col>
		          <el-col :span="5">贷款编号</el-col>
		          <el-col :span="19">10695893834432343</el-col>
		          <el-col :span="5">还款总额</el-col>
		          <el-col :span="19">50000元</el-col>
		          <el-col :span="5">本金还款额</el-col>
		          <el-col :span="19">30000元</el-col>
		          <el-col :span="5">利息还款额</el-col>
		          <el-col :span="19">5000元</el-col>
		          <el-col :span="5">手续费</el-col>
		          <el-col :span="19">30000元</el-col>
		          <el-col :span="5">违约金</el-col>
		          <el-col :span="19">5000元</el-col>
		          <el-col :span="5">贷款余额</el-col>
		          <el-col :span="19">3000元</el-col>
		          <el-col :span="5">利率</el-col>
		          <el-col :span="19">35%</el-col>
		          <el-col :span="5">还款类型</el-col>
		          <el-col :span="19">处置还款</el-col>
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
			}
		},
		methods: {
			openRight () {
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
