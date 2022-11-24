<template>
	<div class="Background">
		<div class="Heading">联系我们</div>
		<div class="FeedbackContainer">
			<div class="FeedbackInput" style="margin-top: 2vw">
				<el-input
					type="textarea"
					autosize
					placeholder="请输入姓名"
					style="width: 27vw; margin-right: 1vw"
					v-model="NameText"
				>
				</el-input>
				<el-input
					type="textarea"
					autosize
					prefix-icon="el-icon-user"
					placeholder="请输入联系方式"
					v-model="ContactText"
					style="width: 27vw; margin-left: 1vw"
				>
				</el-input>
			</div>

			<el-input
				type="textarea"
				:autosize="{ minRows: 2, maxRows: 4 }"
				placeholder="请输入反馈内容"
				v-model="ContentText"
				style="width: 56vw;"
				class="FeedbackInput"
			>
			</el-input>

			<div class="RedButton SubmitButton">提交</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ContactUs",
	data() {
		return {
			NameText: "",
			ContactText: "",
			ContentText: "",
		};
	},
};
</script>

<style scoped>
.FeedbackContainer {
	position: relative;
	top: 15vw;
	width: 60vw;
	height: auto;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	border: 1px solid #9b0000;
	border-radius: 4px;
}

.FeedbackInput {
	position: relative;
	margin-bottom: 2vw;
	display: flex;
	flex-direction: row;
}

.SubmitButton{
    width: 9vw;
    height: 3vw;
    margin: 1vw 0 2vw 0;
}
</style>