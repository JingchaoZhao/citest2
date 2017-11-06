<template>
<div>
  
  <div class="bg_login">
    <div class="cover8">
      <div style="color: #black;  -ms-overflow-style: scrollbar; -webkit-app-region:drag;" id="title-bar-btns">
        <button @click="minimizeWindows" id="min-btn">-</button>
        <button @click="maximizeWindows" id="max-btn">+</button>
        <button @click="closeWindows" id="close-btn">x</button>
      </div>
    </div>
  </div>
  <div class="loginDiv">
    <el-col :span="10" class="logoArea">
      <p>登录</p>
      <span>蜂鸟屋后台管理系统</span>
      <div></div>
      <img class="loginLogo" src="~@/assets/logo_login.png" />
      <randomMoving></randomMoving>
    </el-col>
    <el-col :span="14" class="formArea">
      <img v-show="!isLoginByQrcode" src="~@/assets/ic_qrcode.png" @click='toggleQrcode(true)' class="qrPasswordToggle" />
      <img v-show="isLoginByQrcode" src="~@/assets/ic_password.png" @click='toggleQrcode(false)' class="qrPasswordToggle" />
      <div v-show="!isLoginByQrcode">
        <p class="toggleLogin"><span @click='toggleLogin(0)' v-bind:class="{active: currentLoginType == 0}">密码登录</span><span @click='toggleLogin(1)' v-bind:class="{active: currentLoginType == 1}">快捷登录</span></p>
        <mu-text-field class="userIdInput" label="手机号" :fullWidth="true" v-model="cellphone" :maxLength="11" :errorText="cellphoneErrorInfo" @textOverflow="overflowCellphone" v-on:focus="resetCellphoneError()" v-on:blur="testCellphone()" labelFloat/>
        <div v-show='currentLoginType == 0'>
          <mu-text-field class="userPwdInput" type="password" label="密码" :fullWidth="true" v-model="password" :errorText="pwdErrorInfo" v-on:focus="resetPwdError()" v-on:blur="testPwd()" labelFloat/>
          <el-radio class="radio " v-model="radio" label="1">保持登录状态</el-radio>
        </div>
        <div v-show='currentLoginType == 1'>
          <mu-text-field class="userPwdInput" style="padding-right: 80px;" label="输入验证码" :fullWidth="true" v-model="captcha" :maxLength="6" :errorText="captchaErrorInfo" @textOverflow="overflowCaptcha" v-on:focus="resetCaptchaError()" v-on:blur="testCaptcha()"
            labelFloat/>
          <div class="getVerifyCodeBtn" @click="sendVerifyCode">{{smsText}}</div>
        </div>
        <span class="forgotPwd">﻿<router-link to="/resetpassword">忘记密码？</router-link></span></span>
        <div v-show='currentLoginType==0' class="blockBtn greenBtn loginBtn" @click="loginByPassword()">登 录</div>
        <div v-show='currentLoginType==1' class="blockBtn greenBtn loginBtn" @click="loginBySmsCode()">登 录</div>
      </div>
      <div v-show="isLoginByQrcode">
        <p class="qrcodeTitle">手机扫码，安全登录</p>
        <img :src="qrcodeImg" class="qrcodeImg" />
      </div>
      <span class="noAccountReminder">还没有账号？<router-link style="color:#07bf96;" to="/register">注册</router-link></span>
    </el-col>
  </div>
</div>
</template>

<script>
// import Vue from 'vue'
// import 'muse-components/styles/base.less'
// import textField from 'muse-components/textField'
import randomMoving from '../subComponents/randomMoving'
import constants from '../../constants/index'
// ..
// Vue.component(textField.name, textField) like inculdes in components
import {mapActions} from 'vuex'
import { mapGetters } from 'vuex'

const {BrowserWindow} = require('electron').remote

