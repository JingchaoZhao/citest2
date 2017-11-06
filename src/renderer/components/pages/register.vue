<template>
<div>
  <div class="bg_login">
    <div class="cover8"></div>
  </div>
  <div class="loginDiv">
    <el-col :span="10" class="logoArea">
      <p>注册</p>
      <span>蜂鸟屋后台管理系统</span>
      <div></div>
      <img class="regesterLogo" src="../../assets/logo_login.png" />
      <randomMoving></randomMoving>
    </el-col>
    <el-col :span="14" class="formArea">
      <mu-text-field class="userIdInput" label="手机号" :fullWidth="true" v-model="cellphone" :errorText="cellphoneErrorInfo" :maxLength="11" @textOverflow="overflowCellphone" v-on:focus="resetCellphoneError()" v-on:blur="testCellphone()" labelFloat/>
      <mu-text-field style="padding-right: 80px;" class="userPwdInput" label="输入验证码" :fullWidth="true" v-model="captcha" :errorText="captchaErrorInfo" :maxLength="6" @textOverflow="overflowCaptcha" v-on:focus="resetCaptchaError()" v-on:blur="testCaptcha()"
        labelFloat/>
      <div class="getVerifyCodeBtn" @click="sendVerifyCode">{{smsText}}</div>
      <mu-text-field class="userPwdInput" type="password" label="密码" :fullWidth="true" v-model="password" :errorText="pwdErrorInfo" v-on:focus="resetPwdError()" v-on:blur="testPwd()" labelFloat/>
      <mu-text-field class="userPwdInput" type="password" label="确认密码" :fullWidth="true" v-model="rpassword" :errorText="rpwdErrorInfo" v-on:focus="resetRPwdError()" v-on:blur="testRPwd()" labelFloat/>
      <div class="blockBtn greenBtn regesterBtn" @click="handleSubmit">注 册</div>
    </el-col>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import {mapActions} from 'vuex'
// import 'muse-components/styles/base.less'
// import textField from 'muse-components/textField'
import randomMoving from '../subComponents/randomMoving'
import constants from '../../constants/index'
// ..
// Vue.component(textField.name, textField)
export default {
  data() {
    return {
      radio: false,
      cellphone: "",
      captcha: "",
      password: "",
      rpassword: "",
      waitCount: 60,
      waitTimer: null,
      smsText: "获取验证码",
      cellphoneErrorInfo: "",
      captchaErrorInfo: "",
      pwdErrorInfo: "",
      rpwdErrorInfo: ""
    };
  },
  methods: {
    ...mapActions([
      'setaccessmenu',
      'showLoading',
      'hideLoading'
    ]),
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
    testPwd() {
      if (this.password === '') {
        this.pwdErrorInfo = '密码不能为空！';
      }
    },
    resetPwdError() {
      this.pwdErrorInfo = "";
    },
    testRPwd() {
      if (this.rpassword === '') {
        this.rpwdErrorInfo = '确认密码不能为空！';
      }
    },
    resetRPwdError() {
      this.rpwdErrorInfo = "";
    },
    handleSubmit(ev) {
      if (this.cellphone === '') {
        this.cellphoneErrorInfo = '手机号码不能为空！';
        return false;
      }
      if (!constants.REGEXS.TEL.test(this.cellphone)) {
        this.cellphoneErrorInfo = '手机号码格式错误!';
        return false;
      }
      if (this.captcha === '') {
        this.userNameErrorInfo = '验证码不能为空！';
        return false;
      }
      if (!constants.REGEXS.CHECKCODE.test(this.captcha)) {
        this.pwdErrorInfo = '验证码是6位数字！';
        return false;
      }
      if (this.password === '') {
        this.pwdErrorInfo = '密码不能为空！';
        return false;
      }
      if (this.rpassword === '') {
        this.rpwdErrorInfo = '确认密码不能为空！';
        return false;
      }
      if (this.password != this.rpassword) {
        this.rpwdErrorInfo = '确认密码输入错误';
        return false;
      }
      var password = this.password;
      var that = this;
      var verify = {
        cellphone: this.cellphone,
        captcha: this.captcha,
        businessType: 105
      };
      that.showLoading();
      that.$api.post(constants.KCURLS.VERIFYCAPTCHA, verify, function(res) {
        if (res.succeeded) {
          var data = {
            token: res.data.token,
            licenseCode: "123456",
            password: password
          };
          that.$api.post(constants.KCURLS.SIGNUP, data, function(res1) {
            that.hideLoading();
            if (res1.succeeded) {
              that.$router.replace('/overview');
            }
            else {
              that.$message.error(res.message);
            }
          }, function(err1) {
            that.hideLoading();
          });
        }
        else {
          that.$message.error(res.message);
          that.hideLoading();
        }
      }, function(err) {
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
        businessType: 105
      };
      var that = this;
      that.showLoading();
      this.waitTimer = setInterval(function() {
        that.sendWaitTimer();
      }, 1000);
      that.$api.post(constants.KCURLS.SENDCAPTCHA, data, function(res) {
        that.hideLoading();
        if (!res.succeeded) {
          that.waitCount = 0;
          that.$message.error(res.message);
        }
      }, function(err) {
        that.hideLoading();
      });
    }
  },
  components: {
    randomMoving
  }
}
</script>

<style scoped>
  body {
    background: #e4e5e6 !important;
  }
  .regesterLogo {
    margin-top: 70px; width: 90px;
  }
  .regesterBtn {
    border-radius: 100px;height: 36px;line-height: 36px; margin-top: 10px;
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
    position: relative;
    overflow: hidden;
    text-align: center;
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
  }

  .userIdInput {
    margin-top: 20px;
  }

  .userPwdInput {
    /*margin-top: 40px;*/
    margin-top: -5px;
  }

  .forgotPwd {
    float: right;
    font-size: 12px;
    color: #07bf96;
    margin-top: 20px;
    cursor: pointer;
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
