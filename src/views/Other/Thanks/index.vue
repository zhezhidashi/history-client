<template>
	<div class="Background Container">
		<div class="Heading">网站简介</div>
		<div class="Text">
			<div v-for="(item, index) in Paragraphs" :key="index">
				<div class="Paragraph">&emsp;&emsp;{{ item }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "WebIntroduction",
	data() {
		return {
			Paragraphs: [
				"特别感谢荣宏君先生、魏時煜女士、胡壮麟先生、胡蔚老师等馈赠原始手稿、档案文献！",
				"深荷厚意、以资谢旌！",
			],
		};
	},
};
</script>

<style scoped>
.Container {
	position: relative;
	display: block;
}
.Text {
	position: relative;
	width: 80vw;
	top: 15vw;
	left: 0;
	right: 0;
	margin: auto;
	display: flex;
	flex-direction: column;
}
.Paragraph {
	position: relative;
	font-size: 1.5vw;
	line-height: 200%;
}
</style>