<template>
	<div class="">
	    <div class="pageTitleAndSearch">
	    	群组列表
	        <el-button @click="openGroupCreateDlg()" style="float: right; width:124px; height:36px; margin-top: 12px; margin-right: 22px;" class="greenBtn" type="primary" icon="plus">添加群组</el-button>
	    </div>
		<el-collapse class="settingCollase normalCollase" accordion>
		  <el-collapse-item>
		    <template slot="title">
		    <div class="deleteItem"  v-on:click.stop="deleteUser(1, userList)">
		    	<i class="fa fa-trash"></i>
		    </div>
		      <el-row style="width: 80%;">
			    <el-col :span="24">
			      	<p>丐帮</p>
			      	<p class="describle"><span class="greenCircle"></span>描述描述描述描述描描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
			      	</p>
		      	</el-col>
		      </el-row>
		    </template>
		    <p class="markContent">
	    		<span>创建时间</span>
	    		<span style="margin-right: 0;" class="weightInfo">2016.12.20</span>
		    </p>
		    <div class="inculdeItem">
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>群组成员</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags greenStyle"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(6,191,150,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
				    	 <el-dropdown trigger="click" @command="handleAddGroupToUser">
				    		<el-button class="greenStyle" type="primary" icon="plus">添加成员</el-button>
				    		<el-dropdown-menu slot="dropdown" style="max-height: 300px; overflow-y: scroll; overflow-x: hidden">
						        <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
						        <el-dropdown-item command="狮子头">狮子头</el-dropdown-item>
						        <el-dropdown-item command="螺蛳粉">螺蛳粉</el-dropdown-item>
						        <el-dropdown-item command="双皮奶">双皮奶</el-dropdown-item>
						        <el-dropdown-item command="蚵仔煎">蚵仔煎蚵仔煎蚵仔煎</el-dropdown-item>
						        <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
						        <el-dropdown-item command="狮子头2">狮子头2</el-dropdown-item>
						        <el-dropdown-item command="螺蛳粉2">螺蛳粉2</el-dropdown-item>
						        <el-dropdown-item command="双皮奶2">双皮奶2</el-dropdown-item>
						        <el-dropdown-item command="蚵仔煎2">蚵仔煎2</el-dropdown-item>
						    </el-dropdown-menu>
					    </el-dropdown>
			    	</div>
		    	</div>
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>拥有权限</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags blueStyle"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(32,159,255,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
			    		<el-button class="blueStyle" type="primary" icon="plus" @click="openAuthDlg()">添加权限</el-button>
			    	</div>
		    	</div>
		    </div>
		  </el-collapse-item>
		  <el-collapse-item>
		    <template slot="title">
		    <div class="deleteItem"  v-on:click.stop="deleteUser(1, userList)">
		    	<i class="fa fa-trash"></i>
		    </div>
		      <el-row style="width: 80%;">
			    <el-col :span="24">
			      	<p>丐帮</p>
			      	<p class="describle"><span class="greenCircle"></span>描述描述描述描述描描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
			      	</p>
		      	</el-col>
		      </el-row>
		    </template>
		    <p class="markContent">
	    		<span>创建时间</span>
	    		<span style="margin-right: 0;" class="weightInfo">2016.12.20</span>
		    </p>
		    <div class="inculdeItem">
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>群组成员</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags greenStyle"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(6,191,150,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
				    	 <el-dropdown trigger="click" @command="handleAddGroupToUser">
				    		<el-button class="greenStyle" type="primary" icon="plus">添加成员</el-button>
				    		<el-dropdown-menu slot="dropdown" style="max-height: 300px; overflow-y: scroll; overflow-x: hidden">
						        <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
						        <el-dropdown-item command="狮子头">狮子头</el-dropdown-item>
						        <el-dropdown-item command="螺蛳粉">螺蛳粉</el-dropdown-item>
						        <el-dropdown-item command="双皮奶">双皮奶</el-dropdown-item>
						        <el-dropdown-item command="蚵仔煎">蚵仔煎蚵仔煎蚵仔煎</el-dropdown-item>
						        <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
						        <el-dropdown-item command="狮子头2">狮子头2</el-dropdown-item>
						        <el-dropdown-item command="螺蛳粉2">螺蛳粉2</el-dropdown-item>
						        <el-dropdown-item command="双皮奶2">双皮奶2</el-dropdown-item>
						        <el-dropdown-item command="蚵仔煎2">蚵仔煎2</el-dropdown-item>
						    </el-dropdown-menu>
					    </el-dropdown>
			    	</div>
		    	</div>
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>拥有权限</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags blueStyle"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(32,159,255,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
			    		<el-button class="blueStyle" type="primary" icon="plus" @click="openAuthDlg()">添加权限</el-button>
			    	</div>
		    	</div>
		    </div>
		  </el-collapse-item>
		  <el-collapse-item>
		    <template slot="title">
		    <div class="deleteItem"  v-on:click.stop="deleteUser(1, userList)">
		    	<i class="fa fa-trash"></i>
		    </div>
		      <el-row style="width: 80%;">
			    <el-col :span="24">
			      	<p>丐帮</p>
			      	<p class="describle"><span class="greenCircle"></span>描述描述描述描述描描述描述描述描
			      	</p>
		      	</el-col>
		      </el-row>
		    </template>
		    <p class="markContent">
	    		<span>创建时间</span>
	    		<span style="margin-right: 0;" class="weightInfo">2016.12.20</span>
		    </p>
		    <div class="inculdeItem">
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>群组成员</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags greenStyle"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(6,191,150,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
				    	 <el-dropdown trigger="click" @command="handleAddGroupToUser">
				    		<el-button class="greenStyle" type="primary" icon="plus">添加成员</el-button>
				    		<el-dropdown-menu slot="dropdown" style="max-height: 300px; overflow-y: scroll; overflow-x: hidden">
						        <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
						        <el-dropdown-item command="狮子头">狮子头</el-dropdown-item>
						        <el-dropdown-item command="螺蛳粉">螺蛳粉</el-dropdown-item>
						        <el-dropdown-item command="双皮奶">双皮奶</el-dropdown-item>
						        <el-dropdown-item command="蚵仔煎">蚵仔煎蚵仔煎蚵仔煎</el-dropdown-item>
						        <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
						        <el-dropdown-item command="狮子头2">狮子头2</el-dropdown-item>
						        <el-dropdown-item command="螺蛳粉2">螺蛳粉2</el-dropdown-item>
						        <el-dropdown-item command="双皮奶2">双皮奶2</el-dropdown-item>
						        <el-dropdown-item command="蚵仔煎2">蚵仔煎2</el-dropdown-item>
						    </el-dropdown-menu>
					    </el-dropdown>
			    	</div>
		    	</div>
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>拥有权限</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags blueStyle"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(32,159,255,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
			    		<el-button class="blueStyle" type="primary" icon="plus" @click="openAuthDlg()">添加权限</el-button>
			    	</div>
		    	</div>
		    </div>
		  </el-collapse-item>
		</el-collapse>
		<addAuthToUser :showDialog='openAddAuthDlg' @on-result-change="onResultChange"></addAuthToUser>
		<createGroup :showDialog='openCreateGroupDlg' @on-result-change="onCreateGroupDlgChange"></createGroup>
	</div>
