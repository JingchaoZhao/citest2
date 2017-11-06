<template>
<el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false" class="apartmentAddDlg" title="添加公寓" v-model="isDlgVisable">
  <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px">
    <el-form-item label="公寓所在区域" required>
      <el-col :span="11">
        <el-form-item prop="city">
          <el-select style="100%" v-model="ruleForm.city" placeholder="城市">
            <el-option v-for="item in cities" :value="item.cityName" :key="item.cityName"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2" style="text-align: center">-</el-col>
      <el-col :span="11">
        <el-form-item prop="region">
          <el-select style="100%" v-model="ruleForm.region" placeholder="区域">
            <el-option v-for="item in districts" v-if="isRegionInSelectedCity(item.districtName)" :value="item.districtName" :key="item.districtName"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="公寓名称" prop="apartmentName">
      <el-input placeholder="请输入公寓名称" v-model="ruleForm.apartmentName"></el-input>
    </el-form-item>
    <el-form-item label="公寓地址" prop="address">
      <el-input placeholder="请输入公寓地址" v-model="ruleForm.address"></el-input>
    </el-form-item>
    <el-form-item label="楼层" prop="apartAddress" required>
      <el-col :span="11">
        <el-form-item prop="bottomFloor">
          <el-input placeholder="请输入最低层" v-model="ruleForm.bottomFloor">
            <template slot="append">层</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" style="text-align: center">至</el-col>
      <el-col :span="11">
        <el-form-item prop="topFloor">
          <el-input placeholder="请输入最高层" v-model="ruleForm.topFloor">
            <template slot="append">层</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-col :span="11">
    <el-form-item label="每层房间数" prop="roomCount">
      <el-input placeholder="请输入每层房间数" v-model="ruleForm.roomCount">
        <template slot="append">间</template>
      </el-input>
    </el-form-item>
    </el-col>
    <el-col :span="2" style="text-align: center">&nbsp;</el-col>
    <el-col :span="11">
    <el-form-item label="平均门市价" prop="retailPrice">
      <el-input placeholder="请输入平均门市价" v-model="ruleForm.retailPrice">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    </el-col>
    <el-form-item label="装修类型" prop="decorationType">
      <el-select style="100%" v-model="ruleForm.decorationType" placeholder="装修类型">
        <el-option v-for="item in decorationTypes" :label="item.label" :key="item.value" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="交通信息" prop="trafficMethod">
      <el-input type="textarea" :rows="1" placeholder="请输入相关交通信息描述" v-model="ruleForm.trafficMethod">
      </el-input>
    </el-form-item>
    <el-form-item label="周边配套" prop="supportFacilities">
      <el-input type="textarea" :rows="1" placeholder="请输入周边配套" v-model="ruleForm.supportFacilities">
      </el-input>
    </el-form-item>
    <el-form-item label="添加图片信息" prop="apartAddress">
      <el-upload :action="uploadUri"   list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <div class="primaryBtn" @click="isDlgVisable = false">取 消</div>
    <div class="blockBtn greenBtn" @click="submitForm('ruleForm')">确 定</div>
  </div>
