<template>
	<div class="ContentContainer">
		<div class="ChoiceContainer">
			<!-- 精选古籍和查看全部 -->
			<div class="TextBlock">
				<div>精选古籍</div>
				<div class="SeeAll" @click="GoToPage('AntiqueWorks21')">查看全部</div>
			</div>
			<!-- 图片列表 -->
			<div class="ImageBlock">
				<div v-for="(item, index) in Images1" :key="index">
					<div class="ImageItem">
						<!-- 鼠标悬停查看详情 -->
						<div class="ImageHover">
							<div class="RedButton SeeDetails" @click="GoToPage('AntiqueWorks31')">查看古籍</div>
						</div>
						<div
							class="BackgroundImage ImageContainer"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
				</div>
			</div>
		</div>
		<div class="ChoiceContainer">
			<!-- 精选特藏和查看全部 -->
			<div class="TextBlock">
				<div>精选特藏</div>
				<div class="SeeAll" @click="GoToPage('AntiqueWorks22')">查看全部</div>
			</div>
			<!-- 图片列表 -->
			<div class="ImageBlock">
				<div v-for="(item, index) in Images2" :key="index">
					<div class="ImageItem">
						<!-- 鼠标悬停查看详情 -->
						<div class="ImageHover">
							<div class="RedButton SeeDetails" @click="GoToPage('AntiqueWorks32')">查看特藏</div>
						</div>
						<div
							class="BackgroundImage ImageContainer"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Content",
	data() {
		return {
			Images1: [
				{
					Image: "AntiqueImage1.jpg",
				},
				{
					Image: "AntiqueImage2.jpg",
				},
				{
					Image: "AntiqueImage3.jpg",
				},
				{
					Image: "AntiqueImage4.jpg",
				},
			],
			Images2: [
				{
					Image: "特藏01.jpg",
				},
				{
					Image: "特藏02.jpg",
				},
				{
					Image: "特藏03.jpg",
				},
				{
					Image: "特藏04.jpg",
				},
			],
		};
	},
	methods: {
		GoToPage(name) {
			this.$router.push({ name });
		},
	},
};
</script>

<style scoped>
.ContentContainer {
	position: relative;
	width: 80vw;
	height: 50vw;
	/* background-color: lightblue; */
}
.ChoiceContainer {
	position: relative;
	width: 80vw;
	height: 25vw;
}
.TextBlock {
	position: relative;
	width: 80vw;
	height: 4vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.5vw;
	/* background-color: lightpink; */
}
.SeeAll {
	padding-bottom: 0.1vw;
	border-bottom: 0.1vw solid #9b0000;
	color: #9b0000;
	cursor: pointer;
}
.ImageBlock {
	position: relative;
	width: 80vw;
	height: 17vw;
	/* background-color: lightgreen; */
	display: flex;
	justify-content: space-between;
	align-items: center;
}

/* 鼠标悬浮出现“查看详情” */
.ImageHover {
	position: absolute;
	width: 17vw;
	height: 17vw;
	overflow: hidden;
	border-radius: 4px;
	background: rgba(95, 95, 95, 0.37);
	z-index: 15;
	display: flex;
	justify-content: center;
	align-items: center;

	opacity: 0;
	transition-property: opacity;
	transition-duration: 0.5s;
}
/* 冒号两边不能有空格！！！ */
.ImageItem:hover .ImageHover {
	opacity: 1;
}
.SeeDetails {
	width: 8vw;
	height: 3vw;
}
.ImageContainer {
	position: relative;
	width: 17vw;
	height: 17vw;
	border-radius: 4px;
}
</style>