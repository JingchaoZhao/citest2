<template>
	<el-row class="panel">
		<el-popover
		  ref="quickSelectArea"
		  placement="bottom"
		  width="175"
		  trigger="click" class="quickPop"> 
		  <div class="userPhotoDiv">
		  	<i class="bf_icon_userPhoto"></i>
		  </div>
		  <div class="quickDiv">
		  	<p>李小龙</p>
		  	<span>15988776653</span>
		  </div>
		  <div style="clear: both"></div>
		  <el-button class="blockItem marginLeft10 quickBtn" @click="modifyPwd('second')" type="text">修改密码</el-button>
		  <el-button class="blockItem quickBtn" @click="modifyPwd('first')" type="text">个人资料</el-button>
		  <el-button class="blockItem quickBtn" type="text" @click="logout">退出登录</el-button>
		</el-popover>
		<el-col :span="24" class="panel-top">
			<el-col :span="24" class="topContentPanel">
				<div class="logoDiv">
					<img src="~@/assets/logo_menu.png" class="logo" />蜂鸟屋资管
				</div>
				<span class="paddingLeft20">蜂鸟屋</span>
				<el-row class="noDragonArea" style="width: 290px; float: right">
					<el-col :span="6" class="icReminderContent" >
						<el-badge id="ic_reminder" :value="13" :max="99" ref="ic_reminder" class="ic_reminder">
					  		<i class="fa fa-bell" aria-hidden="true"></i>
						</el-badge>
					</el-col>
					<el-col  v-popover:quickSelectArea :span="18" class="icLoginerContent">
						<i class="bf_icon_userPhoto" aria-hidden="true"></i>
						<span>15988776653</span>
					</el-col>
				</el-row>
			</el-col>
		</el-col>
		<el-col :span="24" class="panel-center">
			<aside style="width:200px;">
				<el-menu :default-active="$route.path" class="aside-ul el-menu-vertical-demo" @open="handleopen"
					@close="handleclose" @select="handleselect" theme="dark" unique-opened router>
					<template v-for="(item,index) in $router.options.routes" v-bind:index="index" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="(child, childIndex) in item.children" :key="child.path" :index="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section id='panel-c-c' class="panel-c-c">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" style="box-sizing: border-box;">
						<transition name="fade">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>

	    <div v-if="getdialogVisible" class="showImageDlg">
	    	<div v-if="getdialogImageUrlList.length == 0" id="imgRotateContainer" class="allItemClass">
	    		<img id="showImgPre" :src="getdialogImageUrl" alt />
	    	</div>
	    	<div v-else id="imgRotateContainer" class="allItemClass">
	    		<img id="showImgPre" :src="currentImgUrl" alt />
	    	</div>
	    	<div title="后退" v-show="getdialogImageUrlList && getdialogImageUrlList.length > 1" @click="preImg" class="oprateImageShowIcon prevImage">
	    		<i class="el-icon-arrow-left"></i>
	    	</div>
	    	<div title="前进" v-show="getdialogImageUrlList && getdialogImageUrlList.length > 1" @click="nextImg" class="oprateImageShowIcon nextImage">
	    		<i class="el-icon-arrow-right"></i>
	    	</div>
	    	<div title="旋转" @click="rotateShowingImg(false)" class="oprateImageShowIcon rotateImage">
	    		<i class="fa fa-repeat"></i>
	    	</div>
	    	<i title="关闭" @click.stop="unvisibledialog" class="oprateImageShowIcon closeImage bf_icon_close"></i>
	    </div>
	</el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
		  // currentPathName:'Table',
		  // currentPathNameParent:'导航一',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }, 
       	rotateCount: 0,
       	currentImgIndex: 0,
       	currentImgUrl: null
      }
    },
	watch: {
		'$route' (to, from) {//监听路由改变
			// this.currentPathName=to.name;
			// console.log(to);
			// console.log('from');
			// console.log(from);
			// this.currentPathNameParent=to.matched[0].name;
		}
	},
    methods: {
    	...mapActions([
	      'unvisibledialog'
	    ]),
	    rotateShowingImg(isToZero) {
	    	if (isToZero) {
	    		this.rotateCount = 0;
	    	}
	    	else {
	    		this.rotateCount ++;
	    	}
	    	var height = document.getElementById('imgRotateContainer').clientHeight;
	    	var width = document.getElementById('imgRotateContainer').clientWidth;
	    	if (this.rotateCount % 2 != 0) {
	    		document.getElementById('showImgPre').style.maxHeight = width + 'px';
	    		document.getElementById('showImgPre').style.maxWidth = height + 'px';
	    	}
	    	else {
	    		document.getElementById('showImgPre').style.maxHeight = height + 'px';
	    		document.getElementById('showImgPre').style.maxWidth = width + 'px';
	    	}
	    	document.getElementById('showImgPre').style.transform = 'rotate('+ 90 * this.rotateCount +'deg)'; // .rotate(90 * this.rotateCount);
	    },
	    preImg() {
	    	if (this.currentImgIndex > 0) {
	    		this.currentImgIndex--;
	    	}
	    	else {
	    		this.currentImgIndex = this.getdialogImageUrlList.length - 1;
	    	}
	    	this.currentImgUrl = this.getdialogImageUrlList[this.currentImgIndex].url;
	    	this.rotateShowingImg(true);
	    },
	    nextImg() {
	    	this.getdialogImageUrlList;
	    	if (this.currentImgIndex < this.getdialogImageUrlList.length - 1) {
	    		this.currentImgIndex++;
	    	}
	    	else {
	    		this.currentImgIndex = 0;
	    	}
	    	this.currentImgUrl = this.getdialogImageUrlList[this.currentImgIndex].url;
	    	this.rotateShowingImg(true);
	    },
        onSubmit() {
          	//console.log('submit!');
        },
		handleopen(){
			//console.log('handleopen');
		},
		handleclose(){
			//console.log('handleclose');
		},
	    handleselect:function(a,b){
	    	//console.log('handleselect');
	    },
		//退出登录
		logout:function(){
			var _this=this;
			this.$confirm('确认退出吗?', '提示', {
				type: 'warning'
			}).then(() => {
				_this.$router.replace('/login');
			}).catch(() => {
						
			});
		},
		modifyPwd: function(val) {
			this.$router.push({name: '账户设置', params: { tab: val }});
		}
    },
    created () {
    	/*console.log(1);*/
    	let that =  this;
    	// console.log(that.$refs);
    	// console.log(that.$refs.ic_reminder);
    	// console.log(document.getElementById('ic_reminder'));
    },
    computed: {
	  	// 使用对象展开运算符将 getters 混入 computed 对象中
	  	
	    ...mapGetters([
	      'getdialogVisible',
	      'getdialogImageUrl',
	      'getAccessMenu',
	      'getdialogImageUrlList'
	      // ...
	    ])
	},
	watch: {
        getdialogVisible(val) {
            if (val) {
            	this.rotateCount = 0;
            	for (var i = 0; i < this.getdialogImageUrlList.length; i++) {
            		if (this.getdialogImageUrl == this.getdialogImageUrlList[i].url) {
            			this.currentImgIndex = i;
            			this.currentImgUrl = this.getdialogImageUrlList[i].url;
            			break;
            		}
            	}
            }
        }
    }
  }
