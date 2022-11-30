<template>
	<div class="Background ThanksContainer">
		<div class="Heading" style="font-size: 2.5vw">特别鸣谢</div>
		<div class="Text">
			<div v-for="(item, index) in Paragraphs" :key="index">
				<div class="Paragraph">&emsp;&emsp;{{ item }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Thanks",
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
.ThanksContainer {
	position: relative;
	height: 40vw;
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