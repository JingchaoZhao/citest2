<template>
	<div>
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false"  class="loanAddDlg" title="添加贷中管理" v-model="isDlgVisable" >
			<!-- <p class="dlgSectionTitle"><i class="bf_icon_roomInfo"></i>房间信息</p> -->
		    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  		<el-form-item label="房间状态选择" prop="loanState">
				    <el-select style="100%" v-model="ruleForm.loanState" placeholder="房间状态">
				        <el-option v-for="item in loanStates" :label="item.label" :key="item.value" :value="item.value"></el-option>
				    </el-select>
				</el-form-item>
		  	
		  		<el-form-item label="操作人员姓名" prop="operatorName">
				    <el-input placeholder="输入操作人员姓名" v-model="ruleForm.operatorName">
				    </el-input>
				</el-form-item>
			  	
			  	<el-form-item label="描述信息" prop="description">
				    <el-input type="textarea" :rows="2" placeholder="输入描述信息" v-model="ruleForm.description">
				    </el-input>
				</el-form-item>
				<el-form-item label="添加图片信息" prop="apartAddress">
				    <el-upload action="http://server-fengniaowu.dev.kolibre.credit/api/File/UploadImages"   list-type="picture-card" :on-preview="handlePictureCardPreview" :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :file-list="imgList"   :on-success="uploadImagesForContract">
					  	<i class="el-icon-plus"></i>
					</el-upload>
			  	</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		  	<div class="primaryBtn"  @click="isDlgVisable = false">取 消</div>
		  	<div class="blockBtn greenBtn" @click="submitForm('ruleForm')">确 定</div>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	import constants from '../../constants/index'
	export default {
		props: ['showDialog', 'fengniaowuLoanId'],
		data: function() {
			return {
        		imgList: [],
				isDlgVisable: this.showDialog,
				loanStates: [{
			        value: 'Normal',
			        label: '正常'
			      }, {
			        value: 'Follow',
			        label: '关注'
			      }, {
			        value: 'AbNormal',
			        label: '异常'
			      }, {
			        value: 'Other',
			        label: '其他'
			      }],
			    contractPictures: [],
				ruleForm: {
				  contractId: this.fengniaowuLoanId,
		          loanState: 'Normal',
		          operatorName: '',
		          description: '',
		          pictures: []
		        },
		        rules: {
		        	operatorName: [{
			          required: true,
			          message: '请输入操作人员姓名',
			          trigger: 'change'
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
	      uploadImagesForContract: function(response, file, fileList) {
	      	this.contractPictures = fileList;
	      },
	      handleRemove(file, fileList) {
       		this.contractPictures = fileList;
	      },
	      handlePictureCardPreview(file) {
	      	this.visibledialog({
	        	url: file.url
	        });
	      },
	      submitForm(formName) {
	          var _this = this;
	          var tempListUris = [];
	          for (var i = 0; i < _this.contractPictures.length; i++) {
	          	tempListUris.push(_this.contractPictures[i].response[0].url);
	          }
		      this.$refs[formName].validate((valid) => {
		        if (!valid) {
		          return false;
		        } else {
		          _this.showLoading();
		          _this.ruleForm.pictures = tempListUris;
		          _this.$api.post(constants.KCURLS.CREATEPOSTLOANMANAGEMENT, _this.ruleForm,
		            function(res) {
		              _this.hideLoading();
		              _this.$message({
				          message: '添加贷中管理成功！',
				          type: 'success'
				        });
		              _this.isDlgVisable = false;
		              _this.$emit("on-add-success",true);
		            },
		            function(err) {
		              console.log(err);
		              _this.hideLoading();
		            });
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
			},
			fengniaowuLoanId(val) {
				
				this.ruleForm.capitalLoanId = val;
			}
		}
	}
</script>
<style scoped>
	p.houseInfo {
		font-size:16px;
		color:#3c4144;
		padding-left: 20px;
		margin-bottom: 25px;
		font-weight: bold;
	}
</style>
<style>
	.loanAddDlg .el-dialog__body {
		height: 613px;
	}
</style>