</script>

<style>
	.el-menu-item [class^="bf_"], .el-menu-item  [class*=" bf_"], .el-submenu [class^="bf_"],  .el-submenu [class*=" bf_"] {
		vertical-align: text-bottom;
		margin-right: 6px;
		font-size: 18px;
	}
	*, p, div {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	li {
		padding: 0;
	}
	.left-float-item {
		float: left;
	}
	.border-radius-4 {
		box-shadow:-2px 2px 2px 0 rgba(119,151,177,0.16);
		border-radius:4px;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
	.panel.el-row {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
	.panel-top {
		height: 70px;
		line-height: 70px;
		background: #fff;
		color: #c0ccda;
	}
	.panel-center {
		background: #222c3c;
		position: absolute;
		top: 70px;
		bottom: 0px;
		overflow: hidden;
		left: 0;
		width: 100%;
	}
	.panel-c-c {
		background: #f1f2f7;
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		left: 200px;
		overflow-y: scroll;
		padding: 20px;
	}
	.logout {
		background: url(~@/assets/logout_36.png);
		background-size: contain;
		width: 20px;
		height: 20px;
		float: left;
	}
	.logoDiv {
		width: 200px;
		height: 70px;
		float: left;
		background:#1d2531;
		text-align: left;
		padding-left: 20px;
		font-size:16px;
		color:#ffffff;
	}
	.logo {
		/*width: 100%;
		height: 100%;*/
		width: 26px;
		line-height: 70px;
		margin-right: 10px;
	}
	.tip-logout {
		float: right;
		margin-right: 20px;
		padding-top: 5px;
	}
	.tip-logout i {
		cursor: pointer;
	}
	.admin {
		color: #c0ccda;
		text-align: center;
	}
	.aside-ul {
		background:#222c3c;
		font-size:14px;
		color:#a8b7c5;
	}
	.aside-ul .el-menu-item, .aside-ul .el-submenu {
		border-left: 4px solid #222c3c;
	}
	.aside-ul .el-menu-item.is-active {
		background: #1d2531;
		color:#07bf96;
		border-left: 4px solid #07bf96;
	}
	.aside-ul .el-menu-item, .aside-ul .el-submenu__title {
		height: 50px;
		line-height: 50px;
	}
	.aside-ul .el-menu .el-menu-item, .aside-ul .el-menu .el-submenu__title {
		height: 40px;
		line-height: 40px;
	} 
	.quickPop .quickBtn {
		display: block;
	}
	.ic_reminder .el-badge__content{
		background-color: #07bf96;
	}
	.quickBtn.el-button--text {
		font-size:14px;
		color:#a4aab1;
	}
	.quickBtn.el-button--text:hover {
		color:#51d2b5;
	}
	.quickBtn.el-button--text:active {
		color:#06ab86;
	}
</style>
<style scoped>
	.blockItem {
		display: block;
	}
	.marginLeft10 {
		margin-left: 10px;
	}
	.paddingLeft20 {
		padding-left: 20px;
	}
	.userPhotoDiv {
		color: #a4aab1; font-size: 40px; float: left;
	}
	.quickDiv {
		float: left;margin-left: 10px; font-size: 0; margin-top: 5px;
	}
	.quickDiv p {
		font-size:14px;color:#000000;margin-bottom: 0
	}
	.quickDiv span {
		font-size:12px;color:#6d6f72;
	}
	.topContentPanel {
		font-size:18px; color: #7d7f81;
		-ms-overflow-style: scrollbar; -webkit-app-region:drag;
	}
	.icReminderContent {
		height: 40px; margin-top: 16px; line-height: 40px; border-right: 1px solid #e6eaee;
	}
	.ic_reminder {
		line-height: 40px;
	}
	.ic_reminder i {
		color: #a1a7af; font-size: 24px
	}
	.icLoginerContent {
		height: 40px; margin-top: 15px; line-height: 40px; cursor:pointer
	}
	.icLoginerContent i{
		color: #a1a7af; font-size: 34px; vertical-align: middle; margin-left: 28px;
	}
	.icLoginerContent span {
		padding-left: 10px;font-size:14px; color:#6d6f72;
	}
	.showImageDlg {
		position: fixed; z-index: 3000; top: 0;bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.7); text-align: center; padding: 100px;
	}
	.allItemClass {
		display: flex; width: 100%; height: 100%; justify-content: center; align-items: center
	}
	.allItemClass img {
		max-width: 100%; max-height: 100%;
	}
	.oprateImageShowIcon {
		color:#fff; position: absolute; cursor: pointer; font-size: 30px; top: 23px;
	}
	.prevImage {
		right: 220px; width: 30px; height: 30px;
	}
	.nextImage {
		right: 160px; width: 30px; height: 30px;
	}
	.rotateImage {
		right: 100px; width: 30px; height: 30px;
	}
	.closeImage {
		font-size: 40px; top: 20px; right: 40px;
	}
</style>