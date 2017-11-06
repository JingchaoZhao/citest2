<template>
	<div ref="organizaContent" style="margin-top: 20px;">
		<el-row :gutter="40" class="organizaContent">
			<el-col :span="8">
				<div class="grid-content">
					<div class="grid-header">
						区域列表
						<p v-show="!areaEditing" style="float: right">
							<span @click="areaEditing = true" class="greyFontButton">编辑</span>
						</p>
						<p v-show="areaEditing" style="float: right">
							<span style="margin-right: 10px;" class="redFontButton" @click="deleteDistricts">删除</span>
							<span @click="areaEditing = false" class="greyFontButton">取消</span>
						</p>
					</div>
					<div class="grid-body">
						<ul v-show="!areaEditing">
							<li v-for="item in districtsList" :key="item.districtName">{{item.districtName}}</li>
						</ul>
						<el-checkbox-group v-show="areaEditing" v-model="checkedDistricts">
							<el-checkbox v-for="item in districtsList" :key="item.districtId" :label="item.districtId">{{item.districtName}}</el-checkbox>
						</el-checkbox-group>
						<div class="followDiv" style="width: 100%; text-align: center">
							<el-button @click="openAreaDlg" class="greenTextBtn" type="text" icon="plus" style="display: inline-block">添加区域</el-button>
						</div>

					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content">
					<div class="grid-header">
						部门列表
						<p v-show="!organizationEditing" style="float: right">
							<span @click="organizationEditing = true" class="greyFontButton">编辑</span>
						</p>
						<p v-show="organizationEditing" style="float: right">
							<span style="margin-right: 10px;" class="redFontButton" @click="deleteDepartments">删除</span>
							<span @click="organizationEditing = false" class="greyFontButton">取消</span>
						</p>
					</div>
					<div class="grid-body">
						<ul v-show="!organizationEditing">
							<li v-for="item in departments" :key="item.departmentName">{{item.departmentName}}</li>
						</ul>
						<el-checkbox-group v-show="organizationEditing" v-model="checkedDepartments">
							<el-checkbox v-for="item in departments" :label="item.departmentId" :key="item.departmentId">{{item.departmentName}}</el-checkbox>
						</el-checkbox-group>
						<div class="followDiv" style="width: 100%; text-align: center">
							<el-button @click="openOrganizationDlg" class="greenTextBtn" type="text" icon="plus" style="display: inline-block">添加部门</el-button>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content">
					<div class="grid-header">
						职位列表
						<p v-show="!positionEditing" style="float: right">
							<span @click="positionEditing = true" class="greyFontButton">编辑</span>
						</p>
						<p v-show="positionEditing" style="float: right">
							<span style="margin-right: 10px;" class="redFontButton" @click="deletePositions">删除</span>
							<span @click="positionEditing = false" class="greyFontButton">取消</span>
						</p>
					</div>
					<div class="grid-body">
						<ul v-show="!positionEditing">
							<li v-for="item in positions" :key="item.positionName">{{item.positionName}}</li>
						</ul>
						<el-checkbox-group v-show="positionEditing" v-model="checkedPositions">
							<el-checkbox v-for="item in positions" :key="item.positionId" :label="item.positionId">{{item.positionName}}</el-checkbox>
						</el-checkbox-group>
						<div class="followDiv" style="width: 100%; text-align: center">
							<el-button @click="openPositionDlg" class="greenTextBtn" type="text" icon="plus" style="display: inline-block">添加职位</el-button>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<addPositionDlg v-if="positionAddDlgOpening" :showDialog='positionAddDlgOpening' @on-result-change="onPositionChange" @on-add-success="getPositions"></addPositionDlg>
		<addOrganizationDlg v-if="organizationAddDlgOpening" :showDialog='organizationAddDlgOpening' @on-result-change="onOrganizationChange" @on-add-success="getDepartments"></addOrganizationDlg>
		<addAreaDlg v-if="areaAddDlgOpening" :showDialog='areaAddDlgOpening' @on-result-change="onResultChange" @on-add-success="getDistricts"></addAreaDlg>

	</div>
