<template>
	<div class="">
	    <div class="pageTitleAndSearch">
	    	用户列表
	    	<el-input style="float: right; width:298px; height:34px; margin-top: 12px; margin-right: 22px;"
	            placeholder="请输入手机号、用户名"
	            icon="search"
	            v-model="searchBuffer"
	            :on-icon-click="searchUserList">
	        </el-input>
	    </div>
		<el-collapse class="settingCollase" accordion>
		  <el-collapse-item>
		    <template slot="title">
		    <div class="deleteItem"  v-on:click.stop="deleteUser(1, userList)">
		    	<i class="fa fa-trash"></i>
		    </div>
		      <el-row style="width: 80%;">
		      	<el-col :span="9">
		      		<p class="bigText">欧阳锋 <span class="gonghao"><img class="gonghaoImg" src="~@/assets/reportIcon/approve_4.svg"  />2833848234843</span></p>
		      		<div class="phoneAndIdcard">
	      				<img src="~@/assets/reportIcon/approve_1.png"/>
	      				<span>13699826736</span>
	      				<img class="nextImages" src="~@/assets/reportIcon/approve_2.png"/>
	      				<span>310230198878654326</span>
		      		</div>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>上海</p>
		      		<span>区域</span>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>市场管理</p>
		      		<span>部门</span>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>市场营销专员</p>
		      		<span>职位</span>
		      	</el-col>
		      </el-row>
		    </template>
		    <p class="markContent">
	    		<span>创建时间</span>
	    		<span style="margin-right: 0;" class="weightInfo">2016.12.20</span>
		    	<span style="margin-left: 40px">更新时间</span>
		    	<span class="weightInfo">2016.12.20 21:09</span>
		    </p>
		    <div class="inculdeItem">
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>所属群组</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(247,186,41,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
				    	 <el-dropdown trigger="click" @command="handleAddGroupToUser">
				    		<el-button type="primary" icon="plus">添加群组</el-button>
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
			    		<el-button class="blueStyle" type="primary" icon="plus" @click="openHAuthDlg()">添加权限</el-button>
			    	</div>
		    	</div>
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>所属公寓</span>
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
				    		<el-button type="primary" class="greenStyle" icon="plus">添加公寓</el-button>
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
		    </div>
		  </el-collapse-item>

		  <el-collapse-item>
		    <template slot="title">
		    <div class="deleteItem"  v-on:click.stop="deleteUser(1, userList)">
		    	<i class="fa fa-trash"></i>
		    </div>
		      <el-row style="width: 80%;">
		      	<el-col :span="9">
		      		<p class="bigText">欧阳锋 <span class="gonghao"><img class="gonghaoImg" src="~@/assets/reportIcon/approve_4.svg"  />2833848234843</span></p>
		      		<div class="phoneAndIdcard">
	      				<img src="~@/assets/reportIcon/approve_1.png"/>
	      				<span>13699826736</span>
	      				<img class="nextImages" src="~@/assets/reportIcon/approve_2.png"/>
	      				<span>310230198878654326</span>
		      		</div>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>上海</p>
		      		<span>区域</span>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>市场管理</p>
		      		<span>部门</span>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>市场营销专员</p>
		      		<span>职位</span>
		      	</el-col>
		      </el-row>
		    </template>
		    <p class="markContent">
	    		<span>创建时间</span>
	    		<span style="margin-right: 0;" class="weightInfo">2016.12.20</span>
		    	<span style="margin-left: 40px">更新时间</span>
		    	<span class="weightInfo">2016.12.20 21:09</span>
		    </p>
		    <div class="inculdeItem">
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>所属群组</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(247,186,41,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
				    	 <el-dropdown trigger="click" @command="handleAddGroupToUser">
				    		<el-button type="primary" icon="plus">添加群组</el-button>
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
			    		<el-button class="blueStyle" type="primary" icon="plus" @click="openHAuthDlg()">添加权限</el-button>
			    	</div>
		    	</div>
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>所属公寓</span>
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
				    		<el-button type="primary" class="greenStyle" icon="plus">添加公寓</el-button>
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
		    </div>
		  </el-collapse-item>

		  <el-collapse-item>
		    <template slot="title">
		    <div class="deleteItem"  v-on:click.stop="deleteUser(1, userList)">
		    	<i class="fa fa-trash"></i>
		    </div>
		      <el-row style="width: 80%;">
		      	<el-col :span="9">
		      		<p class="bigText">欧阳锋 <span class="gonghao"><img class="gonghaoImg" src="~@/assets/reportIcon/approve_4.svg"  />2833848234843</span></p>
		      		<div class="phoneAndIdcard">
	      				<img src="~@/assets/reportIcon/approve_1.png"/>
	      				<span>13699826736</span>
	      				<img class="nextImages" src="~@/assets/reportIcon/approve_2.png"/>
	      				<span>310230198878654326</span>
		      		</div>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>上海</p>
		      		<span>区域</span>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>市场管理</p>
		      		<span>部门</span>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>市场营销专员</p>
		      		<span>职位</span>
		      	</el-col>
		      </el-row>
		    </template>
		    <p class="markContent">
	    		<span>创建时间</span>
	    		<span style="margin-right: 0;" class="weightInfo">2016.12.20</span>
		    	<span style="margin-left: 40px">更新时间</span>
		    	<span class="weightInfo">2016.12.20 21:09</span>
		    </p>
		    <div class="inculdeItem">
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>所属群组</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(247,186,41,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
				    	 <el-dropdown trigger="click" @command="handleAddGroupToUser">
				    		<el-button type="primary" icon="plus">添加群组</el-button>
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
			    		<el-button class="blueStyle" type="primary" icon="plus" @click="openHAuthDlg()">添加权限</el-button>
			    	</div>
		    	</div>
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>所属公寓</span>
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
				    		<el-button type="primary" class="greenStyle" icon="plus">添加公寓</el-button>
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
		    </div>
		  </el-collapse-item>

		  <el-collapse-item>
		    <template slot="title">
		    <div class="deleteItem"  v-on:click.stop="deleteUser(1, userList)">
		    	<i class="fa fa-trash"></i>
		    </div>
		      <el-row style="width: 80%;">
		      	<el-col :span="9">
		      		<p class="bigText">欧阳锋 <span class="gonghao"><img class="gonghaoImg" src="~@/assets/reportIcon/approve_4.svg"  />2833848234843</span></p>
		      		<div class="phoneAndIdcard">
	      				<img src="~@/assets/reportIcon/approve_1.png"/>
	      				<span>13699826736</span>
	      				<img class="nextImages" src="~@/assets/reportIcon/approve_2.png"/>
	      				<span>310230198878654326</span>
		      		</div>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>上海</p>
		      		<span>区域</span>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>市场管理</p>
		      		<span>部门</span>
		      	</el-col>
		      	<el-col :span="5">
		      		<p>市场营销专员</p>
		      		<span>职位</span>
		      	</el-col>
		      </el-row>
		    </template>
		    <p class="markContent">
	    		<span>创建时间</span>
	    		<span style="margin-right: 0;" class="weightInfo">2016.12.20</span>
		    	<span style="margin-left: 40px">更新时间</span>
		    	<span class="weightInfo">2016.12.20 21:09</span>
		    </p>
		    <div class="inculdeItem">
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>所属群组</span>
			    	</div>
			    	<div class="middleTags">
			    		<el-tag class="groupTags"
						  v-for="tag in tags1" :key="tag.name"
						  :closable="true"
						  :close-transition="false"
	  					  @close="handleGroupTagClose(tag)"
						  color="rgba(247,186,41,0.10)"
						>
							{{tag.name}}
						</el-tag>
			    	</div>
			    	<div class="rightOperate">
				    	 <el-dropdown trigger="click" @command="handleAddGroupToUser">
				    		<el-button type="primary" icon="plus">添加群组</el-button>
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
			    		<el-button class="blueStyle" type="primary" icon="plus" @click="openHAuthDlg()">添加权限</el-button>
			    	</div>
		    	</div>
		    	<div style="width: 100%; overflow: hidden; margin-bottom: 20px;">
		    		<div class="leftLabel">
			    		<span>所属公寓</span>
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
				    		<el-button type="primary" class="greenStyle" icon="plus">添加公寓</el-button>
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
		    </div>
		  </el-collapse-item>
		  
		 </el-collapse>
		<addAuthToUser :showDialog='openAddAuthDlg' @on-result-change="onResultChange"></addAuthToUser>
	</div>
</template>
<script>
import addAuthToUser from '../subComponents/addAuthToUser'
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
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},{
					name: '超级管理员'
				}, {
					name: '管理员'
				},
			],
			searchBuffer: null,
			openAddAuthDlg: false
        };
    },
    methods: {
    	openHAuthDlg: function() {
	        this.openAddAuthDlg = true;
	    },
    	onResultChange(val) {
    		this.openAddAuthDlg = val;
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
	    searchUserList: function() {
	        if (!this.searchBuffer) {
	          this.$notify({
	            title: '警告',
	            message: '请输入要检索的关键字',
	            type: 'warning'
	          });
	        }
	        else {
	          alert(this.searchBuffer);
	        }
	    },
	    
	    handleAddGroupToUser(command) {
	        this.$message('成功加入群组: ' + command);
	    }
    },
    components: {
    	addAuthToUser
    }
  }
</script>
<style scoped>
	p.bigText {
		font-size:20px;
		color:#354052;
	}
	.gonghao{
		background:#f5f8fa;
		border-radius:38px;
		font-size:12px;
		color:#8c9aad;
		padding: 3px 6px;
		margin-left: 15px;
		display: inline-block;
	}
	.gonghaoImg {
		width: 20px; margin-right: 5px;
	}
	.phoneAndIdcard {
		line-height: 20px;
		margin-top: 5px;
		display: inline-block;
	 }
	 .phoneAndIdcard img {
	 	height: 16px;
	 	vertical-align: middle;
	 	margin-right: 10px;
	 }
	 .phoneAndIdcard img.nextImages {
	 	margin-left: 20px;
	 }
	 .phoneAndIdcard span {
	 	font-size:14px;
		color:#07bf96;
		vertical-align: middle;
	 }
</style>