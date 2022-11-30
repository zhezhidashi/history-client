<template>
	<div class="Background WebIntroductionContainer">
		<div class="Heading" style="font-size: 2.5vw">网站简介</div>
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
				"本数据库是北京大学外国语学院陈明教授主持的北京大学社会科学学部项目“北京大学外国语言文学学科史”的主要成果之一。",
				"本数据库是一个承载多语种、多类型原始史料档案，全面揭示北京大学外国语言文学学科史发展，提供北大外院人查阅检索、全面展示与学术研究的信息化平台。",
			],
		};
	},
};
</script>

<style scoped>
.WebIntroductionContainer {
	position: relative;
	height: 80vw;
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