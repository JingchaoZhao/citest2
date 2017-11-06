<template>
  <div id="app">
    <transition>
		<router-view></router-view>
	</transition>
	<div v-show="getIsLoading" class="globalLoading">
		<!-- <img src="./assets/loading.gif" /> -->
		<div class="spinner">
		  <div class="spinner-container container1">
		    <div class="circle1"></div>
		    <div class="circle2"></div>
		    <div class="circle3"></div>
		    <div class="circle4"></div>
		  </div>
		  <div class="spinner-container container2">
		    <div class="circle1"></div>
		    <div class="circle2"></div>
		    <div class="circle3"></div>
		    <div class="circle4"></div>
		  </div>
		  <div class="spinner-container container3">
		    <div class="circle1"></div>
		    <div class="circle2"></div>
		    <div class="circle3"></div>
		    <div class="circle4"></div>
		  </div>
		</div>
		<p>加载中...</p>
	</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'backoffice',
    components: {
	},
	created:function(){
		  // this.$router.replace('/login')
		  // getIsLoading
	},
	computed: {
	    ...mapGetters([
	      'getIsLoading'
	    ])
	}
  }
</script>

<style>
	@import "../../node_modules/font-awesome/css/font-awesome.min.css";
	@import "../../node_modules/flex.css/dist/flex.css";
	.bounce-enter-active {
		animation: bounce-in .5s;
	}
	
	.bounce-leave-active {
		animation: bounce-out .2s;
	}
	
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}
	
	@keyframes bounce-out {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.95);
		}
		100% {
			transform: scale(0);
		}
	}
	
	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
	
	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
	
	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
	.globalLoading {
		padding-top: 20px;
		position: fixed;
		z-index: 9999;
		top: 25%;
		left: 50%;
		margin-left: -100px;
		/*margin-top: -100px;*/
		width: 160px;
		height: 160px;
		text-align: center;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 4px;
		box-shadow:0 2px 10px 0 rgba(0,0,0,0.15);
	}
	.globalLoading img {
		width: 100px;
	}
	.globalLoading p {
		margin-top: 10px;
		font-size: 18px;
		color: #5BF7D3;
	}
	.spinner {
	  margin: 10px auto 30px auto;
	  width: 50px;
	  height: 50px;
	  position: relative;
	}

	.container1 > div, .container2 > div, .container3 > div {
	  width: 13px;
	  height: 13px;
	  background-color: #5BF7D3;

	  border-radius: 50%;
	  position: absolute;
	  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
	  animation: bouncedelay 1.2s infinite ease-in-out;
	  -webkit-animation-fill-mode: both;
	  animation-fill-mode: both;
	}

	.spinner .spinner-container {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	}

	.container2 {
	  -webkit-transform: rotateZ(45deg);
	  transform: rotateZ(45deg);
	}

	.container3 {
	  -webkit-transform: rotateZ(90deg);
	  transform: rotateZ(90deg);
	}

	.circle1 { top: 0; left: 0; }
	.circle2 { top: 0; right: 0; }
	.circle3 { right: 0; bottom: 0; }
	.circle4 { left: 0; bottom: 0; }

	.container2 .circle1 {
	  -webkit-animation-delay: -1.1s;
	  animation-delay: -1.1s;
	}

	.container3 .circle1 {
	  -webkit-animation-delay: -1.0s;
	  animation-delay: -1.0s;
	}

	.container1 .circle2 {
	  -webkit-animation-delay: -0.9s;
	  animation-delay: -0.9s;
	}

	.container2 .circle2 {
	  -webkit-animation-delay: -0.8s;
	  animation-delay: -0.8s;
	}

	.container3 .circle2 {
	  -webkit-animation-delay: -0.7s;
	  animation-delay: -0.7s;
	}

	.container1 .circle3 {
	  -webkit-animation-delay: -0.6s;
	  animation-delay: -0.6s;
	}

	.container2 .circle3 {
	  -webkit-animation-delay: -0.5s;
	  animation-delay: -0.5s;
	}

	.container3 .circle3 {
	  -webkit-animation-delay: -0.4s;
	  animation-delay: -0.4s;
	}

	.container1 .circle4 {
	  -webkit-animation-delay: -0.3s;
	  animation-delay: -0.3s;
	}

	.container2 .circle4 {
	  -webkit-animation-delay: -0.2s;
	  animation-delay: -0.2s;
	}

	.container3 .circle4 {
	  -webkit-animation-delay: -0.1s;
	  animation-delay: -0.1s;
	}

	@-webkit-keyframes bouncedelay {
	  0%, 80%, 100% { -webkit-transform: scale(0.0) }
	  40% { -webkit-transform: scale(1.0) }
	}

	@keyframes bouncedelay {
	  0%, 80%, 100% { 
	    transform: scale(0.0);
	    -webkit-transform: scale(0.0);
	  } 40% { 
	    transform: scale(1.0);
	    -webkit-transform: scale(1.0);
	  }
	}
</style>