</template>
<script>
	import addAreaDlg from '../subComponents/addAreaDlg'
	import addOrganizationDlg from '../subComponents/addOrganizationDlg'
	import addPositionDlg from '../subComponents/addPositionDlg'
	import constants from '../../constants/index'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				areaEditing: false,
				organizationEditing: false,
				positionEditing: false,
				areaAddDlgOpening: false,
				organizationAddDlgOpening: false,
				positionAddDlgOpening: false,

				districtsList: [],
				checkedDistricts: [],
				departments: [],
				checkedDepartments: [],
				positions: [],
				checkedPositions: []
			};
		},
		methods: {
			...mapActions([
		        'showLoading',
		        'hideLoading'
		      ]),
			openAreaDlg() {
				this.areaEditing = false;
				this.areaAddDlgOpening = true
			},
			onResultChange(val) {
	    		this.areaAddDlgOpening = val;
	    	},
	    	openOrganizationDlg() {
	    		this.organizationEditing = false;
				this.organizationAddDlgOpening = true
			},
	    	onOrganizationChange(val) {
	    		this.organizationAddDlgOpening = val;
	    	},
	    	openPositionDlg() {
	    		this.positionEditing = false;
				this.positionAddDlgOpening = true
			},
			onPositionChange(val) {
	    		this.positionAddDlgOpening = val;
	    	},
	    	getDistricts() {
	    		var _this = this;
	    		_this.$api.get(constants.KCURLS.QUERYDISTRICTS,
		          function(res) {
		            _this.districtsList = res;
		          });
	    	},
	    	deleteDistricts() {
	    		var _this = this;
	    		if (_this.checkedDistricts.length == 0) {
	    			_this.$message({
			          message: '请至少选择一条记录！',
			          type: 'warning'
			        });
	    		}
	    		else {
	    			var params = {
	    				districtIds: _this.checkedDistricts
	    			}
	    			_this.$confirm('确认删除?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	_this.showLoading();
			        	_this.$api.post(constants.KCURLS.DELETEDISTRICT, params,
				          function(res) {
				          	_this.hideLoading();
				            if (res.succeeded) {
				            	_this.checkedDistricts = [];
				            	_this.$message({
						          message: '删除成功！',
						          type: 'success'
						        });
						        _this.areaEditing = false;
				            	_this.getDistricts();
				            }
				            else {
				            	_this.$message.error(res.message);
				            }
				          },
				          function(err) {
				          	_this.hideLoading();
				          });

			        }).catch(() => {
          
			        });
	    			
	    		}
	    	},
	    	getDepartments() {
	    		var _this = this;
	    		_this.$api.get(constants.KCURLS.QUERYDEPARTMENTS,
		          function(res) {
		            _this.departments = res;
		          });
	    	},
	    	deleteDepartments() {
	    		var _this = this;
	    		if (_this.checkedDepartments.length == 0) {
	    			_this.$message({
			          message: '请至少选择一条记录！',
			          type: 'warning'
			        });
	    		}
	    		else {
	    			var params = {
	    				departmentIds: _this.checkedDepartments
	    			}
	    			_this.$confirm('确认删除?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	_this.showLoading();
			        	_this.$api.post(constants.KCURLS.DELETEDEPARTMENT, params,
				          function(res) {
				          	_this.hideLoading();
				            if (res.succeeded) {
				            	_this.$message({
						          message: '删除成功！',
						          type: 'success'
						        });
						        _this.checkedDepartments = [];
						        _this.organizationEditing = false;
				            	_this.getDepartments();
				            }
				            else {
				            	_this.$message.error(res.message);
				            }
				          },
				          function(err) {
				          	_this.hideLoading();
				          });

			        }).catch(() => {
          
			        });
	    			
	    		}
	    	},
	    	getPositions() {
	    		var _this = this;
	    		_this.$api.get(constants.KCURLS.QUERYPOSITIONS,
		          function(res) {
		            _this.positions = res;
		          });
	    	},
	    	deletePositions() {
	    		var _this = this;
	    		if (_this.checkedPositions.length == 0) {
	    			_this.$message({
			          message: '请至少选择一条记录！',
			          type: 'warning'
			        });
	    		}
	    		else {
	    			var params = {
	    				positioIds : _this.checkedPositions
	    			}
	    			_this.$confirm('确认删除?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	_this.showLoading();
			        	_this.$api.post(constants.KCURLS.DELETEPOSITION, params,
				          function(res) {
				          	_this.hideLoading();
				            if (res.succeeded) {
				            	_this.$message({
						          message: '删除成功！',
						          type: 'success'
						        });
						        _this.checkedPositions = [];
						        _this.positionEditing = false;
				            	_this.getPositions();
				            }
				            else {
				            	_this.$message.error(res.message);
				            }
				          },
				          function(err) {
				          	_this.hideLoading();
				          });

			        }).catch(() => {
          
			        });
	    			
	    		}
	    	}
		},
		mounted: function(){
			const _this = this;
			let contentEle = _this.$refs.organizaContent.querySelector('.organizaContent');
			let ulEls = this.$refs.organizaContent.querySelectorAll('.grid-body ul');
			let checkGroupEls = this.$refs.organizaContent.querySelectorAll('.grid-body .el-checkbox-group');

			window.onresize = () => {
				contentEle.style.height = document.documentElement.clientHeight - 150 + 'px';
				[].forEach.call(ulEls, function(div) {
					div.style.maxHeight = document.documentElement.clientHeight - 210 + 'px';
				});
				[].forEach.call(checkGroupEls, function(div) {
					div.style.maxHeight = document.documentElement.clientHeight - 210 + 'px';
				});
			}
			contentEle.style.height = document.documentElement.clientHeight - 150 + 'px';
			[].forEach.call(ulEls, function(div) {
				div.style.maxHeight = document.documentElement.clientHeight - 210 + 'px';
			});
			[].forEach.call(checkGroupEls, function(div) {
				div.style.maxHeight = document.documentElement.clientHeight - 210 + 'px';
			});

			_this.getDistricts();	
			_this.getDepartments();
			_this.getPositions();		
		},
		created: function(){
		},
		computed: {
		},
		watch: {
		},
		components: {
			addAreaDlg,
			addOrganizationDlg,
			addPositionDlg
		}
	}
