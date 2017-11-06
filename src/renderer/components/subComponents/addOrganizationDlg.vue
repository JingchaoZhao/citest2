<template>
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false"  class="shortHeightDlg houseAddDlg" title="添加部门" v-model="isDlgVisable" >
	    <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="100px">
	    	<el-form-item label="部门名称" prop="departmentName">
			  	<el-input v-model="ruleForm.departmentName" placeholder="部门"></el-input>
			</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	  	<div class="primaryBtn"  @click="isDlgVisable = false">取 消</div>
	  	<div class="blockBtn greenBtn" @click="submitForm('ruleForm')">确 定</div>
	  </div>
	</el-dialog>
</template>
<script>
	import constants from '../../constants/index'
	import validation from '../../validation/index'
	import { mapActions } from 'vuex'
	export default {
		props: ['showDialog'],
		data: function() {
			return {
				isDlgVisable: this.showDialog,
				ruleForm: {
					departmentName: null
		        },
		        rules: {
		        	departmentName: validation.requiredBlur
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
	            _this.$api.post(constants.KCURLS.CREATEDEPARTMENT, _this.ruleForm,
		          function(res) {
		          	_this.hideLoading();
		          	if (res.succeeded ) {
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
		          function(err) {
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
				this.$emit("on-result-change",val);
			}
		}
	}
</script>