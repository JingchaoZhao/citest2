<template>
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" class="apartmentAddDlg" title="添加群组" v-model="isDlgVisable" >
	    <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="群组名称" prop="groupName">
		    <el-input placeholder="请输入群组名称" v-model="ruleForm.groupName"></el-input>
		  </el-form-item>
		  <el-form-item label="添加成员">
		  	<el-select
			    v-model="ruleForm.userList"
			    multiple
			    filterable
			    remote
			    placeholder="请输入关键词"
			    :remote-method="remoteMethod"
			    :loading="loading">
			    <el-option
			      v-for="item in options4"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			      	<span style="float: left">{{ item.label }}</span>
      				<span style="float: right; margin-right: 30px; font-size: 13px">{{ item.value }}</span>
			    </el-option>
			  </el-select>
		  </el-form-item>
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
		  <el-form-item label="功能描述" prop="groupName">
		    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="输入功能描述，不超过50字" v-model="ruleForm.describle"></el-input>
		  </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	  	<div class="primaryBtn"  @click="isDlgVisable = false">取 消</div>
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
					groupName: null,
					userList: [],
					checkList: [],
					describle: null
		        },
		        rules: {
		        },
		        options4: [],
		        value9: [],
		        list: [],
		        loading: true,
		        states: ["Alabama", "Alaska", "Arizona",
		        "Arkansas", "California", "Colorado",
		        "Connecticut", "Delaware", "Florida",
		        "Georgia", "Hawaii", "Idaho", "Illinois",
		        "Indiana", "Iowa", "Kansas", "Kentucky",
		        "Louisiana",, "Maine", "Maryland",
		        "Massachusetts", "Michigan", "Minnesota",
		        "Mississippi", "Missouri", "Montana",
		        "Nebraska", "Nevada", "New Hampshire",
		        "New Jersey", "New Mexico", "New York",
		        "North Carolina", "North Dakota", "Ohio",
		        "Oklahoma", "Oregon", "Pennsylvania",
		        "Rhode Island", "South Carolina",
		        "South Dakota", "Tennessee", "Texas",
		        "Utah", "Vermont", "Virginia",
		        "Washington", "West Virginia", "Wisconsin",
		        "Wyoming"]
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
		        remoteMethod(query) {
			        if (query !== '') {
			          this.loading = true;
			          setTimeout(() => {
			            this.loading = false;
			            this.options4 = this.list.filter(item => {
			              return item.label.toLowerCase()
			                .indexOf(query.toLowerCase()) > -1;
			            });
			          }, 200);
			        } else {
			          this.options4 = [];
			        }
			    }
	    },
	    mounted() {
	      this.list = this.states.map(item => {
	        return { value: item, label: item };
	      });
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
</style>