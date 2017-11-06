<template>
	<div>
    <img v-if="currentContractInfos && !currentContractInfos.contractResponse.confirmed" src="~@/assets/chuo.png" style="width: 70px; float: right;" />
      <p v-if="currentContractInfos" class="tabSectionTitle">
        <i class="bf_icon_uDetail"></i> 租客信息
      </p>
      <div v-if="currentContractInfos" class="roomSection unEditState">
        <el-col :span="4">租客姓名</el-col>
        <el-col :span="20">{{currentContractInfos.simpleTenantInfoResponse.realName}}</el-col>
        <el-col :span="4">手机号码</el-col>
        <el-col :span="20">{{currentContractInfos.simpleTenantInfoResponse.cellphone}}</el-col>
        <el-col :span="4">身份证号</el-col>
        <el-col :span="20">{{currentContractInfos.simpleTenantInfoResponse.idCardNo}}</el-col>
        <el-col :span="4">身份证附件</el-col>
        <el-col :span="24">
          <el-upload action="//jsonplaceholder.typicode.com/posts/"   list-type="picture-card" :on-preview="handlePictureCardPreviewIdCard" :file-list="currentContractInfos.idcardImgList">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-col>
        <!-- <el-col :span="4">同住人</el-col> -->
        <!-- <el-col :span="20">王重阳 | 手机: 13677889920 | 身份证: 310230198876543567
          <br/> 丘处机 | 手机: 13677889920 | 身份证: 310230198876543567
        </el-col> -->
      </div>
      <p v-if="currentContractInfos" class="tabSectionTitle">
        <i class="bf_icon_record"></i> 合同信息
      </p>
      <div v-if="currentContractInfos" class="roomSection unEditState">
        <el-col :span="4">合同编号</el-col>
        <el-col :span="20">{{currentContractInfos.contractResponse.contractNo}}</el-col>
        <el-col :span="4">合同类型</el-col>
        <el-col :span="20">{{currentContractInfos.contractResponse.contractType | contractType}}</el-col>
        <el-col :span="4">租赁时间</el-col>
        <el-col :span="20">{{currentContractInfos.contractResponse.rentStartTime | dateYYMMDD}}至{{currentContractInfos.contractResponse.rentEndTime | dateYYMMDD}}</el-col>
        <el-col :span="4">月租金</el-col>
        <el-col :span="20">{{currentContractInfos.contractResponse.monthlyAmount | amount0}}元
          <el-tag style="margin-left: 10px;" color="#3bde86">原</el-tag> {{currentContractInfos.contractResponse.originalAmount | amount0}}元
          <el-tag style="margin-left: 10px;" color="#ff6260">折</el-tag> {{currentContractInfos.contractResponse.discount | discount}}</el-col>
        <el-col :span="4">支付方式</el-col>
        <el-col :span="20">押{{currentContractInfos.contractResponse.depositPeriod}}付{{currentContractInfos.contractResponse.payPeriod}}</el-col>
        <el-col :span="4">收租日期</el-col>
        <el-col :span="20">每期{{currentContractInfos.contractResponse.payDay}}日</el-col>
        <el-col :span="4">房屋押金</el-col>
        <el-col :span="20">{{currentContractInfos.contractResponse.depositAmount | amount0}}元</el-col>
        <el-col :span="4">门禁卡押金</el-col>
        <el-col :span="20">{{currentContractInfos.contractResponse.accessCardDepositAmount | amount0}}元</el-col>
        <el-col :span="4">其他押金</el-col>
        <el-col :span="20">{{currentContractInfos.contractResponse.othersDepositAmount | amount0}}元</el-col>
        <el-col :span="4">业务员信息</el-col>
        <el-col :span="20"></el-col>
        <el-col :span="4">合同附件</el-col>
        <el-col :span="24">
          <el-upload action="//jsonplaceholder.typicode.com/posts/"   list-type="picture-card" :on-preview="handlePictureCardPreviewContract" :file-list="currentContractInfos.contractImgList">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-col>
      </div>
      <div v-if="!currentContractInfos" style="width: 100%; text-align: center; padding-top:40px;">
        <img src="~@/assets/noContract.png" style="width: 140px;" />
        <div @click="openAddContractDlg" class="blockBtn greenBtn" style="width: 100px; height: 30px; line-height: 30px; margin: 30px auto; margin-top: 20px">立即签约</div>
      </div>
      <div style="height: 20px;"></div>
      <addcontractdlg :roomInfo="currentRoom" :showDialog='openContractDlg' v-if="openContractDlg" v-on:on-add-success="contractCreateSuccess" @on-result-change="onContractResultChange"></addcontractdlg>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import constants from '../../constants/index'
  import addcontractdlg from './addContractDlg'
	export default {
		props: ['contractDetail', 'currentRoom'],
		data: function() {
			return {
        currentContractInfos: this.contractDetail,
        openContractDlg: false
			}
		},
		methods: {
      ...mapActions([
        'visibledialog'
      ]),
      handleRemove(file, fileList) {
      },
      handlePictureCardPreviewIdCard(file) {
          this.visibledialog({
            url: file.url,
            urlList: this.currentContractInfos.idcardImgList
          });
      },
      handlePictureCardPreviewContract(file) {
          this.visibledialog({
            url: file.url,
            urlList: this.currentContractInfos.contractImgList
          });
      },
      openAddContractDlg: function() {
        this.openContractDlg = true;
      },
      onContractResultChange(val) {
        this.openContractDlg = val;
      },
      contractCreateSuccess() {
        this.$emit('on-add-success');
      },
	  },
		watch: {
      contractDetail(val) {
        this.currentContractInfos = val;
      }
		},
    created() {
    },
		components: {
      addcontractdlg
		}
	}
</script>