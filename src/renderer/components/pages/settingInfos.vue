<template>
  <div ref="organizaContent">
    <div class="basicAccountInfos">
      <img  />
      <div>
        <p>李小龙</p>
        <span>15988776653</span>
      </div>
    </div>

    <el-tabs class="accountModifyTabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="paneItem" label="个人资料" name="first">
        <div class="modifyAccountInfo">
        </div>
      </el-tab-pane>
      <el-tab-pane class="paneItem" label="修改密码" name="second">
        <el-form label-position="top" class="modifyPwd" :model="pwdForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="旧密码" prop="name">
            <el-input v-model="pwdForm.name"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="name">
            <el-input v-model="pwdForm.name"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="name">
            <el-input v-model="pwdForm.name"></el-input>
          </el-form-item>
          <div class="submitInfos">更改</div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane class="paneItem" label="我的群组" name="third">我的群组</el-tab-pane>
      <el-tab-pane class="paneItem" label="我的权限" name="fourth">我的权限</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: this.$route.params.tab,
        pwdForm: {

        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    mounted: function(){
      const _this = this;
      console.log(_this.$refs);
      console.log(_this.$refs.organizaContent);
      let checkGroupEls = _this.$refs.organizaContent.querySelectorAll('.paneItem');
      
      [].forEach.call(checkGroupEls, function(div) {
        div.style.minHeight = document.documentElement.clientHeight - 265 + 'px';
      });
    },
    created() {
      console.log(this.$route.params.tab);
	  },
    components : {
    },
  };
</script>

<style scoped>
  .basicAccountInfos {
    margin: 30px 0 30px 30px;
  }
  .basicAccountInfos img, .basicAccountInfos div{
    vertical-align: top;
  }
  .basicAccountInfos img {
    width: 50px;
    height: 50px;
  }
  .basicAccountInfos div {
    display: inline-block;
    font-size: 0;
    margin-left: 10px;
  }
  .basicAccountInfos div p {
    font-size:20px;
    margin-bottom: 6px;
    color:#000000;
  }
  .basicAccountInfos div span {
    font-size:14px;
    color:#6d6f72;
  }
  .accountModifyTabs {
    margin-left: -20px;
    margin-right: -20px;
  }
  .modifyPwd {
    width: 500px;
    margin: 0 auto;
  }
  .submitInfos {
    background:#07bf96;
    border-radius:4px;
    width:100%;
    height:50px;
    font-size:16px;
    color:#ffffff;
    line-height: 50px;
    text-align: center;
    margin-top: 50px;
  }
</style>
<style>
.accountModifyTabs .el-tabs__header {
  margin: 0; 
  padding-left: 50px;
  border-bottom: 0;
}
.accountModifyTabs .el-tabs__item.is-active {
  color:#07bf96;
}
.accountModifyTabs .el-tabs__active-bar {
  background: #07bf96;
}
.accountModifyTabs .el-tab-pane {
  background: #fff;
  padding-top: 110px;
}
</style>