</template>
<script>
import addAuthToUser from '../subComponents/addAuthToUser'
import createGroup from '../subComponents/createGroup'
export default {
    data() {
      return {
        userList : [
				{
					name: '123',
				}, {
					name: '2342'
				}
			],
			tags1: [
				{
					name: '黄药师'
				}, {
					name: '梅超风'
				},{
					name: '黄药师'
				}, {
					name: '黄药师'
				},{
					name: '梅超风'
				}, {
					name: '梅超风'
				},{
					name: '黄药师'
				}, {
					name: '黄药师'
				},{
					name: '陆乘风'
				}, {
					name: '陆乘风'
				},{
					name: '黄药师'
				}, {
					name: '梅超风'
				},{
					name: '黄药师'
				}, {
					name: '管理员'
				},{
					name: '梅超风'
				}, {
					name: '管理员'
				},{
					name: '陆乘风'
				}, {
					name: '管理员'
				},{
					name: '陆乘风'
				}, {
					name: '管理员'
				},{
					name: '陆乘风'
				}, {
					name: '管理员'
				},
			],
			openAddAuthDlg: false,
			openCreateGroupDlg: false
        };
    },
    methods: {
    	openAuthDlg: function() {
	        this.openAddAuthDlg = true;
	    },
    	onResultChange(val) {
    		this.openAddAuthDlg = val;
    	},
    	openGroupCreateDlg: function() {
			this.openCreateGroupDlg = true;
    	},
    	onCreateGroupDlgChange(val) {
    		this.openCreateGroupDlg = val;
    	},
        deleteUser: function(index, rows) {
			console.log(index);
			rows.splice(index, 1);
		},
		handleGroupTagClose(tag) {
			this.$confirm('此操作将删除用户的所属群组, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          this.tags1.splice(this.tags1.indexOf(tag), 1);
	          this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	    },
	    handleAddGroupToUser(command) {
	        this.$message('成功加入群组: ' + command);
	    }
    },
    components: {
    	addAuthToUser,
    	createGroup
    }
  }
</script>
