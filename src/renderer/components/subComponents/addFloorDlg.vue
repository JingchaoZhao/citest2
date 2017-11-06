<template>
<el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false" class="floorAddDlg floorAddDlg1" title="添加楼层" v-model="isDlgVisable">
  <p class="apartNameP">{{apartmentinfo.apartmentName}}</p>
  <p class="apartAddressP"><i class="fa fa-map-marker"></i>{{apartmentinfo.address}}</p>
  <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="楼层" required>
      <el-col :span="11">
        <el-form-item prop="bottomFloor">
          <el-input placeholder="请输入最矮层" v-model="ruleForm.bottomFloor">
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
      <el-form-item label="装修类型" prop="decorationType">
        <el-select style="100%" v-model="ruleForm.decorationType" placeholder="装修类型">
          <el-option v-for="item in decorationTypes" :label="item.label" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-form-item label="门市价" prop="retailPrice">
      <el-input placeholder="请输入门市价" v-model="ruleForm.retailPrice">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
  </el-form>

  <div slot="footer" class="dialog-footer">
    <div class="primaryBtn" @click="hideDialog()">取 消</div>
    <div class="blockBtn greenBtn" @click="submitForm('ruleForm')">确 定</div>
  </div>
</el-dialog>
</template>
<script>
import constants from '../../constants/index'
import { mapActions } from 'vuex'
export default {
  props: ['showDialog', 'selectApartment'],
  data: function() {
    return {
      isDlgVisable: this.showDialog,
      apartmentinfo: this.selectApartment,
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
      ruleForm: {
        bottomFloor: '',
        topFloor: '',
        roomCount: '',
        decorationType: 'JingZhuang',
        retailPrice: ''
      },
      rules: {
        bottomFloor: [{
          required: true,
          message: '请输入最矮楼层',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (/^\-?\d+$/.test(value) == false) {
              callback(new Error("最矮楼层应为数字"));
            } else {
              if (value < -10 || value > 100) {
                callback(new Error("最矮楼层应大于地下10层，低于100层"));
              } else {
                callback();
              }
            }
          },
          trigger: 'blur'
        }],
        topFloor: [{
          required: true,
          message: '请输入最高楼层',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (/^\-?\d+$/.test(value) == false) {
              callback(new Error("最高楼层应为数字"));
            } else {
              if (value < -10 || value > 100) {
                callback(new Error("最高楼层应大于地下10层，低于100层"));
              } else {
                callback();
              }
            }
          },
          trigger: 'blur'
        }],
        roomCount: [{
            required: true,
            message: '请输入面积',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (/^\-?\d+$/.test(value) == false) {
                callback(new Error("最高楼层应为数字"));
              } else {
                if (value < -10 || value > 100) {
                  callback(new Error("最高楼层应大于地下10层，低于100层"));
                } else {
                  callback();
                }
              }
            },
            trigger: 'blur'
          }
        ],
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
        'hideLoading'
    ]),
    submitForm(ruleForm) {
      var that = this;
      that.$refs[ruleForm].validate((valid) => {
        if (valid) {
          var params = {
            apartmentId: that.apartmentinfo.apartmentId,
            bottomFloor: that.ruleForm.bottomFloor,
            topFloor: that.ruleForm.topFloor,
            roomCount: that.ruleForm.roomCount,
            decorationType: that.ruleForm.decorationType,
            retailPrice: that.ruleForm.retailPrice * 100
          };
          that.showLoading();
          that.$api.post(constants.KCURLS.CREATEFLOORS, params, function(res) {
            that.hideLoading();
            if (res.succeeded) {
              that.isDlgVisable = false;
              that.$message({
                message: '楼层添加成功',
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
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    hideDialog: function() {
      this.isDlgVisable = false;
    },
  },
  watch: {
    selectApartment(val) {
      this.apartmentinfo = val;
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
p.apartNameP {
  font-size: 30px;
  color: rgba(58, 58, 58, 0.87);
  margin-bottom: 20px;
}

p.apartAddressP {
  font-size: 16px;
  color: #8c96ab;
  margin-bottom: 30px;
}

p.apartAddressP i {
  font-size: 20px;
  margin-right: 10px;
}

p.singleFileModule {
  font-size: 30px;
  color: red;
}
</style>
<style type="less">
.floorAddDlg .el-dialog--small {
  width: 560px;
  height: 450px;
  margin-top: -225px;
}
.floorAddDlg1 .el-dialog--small {
  height: 520px;
  margin-top: -260px;
}
</style>