</script>
<style scoped>
	.organizaContent {
		width: 100%;
		margin-left: 0 !important;
		margin-right: 0 !important;
	}
	.el-row {
		/*margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}*/
	}
	.el-col {
		height: 100%;

	}
	.grid-content {
		border:1px solid #d3dce6;
		box-shadow:0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);
		border-radius: 4px;
		min-height: 36px;
		height: 100%;
		background: #fff;
		position: relative;
	}
	.grid-content .grid-header {
		line-height: 60px;
		border-bottom: 1px solid #e6eaee;
		font-size:16px;
		color:#3c4144;
		font-weight: bold;
		padding: 0 20px;
	}
	.grid-content .grid-header p {
		font-weight: normal
	}
	.redFontButton, .greyFontButton {
		font-size:14px;
		color:#a4aab1;
		cursor: pointer;
	}
	.greyFontButton:hover {
		color:#51d2b5;
	}
	.greyFontButton:active{
		color:#06ab86;
	}
	.redFontButton {
		color:#ff6260;
	}
	.redFontButton:hover {
		color:#ff7f7d;
	}
	.redFontButton:active{
		color:#fd231f;
	}
	.grid-body {
		font-size:14px;
		color:#3c4144;
	}
	.grid-body ul, .grid-body .el-checkbox-group {
		width: 100%;
		overflow-y: auto;
		border-bottom: 40px solid #fff;
		min-height: 150px;
		background: #fff;
	}
	.grid-body ul li, .grid-body .el-checkbox{
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
	}
	.grid-body .el-checkbox {
		padding-left: 20px;
		margin-left: 0;
	}
	.greenTextBtn {
		color:#07bf96;
		padding: 0;
		height: 40px;
		line-height: 40px;
	}
	.greenTextBtn:hover {
		color:#50d2b5;
	}
	.greenTextBtn:active {
		color:#06ac87;
	}
	.followDiv {
		margin-top: -40px;
	}
</style>
