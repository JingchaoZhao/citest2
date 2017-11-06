<template>
    <el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false"
               class="shortHeightDlg houseAddDlg" title="添加区域" v-model="isDlgVisable">
        <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">

            <el-form-item label="选择区域" required>
                <el-col :span="11">
                    <el-form-item label="" prop="provinceName">
                        <el-select prop="provinceName" v-model="ruleForm.provinceName" placeholder="城市">
                            <el-option v-for="item in provinces" :label="item.cityName"
                                       :value="item.cityName" :key="item.cityName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    &nbsp;
                </el-col>
                <el-col :span="11">
                    <el-form-item label="" prop="districtName">
                        <el-input v-model="ruleForm.districtName " placeholder="区域名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <div class="primaryBtn" @click="isDlgVisable=false">取 消</div>
            <div class="blockBtn greenBtn" @click="submitForm('ruleForm')">确 定</div>
        </div>
    </el-dialog>
</template>
<script>
    import constants from '../../constants/index'
    import validation from '../../validation/index'
    import {mapActions} from 'vuex'

    export default {
        props: ['showDialog'],
        data: function () {
            return {
                provinceName: [],
                isDlgVisable: this.showDialog,
                provinces: '',
                ruleForm: {
                    provinceName: null,
                    districtName: null
                },
                rules: {
                    provinceName: validation.requiredChange,
                    districtName: validation.requiredBlur
                }
            }
        },
        methods: {
            ...mapActions([
                'showLoading',
                'hideLoading'
            ]),
            submitForm(formName) {
                var _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.showLoading();
                        _this.$api.post(constants.KCURLS.CREATEDISCTRICT, _this.ruleForm, function (res) {
                                _this.hideLoading();
                                if (res.succeeded) {
                                    _this.$message({
                                        message: '添加成功！',
                                        type: 'success'
                                    });
                                    _this.$emit('on-add-success');
                                    _this.isDlgVisable = false;
                                }
                                else {
                                    _this.$message.error(res.message);
                                }
                            },
                            function (err) {
                                _this.hideLoading();
                            });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        watch: {
            showDialog(val) {
                this.isDlgVisable = val;
            },
            isDlgVisable(val) {
                this.$emit("on-result-change", val);
            }
        },
        created() {
            var _this = this;
            _this.$api.get(constants.KCURLS.QUERYCITIES, function (res) {
                _this.provinces = res;
                if (_this.provinces.length == 0) {
                    _this.$message.error('未查看到城市信息，请联系系统管理员！');
                }
            });
        }
    }
</script>