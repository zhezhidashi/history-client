<template>
	<div class="DefaultContent">
		<div class="ChoicesContainer">
			<div v-for="(item, index) in Choices" :key="index">
				<div @click="GoToPage(item.name)" class="Card Choice">
					<div
						class="BackgroundImage ImageContainer"
						:style="`background-image:url(${item.image})`"
					></div>
					<div class="ChoiceTitle">{{ item.title }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DefaultContent",
	data() {
		return {
			Choices: [
				{
					title: "档案/手稿",
					name: "PkuPeople1",
					path: "/PkuPeople1",
					image: "HomeImage1.jpg",
				},
				{
					title: "印象/事纪",
					name: "Events11",
					path: "/Events11",
					image: "HomeImage2.jpg",
				},
				{
					title: "口述/访谈",
					name: "OralHistory1",
					path: "/OralHistory1",
					image: "HomeImage3.jpg",
				},
				{
					title: "古籍/特藏",
					name: "AntiqueWorks11",
					path: "/AntiqueWorks11",
					image: "HomeImage4.jpg",
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
.DefaultContent {
	position: relative;
	width: 100vw;
	height: 70vw;
	display: flex;
	justify-content: center;
	align-items: center;
}
.ChoicesContainer {
	position: relative;
	width: 80vw;
	height: 60vw;
	display: flex;
	flex-wrap: wrap;
	/* background: lightblue; */
}

/* 这里不用 base.css 中 Card 属性的原因是，背景颜色 hover 上去之后无法变化，只有使用属性默认值，才能用 base.css 里面的 hover 修改属性值 */
.Choice {
	position: relative;
	width: 35vw;
	height: 25vw;
	margin: 2.5vw;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.ImageContainer {
	position: relative;
	width: 35vw;
	height: 20vw;
}
.ChoiceTitle {
	position: relative;
	width: 35vw;
	height: 5vw;
	font-size: 1.5vw;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>