</el-dialog>
</template>
<script>
import constants from '../../constants'
import validation from '../../validation'
import { mapActions } from 'vuex'
export default {
  props: ['showDialog'],
  data: function() {
    return {
      uploadUri: this.$api.uploadUri,
      cities: null,
      districts: null,
      selectcityDistricts: [],
      loading: false,
      apartmentPictures: [],
      decorationTypes: [{
        value: 'MaoPi',
        label: '毛坯'
      }, {
        value: 'JianZhuang',
        label: '简装'
      }, {
        value: 'JingZhuang',
        label: '精装'
      }, {
        value: 'HaoZhuang',
        label: '豪装'
      }],
      formLabelWidth: '120px',
      isDlgVisable: this.showDialog,
      ruleForm: {
        city: '',
        region: '',
        district: '', // city + region
        apartmentName: '',
        address: '',
        bottomFloor : '',
        topFloor : '',
        roomCount: '',
        retailPrice: '',
        decorationType: 'JingZhuang',
        trafficMethod: '',
        supportFacilities: '',
        pictures : '',
        contacts : ''
      },
      rules: {
        city: [{
          required: true,
          message: '请选择城市',
          trigger: 'change'
        }],
        region: [{
          required: true,
          message: '请选择区域',
          trigger: 'change'
        }],
        apartmentName: [{
          required: true,
          message: '请输入公寓名称',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '请输入公寓地址',
          trigger: 'blur'
        }],
        bottomFloor: validation.floor,
        topFloor: validation.floor,
        roomCount: validation.floorRoomCount,
        retailPrice: validation.amount,
        trafficMethod: [{
          max: 200,
          message: '长度在200个字符',
          trigger: 'blur'
        }],
        apartPrice: [{
          max: 200,
          message: '长度在200个字符',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    ...mapActions([
        'visibledialog',
        'showLoading',
        'hideLoading'
    ]),
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        } else {
          _this.showLoading();
          _this.ruleForm.district = _this.ruleForm.city + _this.ruleForm.region;
          var tempContractPicString = [];
          if (_this.apartmentPictures) {
            for (var i = 0; i < _this.apartmentPictures.length; i++) {
              tempContractPicString.push(_this.apartmentPictures[i].response[0].url);
            }
          }
          var params =  {
            district: _this.ruleForm.city + _this.ruleForm.region, // city + region
            apartmentName: _this.ruleForm.apartmentName,
            address: _this.ruleForm.address,
            bottomFloor : _this.ruleForm.bottomFloor,
            topFloor : _this.ruleForm.topFloor,
            roomCount: _this.ruleForm.roomCount,
            retailPrice: _this.ruleForm.retailPrice * 100,
            decorationType: _this.ruleForm.decorationType,
            trafficMethod: _this.ruleForm.trafficMethod,
            supportFacilities: _this.ruleForm.supportFacilities,
            pictures : tempContractPicString,
            contacts : _this.ruleForm.contacts
          };
          _this.$api.post(constants.KCURLS.CREATEAPARTMENT, params,
            function(res) {
              _this.hideLoading();
              if (!res.succeeded) {
                _this.$message.error(res.message);
              }
              else {
                _this.$message({
                  message: '公寓创建成功！',
                  type: 'success'
                });
                _this.$emit('on-add-success');
                _this.isDlgVisable = false;
              }
              
            },
            function(err) {
              _this.hideLoading();
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      this.apartmentPictures = fileList;
    },
    handleSuccess(response, file, fileList) {
      this.apartmentPictures = fileList;
    },
    handlePictureCardPreview(file) {
      this.visibledialog({
          url: file.url
      });
    },
    isRegionInSelectedCity(val) {
      if (!this.ruleForm.city) {
        return false;
      }
      for (var i = 0; i < this.districts.length; i++) {
        if (this.districts[i].districtName == val) {
          if (this.districts[i].cityName == this.ruleForm.city) {
            return true;
          }
          else {
            return false;
          }
        }
      }
      return false;
    }
  },
  created() {
      var _this = this;
      _this.$api.get(constants.KCURLS.QUERYCITIES,
        function(res) {
          _this.cities = res;
          if (_this.cities.length == 0) {
            _this.$message.error('未查看到城市信息，请联系系统管理员！');
          }
        });
      _this.$api.get(constants.KCURLS.QUERYDISTRICTS,
        function(res) {
          _this.districts = res;
          if (_this.districts.length == 0) {
            _this.$message.error('未查看到区域信息，请联系系统管理员！');
          }
        });
  },
  watch: {
    showDialog(val) {
      this.isDlgVisable = val;
    },
    isDlgVisable(val) {
      this.$emit("on-result-change", val);
    },
    "ruleForm.city"(val) {
      this.ruleForm.region = '';
    }
  }
}
</script>
<style scoped>
p.singleFileModule {
  font-size: 30px;
  color: red;
}
</style>
<style type="less">
</style>