export default {
  data() {
    return {
      radio: true,
      cellphone: "",
      cellphoneErrorInfo: "",
      password: '',
      pwdErrorInfo: '',
      captcha: "",
      captchaErrorInfo: "",
      waitCount: 60,
      waitTimer: null,
      smsText: "获取验证码",
      currentLoginType: 0,
      isLoginByQrcode: false,
      qrcodeImg: null,
      token: null,
      checkQrcodeLoginStateInterval: null
    };
  },
  methods: {
    ...mapActions([
      // 'someAsyncTask',
      'setaccessmenu',
      'showLoading',
      'hideLoading'
    ]),
    minimizeWindows() {
      var window = BrowserWindow.getFocusedWindow();
      window.minimize();
    },
    maximizeWindows() {
      var window = BrowserWindow.getFocusedWindow();
      if(window.isMaximized()){
          window.unmaximize();
      }else{
          window.maximize();
      }
    },
    closeWindows() {
      var window = BrowserWindow.getFocusedWindow();
      window.close();
    },
    checkingLoginByQrcode() {
      var _this = this;
      _this.checkQrcodeLoginStateInterval = setInterval(function() {
        _this.$api.getWechat(function(res) {
          if (res) {
            if (_this.checkQrcodeLoginStateInterval) {
              clearInterval(_this.checkQrcodeLoginStateInterval);
            }
          }
        }, function(err) {

        }, 2, _this.token);

      }, 1000);
    },
    toggleQrcode(fQrcode) {
      this.isLoginByQrcode = fQrcode;
      this.qrcodeImg = null;
      this.token = null;
      if (fQrcode) {
        this.generateQrcode();
      }
      else {
        if (this.checkQrcodeLoginStateInterval) {
          clearInterval(this.checkQrcodeLoginStateInterval);
        }
      }
    },
    generateQrcode() {
      var _this = this;
      _this.$api.getWechat(function(res) {
        _this.qrcodeImg = 'data:image/png;base64,' + res.base64Code;
        _this.token = res.token;
        _this.checkingLoginByQrcode();
      }, function(err) {

      }, 1);
    },
    toggleLogin(type) {
      this.currentLoginType = type;
    },
    testCellphone() {
      if (this.cellphone === '') {
        this.cellphoneErrorInfo = '手机号码不能为空！';
      }
    },
    overflowCellphone: function() {
      this.cellphoneErrorInfo = '手机号码是11位数字！';
    },
    resetCellphoneError() {
      this.cellphoneErrorInfo = "";
    },
    testPwd() {
      if (this.password === '') {
        this.pwdErrorInfo = '密码不能为空！';
      }
    },
    resetPwdError() {
      this.pwdErrorInfo = '';
    },
    testCaptcha() {
      if (this.captcha === '') {
        this.captchaErrorInfo = '验证码不能为空！';
      }
    },
    overflowCaptcha: function() {
      this.cellphoneErrorInfo = '验证码是6位数字！';
    },
    resetCaptchaError() {
      this.captchaErrorInfo = "";
    },
    loginByPassword() {
      this.$router.replace('/overview');
      if (this.cellphone === '') {
        this.cellphoneErrorInfo = '手机号码不能为空！';
        return false;
      }
      if (!constants.REGEXS.TEL.test(this.cellphone)) {
        this.cellphoneErrorInfo = '手机号码格式错误!';
        return false;
      }
      if (this.password === '') {
        this.pwdErrorInfo = '密码不能为空！';
        return false;
      }
      var data = {
        cellphone: this.cellphone,
        password: this.password
      };
      var that = this;
      //that.$router.replace('/overview');
      that.showLoading();
      that.$api.post(constants.KCURLS.SIGNINBYPASSWORD, data, function(res) {
        that.hideLoading();
        if (res.succeeded) {
          that.setaccessmenu({
            accessMenu: [1, 2, 3, 4, 5]
          });
          that.$router.replace('/overview');
        } else {
          that.$message.error(res.message);
        }
      }, function(err) {
        that.$message.error(err.message);
        that.hideLoading();
      });
    },
    loginBySmsCode: function() {
      if (this.cellphone === '') {
        this.cellphoneErrorInfo = '手机号码不能为空！';
        return false;
      }
      if (!constants.REGEXS.TEL.test(this.cellphone)) {
        this.cellphoneErrorInfo = '手机号码格式错误!';
        return false;
      }
      if (this.captcha === '') {
        this.captchaErrorInfo = '验证码不能为空！';
        return false;
      }
      if (!constants.REGEXS.CHECKCODE.test(this.captcha)) {
        this.pwdErrorInfo = '验证码是6位数字！';
        return false;
      }
      var that = this;
      var verify = {
        cellphone: this.cellphone,
        captcha: this.captcha,
        businessType: 203
      };
      // that.$router.replace('/overview');
      that.showLoading();
      that.$api.post(constants.KCURLS.VERIFYCAPTCHA, verify, function(res) {
        if (res.succeeded) {
          var data = {
            token: res.data.token
          };
          that.$api.post(constants.KCURLS.SIGNINBYSMSCODE, data, function(res1) {
            that.hideLoading();
            if (res1.succeeded) {
              that.setaccessmenu({
                accessMenu: [1, 2, 3, 4, 5]
              });
              that.$router.replace('/overview');
            }
            else {
              that.$message.error(res1.message);
            }
          }, function(err1) {
            that.$message.error(err1.message);
            that.hideLoading();
          });
        }
        else {
          that.hideLoading();
          that.$message.error(res.message);
        }
      }, function(err) {
        that.$message.error(err.message);
        that.hideLoading();
      });
    },
    sendWaitTimer: function() {
      if (this.waitCount > 0) {
        this.waitCount += -1;
        this.smsText = this.waitCount + "秒";
      } else {
        clearInterval(this.waitTimer);
        this.smsText = "获取验证码";
        this.waitCount = 60;
      }
    },
    sendVerifyCode() {
      if (this.cellphone === '') {
        this.cellphoneErrorInfo = '手机号码不能为空！';
        return false;
      }
      if (!constants.REGEXS.TEL.test(this.cellphone)) {
        this.cellphoneErrorInfo = '手机号码格式错误!';
        return false;
      }
      var data = {
        cellphone: this.cellphone,
        businessType: 203
      };
      var that = this;
      this.waitTimer = setInterval(function() {
        that.sendWaitTimer();
      }, 1000);
      that.showLoading();
      that.$api.post(constants.KCURLS.SENDCAPTCHA, data, function(res) {
        that.hideLoading();
        if (!res.succeeded) {
          that.waitCount = 0;
          that.$message.error(res.message);
        }
      },function(err) {
        that.hideLoading();
      });
    }
  },
  components: {
    // textField,
    randomMoving
  },
  computed: {
      ...mapGetters([
        'getState'
      ])
  },
  beforeDestroy() {
    if (this.checkQrcodeLoginStateInterval) {
      clearInterval(this.checkQrcodeLoginStateInterval);
    }
    if (this.waitTimer) {
      clearInterval(this.waitTimer);
    }
  }
}
</script>

