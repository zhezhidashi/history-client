<template>
	<div class="Navigation">
		<img class="NavigationLogo" src="logo.svg" @click="GoHome" />
		<div class="UnderLine GoHome" @click="GoHome">返回首页</div>
	</div>
</template>

<script>
export default {
	name: "CommonHeader",
	data() {
		return {};
	},
	methods: {
		GoHome() {
			this.$router.push({ name: "Home" });
		},
	},
};
</script>

<style scoped>
/*导航栏蓝色背景*/
.Navigation {
	position: relative;
	width: 100%;
	height: inherit;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.NavigationLogo {
	position: relative;
	margin-left: 3vw;
	width: 38vw;
	min-width: 250px;
	cursor: pointer;
}
.GoHome {
	position: relative;
	margin-right: 3vw;
	cursor: pointer;
	font-size: 1.5vw;
	line-height: 100%;
	color: #ffffff;
}
</style>
