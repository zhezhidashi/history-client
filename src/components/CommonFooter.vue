<template>
	<div class="FooterStyle">
		<div class="FooterContainer">
			<div @click="GoToPage('Privacy')" class="FooterItem">隐私声明</div>
			<div class="FooterLine"></div>
			<div @click="GoToPage('CopyRight')" class="FooterItem">版权说明</div>
			<div class="FooterLine"></div>
			<div @click="GoToPage('ContactUs')" class="FooterItem">联系我们</div>
		</div>
		<div class="FooterDescription">
			版权所有@北京大学外国语学院&emsp;建设单位：北京大学东方文学研究中心&ensp;/&ensp;北京大学外国语学院
		</div>
        <img class="FooterLogo" src="FooterLogo.svg">
	</div>
</template>

<script>
export default {
	name: "CommonFooter",
	data() {
		return {
			menu: [],
		};
	},
    methods: {
        GoToPage(name){
            this.$router.push({name})
        },
    }
};
</script>

<style>
.FooterStyle {
	width: 100%;
	height: inherit;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	background: #9b0000;
}
.FooterContainer {
	position: relative;
	width: 410px;
	height: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.5vw;
	line-height: 96%;
	color: #ffffff;
}
.FooterItem{
    cursor: pointer;
}
.FooterLine {
	width: 0;
	height: 26px;
	border: 0.7px solid #ffffff;
}
.FooterDescription {
	position: relative;
	height: auto;
	font-size: 1.5vw;
	line-height: 96%;
	color: #ffffff;
    text-align: center;
}
.FooterLogo{
    position: absolute;
    width: 10vw;
    right: 0;
    bottom: 0;
}
</style>

