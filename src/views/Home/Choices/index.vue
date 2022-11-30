<template>
	<div>
		<div class="TabBlock">
			<div class="TabContainer">
				<div v-for="(item, index) in Tabs" :key="index">
					<div
						@click="ChangeContent(index)"
						class="Tab HoverTab"
						:style="
							index === ContentStatus
								? 'background: white; border-bottom: 0.2vw solid #9B0000; border-top: 0.2vw solid #ffffff;'
								: ''
						"
					>
						{{ item.title }}
					</div>
				</div>
			</div>
		</div>

		<DefaultContent v-if="ContentStatus === 0" />
		<WebIntroduction v-if="ContentStatus === 1" />
		<SubjectIntroduction v-if="ContentStatus === 2" />
		<FruitShare v-if="ContentStatus === 3" />
		<Thanks v-if="ContentStatus === 4" />
	</div>
</template>

<script>
import DefaultContent from "./DefaultContent";
import WebIntroduction from "./WebIntroduction";
import SubjectIntroduction from "./SubjectIntroduction";
import FruitShare from "./FruitShare";
import Thanks from "./Thanks";

export default {
	name: "Choices",
	components: {
		DefaultContent,
		WebIntroduction,
		SubjectIntroduction,
		FruitShare,
		Thanks,
	},
	data() {
		return {
			// 内容的状态：0 为首页默认，1为成果分享，2为史料展示，3为网站简介，4为特别鸣谢
			ContentStatus: 0,
			Tabs: [
				{
					title: "首页",
				},
				{
					title: "网站简介",
				},
				{
					title: "学科简介",
				},
				{
					title: "成果分享",
				},
				{
					title: "特别鸣谢",
				},
			],
		};
	},
	methods: {
		// 切换主页内容
		ChangeContent(index) {
			this.ContentStatus = index;
		},

		GoToPage(name) {
			this.$router.push({ name });
		},
	},
};
</script>

<style scoped>
.TabBlock {
	position: relative;
	width: 100vw;
	height: 6vw;
	background: #e3e3e3;
	display: flex;
	justify-content: center;
}
.TabContainer {
	position: relative;
	width: 80vw;
	height: 6vw;
	display: flex;
	justify-content: center;
}
.Tab {
	position: relative;
	box-sizing: border-box;
	width: 16vw;
	height: 6vw;
	cursor: pointer;
	font-size: 1.5vw;
	display: flex;
	justify-content: center;
	align-items: center;
	/* border: 1px solid black; */
}
</style>