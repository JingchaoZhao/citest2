<template>
<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" class="billDlg" title="房间预定" v-model="isDlgVisable">
  <p class="dlgSectionTitle"><i class="bf_icon_roomInfo"></i>房间信息</p>
  <p class="apartNameP">{{roomInfo.apartmentName}} <!-- {{roomInfo.floor}}层 --> {{roomInfo.roomNumber}}室</p>
  <p class="dlgSectionTitle"><i class="bf_icon_uDetail"></i>租客信息</p>
  <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div style="clear: both"></div>
    <el-col :span="11">
      <el-form-item label="租客姓名" prop="tenantName">
        <el-input placeholder="输入租客姓名" v-model="ruleForm.tenantName">
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="2">&nbsp;
    </el-col>
    <el-col :span="11">
      <el-form-item label="手机号" prop="tenantCellphone">
        <el-input placeholder="输入租客手机号" :maxlength="11" v-model="ruleForm.tenantCellphone">
        </el-input>
      </el-form-item>
    </el-col>
    <div style="clear: both"></div>
    <el-col :span="11">
      <el-form-item label="开始日期" prop="checkInTime">
        <el-date-picker v-model="ruleForm.checkInTime" align="left" type="date" placeholder="输入开始日期">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="2">&nbsp;
    </el-col>
    <el-col :span="11">
      <el-form-item label="结束日期" prop="checkOutTime">
        <el-date-picker v-model="ruleForm.checkOutTime" align="left" type="date" placeholder="输入结束日期">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <div style="clear: both"></div>
    <el-col :span="11">
      <el-form-item label="定金总额" prop="deposite">
        <el-input placeholder="输入定金总额" v-model="ruleForm.deposite">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="2">&nbsp;
    </el-col>
    <el-col :span="11">
      <el-form-item label="付款日期" prop="paymentTime">
        <el-date-picker v-model="ruleForm.paymentTime" align="left" type="date" placeholder="输入付款日期">
        </el-date-picker>
      </el-form-item>
    </el-col>
     <div style="clear: both"></div>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <div class="primaryBtn" @click="hideDialog">取 消</div>
    <div class="blockBtn greenBtn" @click="submitForm('ruleForm')">确定</div>
  </div>
</el-dialog>
</template>
<script>
import validation from '../../validation/index'
import constants from '../../constants/index'
import { mapActions } from 'vuex'
// 
export default {
  props: ['showDialog', 'selectRoom'],
  data: function() {
    return {
      roomInfo: this.selectRoom,
      isDlgVisable: this.showDialog,
      ruleForm: {
        tenantName: '',
        tenantCellphone: '',
        checkInTime: new Date(),
        checkOutTime: new Date(),
        deposite: '',
        paymentTime: new Date()
      },
      rules: {
        tenantName: {
          required: true,
          message: '请输入租客姓名',
          trigger: 'blur'
        },
        tenantCellphone: validation.cellphone,
        checkInTime: {
          type: 'date',
          required: true,
          message: '请输入开始日期',
          trigger: 'change'
        },
        checkOutTime: {
          type: 'date',
          required: true,
          message: '请输入结束日期',
          trigger: 'change'
        },
        paymentTime: {
          type: 'date',
          required: true,
          message: '请输入付款日期',
          trigger: 'change'
        },
        deposite: validation.amount
      }
    }
  },
  methods: {
    ...mapActions([
          'showLoading',
          'hideLoading'
        ]),
    submitForm(ruleForm) {
      var that = this;
      that.$refs[ruleForm].validate((valid) => {
        if (valid) {
          var data = {
            tenantName: that.ruleForm.tenantName,
            tenantCellphone: that.ruleForm.tenantCellphone,
            checkInTime: (!(that.ruleForm.checkInTime instanceof Date)) ? that.ruleForm.checkInTime : that.ruleForm.checkInTime.Format('yyyy-MM-dd'),
            checkOutTime: (!(that.ruleForm.checkOutTime instanceof Date)) ? that.ruleForm.checkOutTime : that.ruleForm.checkOutTime.Format('yyyy-MM-dd'),
            deposite: that.ruleForm.deposite * 100,
            paymentTime: (!(that.ruleForm.paymentTime instanceof Date)) ? that.ruleForm.paymentTime : that.ruleForm.paymentTime.Format('yyyy-MM-dd'),
            apartmentId: that.roomInfo.apartmentId,
            roomId: that.roomInfo.roomId,
          }
          that.showLoading();
          that.$api.post(constants.KCURLS.CREATEROOMRESERVATION, data, function(res) {
            that.hideLoading();
            if (res.succeeded) {
              that.isDlgVisable = false;
              that.$message({
                message: '预定房间成功',
                type: 'success'
              });
              that.$emit('on-add-success', res.data.orderId);
            } else {
              that.$message.error(res.message);
            }
          }, err=> {
            that.hideLoading();
          });

        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    hideDialog: function() {
      this.isDlgVisable = false;
    }
  },
  watch: {
    showDialog(val) {
      this.isDlgVisable = val;
    },
    isDlgVisable(val) {
      this.$emit("on-result-change", val);
    },
    selectRoom(val) {
      this.roomInfo = val;
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
<style type="less">
.billDlg .el-dialog--small {
  height: 610px;
  margin-top: -305px;
}
</style>
