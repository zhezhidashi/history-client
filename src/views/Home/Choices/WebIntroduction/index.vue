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
				"为弘扬和传承北京大学外国语言文学学科历史，北京大学外国语学院/北京大学东方文学研究中心启动学科史建设工作，搜集、整理北大外语人学术人生历程中的丰富史料，发掘其中蕴藏的宝贵精神财富，研究提炼学科百年发展形成的科学传统、科学思想与方法。",
				"本网站是一个承载多语种、多类型原始史料档案，全面揭示北京大学外国语言文学学科史发展，提供北大外院人查阅检索、全面展示与学术研究的信息化平台。",
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