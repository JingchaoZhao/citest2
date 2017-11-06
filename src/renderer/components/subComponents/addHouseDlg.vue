<template>
<div>
  <el-dialog @close="initDlg" :close-on-click-modal="false" :close-on-press-escape="false" class="subHouseAddDlg" title="添加房间" v-model="isDlgVisable">
    <p class="dlgSectionTitle"><i class="bf_icon_roomInfo"></i>房间信息</p>
    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div style="clear: both"></div>
      <el-col :span="11">
        <el-form-item label="朝向" prop="orientation">
          <el-select v-model="ruleForm.orientation" placeholder="选择朝向">
            <el-option label="东" value="东"></el-option>
            <el-option label="南" value="南"></el-option>
            <el-option label="西" value="西"></el-option>
            <el-option label="北" value="北"></el-option>
            <el-option label="南北" value="南北"></el-option>
            <el-option label="东西" value="东西"></el-option>
            <el-option label="东南" value="东南"></el-option>
            <el-option label="西南" value="西南"></el-option>
            <el-option label="东北" value="东北"></el-option>
            <el-option label="西北" value="西北"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        &nbsp;
      </el-col>
      <el-col :span="11">
        <el-form-item label="户型" prop="roomTypeName">
          <el-input type="text" placeholder="输入户型" v-model="ruleForm.roomTypeName"></el-input>
        </el-form-item>
      </el-col>
      <div style="clear: both"></div>
      <el-col :span="11">
        <el-form-item label="面积" prop="roomTypeSize">
          <el-input placeholder="输入面积" v-model="ruleForm.roomTypeSize">
            <template slot="append">m&sup2;</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item label="装修类型" prop="decorationType">
          <el-select v-model="ruleForm.decorationType" placeholder="选择装修类型">
            <el-option label="毛坯" value="MaoPi"></el-option>
            <el-option label="简装" value="JianZhuang"></el-option>
            <el-option label="精装" value="JingZhuang"></el-option>
            <el-option label="豪装" value="HaoZhuang"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <div style="clear: both"></div>
      <el-form-item label="门市价" prop="retailPrice">
        <el-input placeholder="请输入门市价" v-model="ruleForm.retailPrice">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="装修描述" prop="decorationDescription">
        <el-input type="textarea" :rows="2" placeholder="输入装修描述详细" v-model="ruleForm.decorationDescription">
        </el-input>
      </el-form-item>
      <el-form-item label="添加房间图片" prop="pictures">
        <el-upload :action="uploadUri"   list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="uploadSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div class="primaryBtn" @click="hideDialog()">取 消</div>
      <div class="blockBtn greenBtn" @click="submitForm('ruleForm')">确 定</div>
    </div>
  </el-dialog>

  <el-dialog v-model="dialogVisible" class="pictureViewDlg">
    <img :src="dialogImageUrl" alt>
  </el-dialog>
</div>
</template>
<script>
import constants from '../../constants/index'
import { mapActions } from 'vuex'
export default {
  props: ['showDialog', 'selectApartment', 'selectFloor'],
  data: function() {
    return {
      uploadUri: this.$api.uploadUri,
      isDlgVisable: this.showDialog,
      apartmentinfo: this.selectApartment,
      floor: this.selectFloor,
      urlPictures: [],
      dialogImageUrl: '',
      dialogVisible: false,
      pictures: '',
      ruleForm: {
        orientation: '',
        roomTypeName: '',
        roomTypeSize: '',
        decorationType: 'JingZhuang',
        decorationDescription: '',
        retailPrice: null
      },
      rules: {
        orientation: {
          required: true,
          message: '请选择朝向',
          trigger: 'change'
        },
        roomTypeName: {
          required: true,
          message: '请输入户型',
          trigger: 'blur'
        },
        roomTypeSize: [{
          required: true,
          message: '请输入面积',
          trigger: 'blur'
        },{
            validator: (rule, value, callback) => {
              if (constants.REGEXS.AMOUNT.test(value) == false) {
                callback(new Error("面积格式错误"));
              } else {
                callback();
              }
            },
            trigger: 'blur'
        }],
        decorationType: {
          required: true,
          message: '请选择装修类型',
          trigger: 'change'
        },
        retailPrice: [{
              validator: (rule, value, callback) => {
                if (value && constants.REGEXS.AMOUNT.test(value) == false) {
                  callback(new Error("金额格式错误"));
                } else {
                  callback();
                }
              },
              trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
        'showLoading',
        'hideLoading',
        'visibledialog'
    ]),
    submitForm(ruleForm) {
      var that = this;
      that.$refs[ruleForm].validate((valid) => {
        if (valid) {
          var data = Object.assign({
            apartmentId: that.apartmentinfo.apartmentId,
            floor: that.floor,
            pictures: that.urlPictures
          }, that.ruleForm);
          data.retailPrice = that.ruleForm.retailPrice * 100;
          data.roomTypeSize = that.ruleForm.roomTypeSize * 10000;
          that.showLoading();
          that.$api.post(constants.KCURLS.CREATEROOM, data, function(res) {
            that.hideLoading();
            if (res.succeeded) {
              that.isDlgVisable = false;
              that.$message({
                message: '房间添加成功',
                type: 'success'
              });
              that.$emit('on-add-success');
            } else {
              that.$message.error(res.message);
            }
          }, err => {
            that.hideLoading();
          });
        }
      });
    },
    getPictures: function(fileList) {
      this.urlPictures = [];
      if (fileList.length > 0) {
        for (var i = 0; i < fileList.length; i++) {
          this.urlPictures.push(fileList[i].response[0].url);
        }
      }
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    uploadSuccess(res, file, fileList) {
      this.getPictures(fileList);
    },
    handleRemove(file, fileList) {
      this.getPictures(fileList);
    },
    handlePictureCardPreview(file) {
      this.visibledialog({
          url: file.url
      });
    },
    hideDialog: function() {
      this.isDlgVisable = false;
    },
    initDlg() {
      this.$refs['ruleForm'].resetFields();
    }
  },
  watch: {
    selectApartment(val) {
      this.apartmentinfo = val;
    },
    selectFloor(val) {
      this.floor = val;
    },
    showDialog(val) {
      this.isDlgVisable = val;
    },
    isDlgVisable(val) {
      this.$emit("on-result-change", val);
    }
  }
}
</script>
<style scoped>
p.houseInfo {
  font-size: 16px;
  color: #3c4144;
  padding-left: 20px;
  margin-bottom: 25px;
  font-weight: bold;
}
</style>
<style>
.subHouseAddDlg .el-dialog--small {
  width: 560px;
  height: 620px;
  margin-top: -310px;
}
.subHouseAddDlg .el-dialog--small .el-dialog__body {
   max-height: 512px;
}
</style>