<style scoped>
body {
  background: #e4e5e6 !important;
}
.loginBtn {
  border-radius: 100px;height: 36px;line-height: 36px; margin-top:100px; margin-bottom: 10px;
}
.noAccountReminder {
  font-size:14px;color:rgba(0,0,0,0.38);
}

.qrcodeTitle {
  font-size:14px;
  color:#8c96ab;
  margin: 60px 0;
}
.qrcodeImg {
  width: 160px;
  height: 160px;
  margin-bottom: 60px;
}
.loginLogo {
  margin-top: 70px; width: 90px;
}

.loginDiv {
  background: #ffffff;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.22), 0 24px 24px 0 rgba(0, 0, 0, 0.30);
  border-radius: 6px;
  width: 580px;
  height: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -290px;
  margin-top: -210px;
  background: #fff;
}

.loginDiv .el-col {
  height: 100%;
  position: relative;
}

.logoArea {
  background: #07bf96;
  color: #fff;
  text-align: center;
  overflow: hidden;
}

.logoArea p {
  margin-top: 80px;
  margin-bottom: 20px;
  font-size: 28px;
}

.logoArea span {
  font-size: 14px;
}

.formArea {
  padding: 0 40px;
  text-align: center;
  position: relative;
}
.qrPasswordToggle {
  position: absolute;
  right: 0;
  top: 0;
  width: 72px;
  height: 72px;
  cursor: pointer;
}

.userIdInput {
  /*margin-top: 20px;*/
}

.userPwdInput {
  /*margin-top: 40px;*/
}

.radio {
  margin-top: 20px;
  float: left;
}

.forgotPwd {
  float: right;
  font-size: 12px;
  color: #07bf96;
  margin-top: 20px;
  cursor: pointer;
}

.toggleLogin {
  margin-top: 40px;
}

.toggleLogin span {
  padding: 0px 20px;
  font-size: 14px;
  color: #8c96ab;
  cursor: pointer;
}

.toggleLogin span.active {
  color: #07bf96;
}

.toggleLogin span:first-child {
  border-right: 1px solid #dddddd;
}

.getVerifyCodeBtn {
  font-size: 12px;
  color: #07bf96;
  margin-top: -48px;
  border: 1px solid #07bf96;
  border-radius: 67px;
  width: 74px;
  height: 23px;
  line-height: 23px;
  cursor: pointer;
  position: absolute;
  left: 225px;
}
</style>
<style>
body {
  background: #e4e5e6 !important;
}

.loginDiv .el-radio .el-radio__label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.38);
}

.loginDiv .mu-text-field.focus-state {
  color: #07bf96;
}

.loginDiv .mu-text-field-focus-line {
  background: #07bf96;
}
</style>
