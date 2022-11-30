<template>
	<div class="Background SubjectIntroductionContainer">
		<div class="Heading" style="font-size: 2.5vw">学科简介</div>
		<div class="Text">
			<div v-for="(item, index) in Paragraphs" :key="index">
				<div class="Paragraph">&emsp;&emsp;{{ item }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SubjectIntroduction",
	data() {
		return {
			Paragraphs: [],
		};
	},
};
</script>

<style scoped>
.SubjectIntroductionContainer {
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