<template>
	<div class="Background" style="height: 70vw;">
		<div class="Heading">登录</div>
		<div class="FeedbackContainer">
			<div class="FeedbackInput">
				<el-input
					type="textarea"
					autosize
					placeholder="请输入用户名"
					style="width: 30vw;"
					v-model="Username"
				>
				</el-input>
			</div>

			<div class="FeedbackInput">
				<el-input
					type="textarea"
					autosize
					placeholder="请输入密码"
					style="width: 30vw;"
					v-model="Password"
				>
				</el-input>
			</div>

			<div class="RedButton SubmitButton" @click="Submit">提交</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ContactUs",
	data() {
		return {
			Username: "",
            Password: "",
		};
	},
    methods: {
        Submit() {
            this.$store.commit('setToken', '111');
            this.$router.push({name: 'Home'});
        },
    },
};
</script>

<style scoped>
.FeedbackContainer {
	position: relative;
	top: 15vw;
	width: 40vw;
	height: 20vw;
	left: 0;
	right: 0;
	margin: auto;
	/* background: skyblue; */

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;

	border: 1px solid #9b0000;
	border-radius: 4px;
}

.FeedbackInput {
	position: relative;
	display: flex;
	flex-direction: row;
}

.SubmitButton{
    width: 9vw;
    height: 3vw;
}
</style>