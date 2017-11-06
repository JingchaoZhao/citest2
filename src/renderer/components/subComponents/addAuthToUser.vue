<template>
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" class="apartmentAddDlg" title="添加权限" v-model="isDlgVisable" >
	    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="公寓管理" prop="checkList">
		    <el-checkbox-group v-model="ruleForm.checkList">
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 A"></el-checkbox>
		    	</el-col>
			    <el-col :span="6">
		    		<el-checkbox label="复选框 B"></el-checkbox>
		    	</el-col>
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 C"></el-checkbox>
		    	</el-col>
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 G"></el-checkbox>
		    	</el-col>
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 H"></el-checkbox>
		    	</el-col>
		    	<el-col :span="24">
		    		<p>托管合同管理</p>
		    	</el-col>
			    <el-col :span="6">
		    		<el-checkbox label="复选框 gC"></el-checkbox>
		    	</el-col>
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 gG"></el-checkbox>
		    	</el-col>
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 gH"></el-checkbox>
		    	</el-col>
		    	<el-col :span="24">
		    		<p>业主账单管理</p>
		    	</el-col>
			    <el-col :span="6">
		    		<el-checkbox label="复选框 jC"></el-checkbox>
		    	</el-col>
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 jG"></el-checkbox>
		    	</el-col>
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 sgjH"></el-checkbox>
		    	</el-col>
		    	<el-col :span="24">
		    		<p>财务管理</p>
		    	</el-col>
			    <el-col :span="6">
		    		<el-checkbox label="复选框 sC"></el-checkbox>
		    	</el-col>
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 fG"></el-checkbox>
		    	</el-col>
		    	<el-col :span="6">
		    		<el-checkbox label="复选框 sgH"></el-checkbox>
		    	</el-col>
			</el-checkbox-group>
		  </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	  	<div class="primaryBtn" @click="isDlgVisable = false">取 消</div>
	  	<div class="blockBtn greenBtn" @click="submitForm('ruleForm')">确 定</div>
	  </div>
	</el-dialog>
</template>
<script>
	export default {
		props: ['showDialog'],
		data: function() {
			return {
				isDlgVisable: this.showDialog,
				ruleForm: {
					checkList: [],
		        },
		        rules: {
		        }
			}
		},
		methods: {
				submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			          	console.log(this.ruleForm);
			            this.$emit('on-add-success', this.ruleForm.apartName);
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
		      },
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
<style scoped>
</style>
<style type="less">
.apartmentAddDlg .el-dialog__body {
	height: 613px;
}
</style>