<template>
	<div class="absMovingDiv">
	    <div class="circle circle1"></div>
	    <div class="circle circle2"></div>
	    <div class="circle circle3"></div>
	    <div class="circle circle4"></div>
	    <div class="circle circle5"></div>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
			}
		},
		methods: {
	      
	    }
	}
</script>
<style scoped>
  .absMovingDiv {
    position: absolute;
    top: 200px;
    height: 220px;
    width: 100%;
  }
  .circle {
    background:rgba(255, 255, 255, 0.2);
    border-radius:100%;
    position: absolute;
   } 
  .circle1 {
    top: 0;
    left: -90px;
    width: 180px;
    height: 180px;
    animation:cicle1Move 8s infinite;
    animation-direction:alternate;
    animation-timing-function: ease-in-out;
  }
  .circle2 {
    width:220px;
    height:220px;
    top: 67px;
    left: -110px;
    animation:cicle2Move 8s infinite;
    animation-direction:alternate;
    animation-timing-function: ease-in-out;
    animation-delay: 1s;
  }
  .circle3 {
    width:170px;
    height:170px;
    top: 140px; left: 160px;
    animation:cicle3Move 10s infinite;
    animation-direction:alternate;
    animation-timing-function: linear;
    animation-delay: 0.42s;
  }
  .circle4 {
    width:264px;
    height:264px;
    top: 36px; left: 20px;
    animation:cicle4Move 20s infinite;
    animation-direction:alternate;
    animation-timing-function: ease-in-out;
    animation-delay: 2.42s;
  }
  .circle5 {
    width:220px;
    height:220px;
    top: 10px; right: -120px;
    animation:cicle5Move 8s infinite;
    animation-direction:alternate;
    animation-timing-function: ease-in-out;
    animation-delay: 2.42s;
  }
  @keyframes cicle1Move
  {
    from {left:-90px;}
    to {left:-60px;}
  }
  @keyframes cicle2Move
  {
    from {left:-110px; top: 67px;}
    to {left:20px; top: 30px;}
  }
  @keyframes cicle3Move
  {
    0% {top: 140px; left: 160px;}
    50% {left:40px; top: 80px;}
    100% { top: 140px; left: -85px; }
  }
  @keyframes cicle4Move
  {
    0% {top: 36px; left: 20px;}
    50% {left:40; top: 0;}
    100% { top: 36px; left: -60px; }
  }
  @keyframes cicle5Move
  {
    from {right: -120px;}
    to {right: -80px;}
  }
</style>