<template>
	<div class="Container">
        <!-- 资源类型 -->
        <div class="SearchBlock">
			<div class="SearchType">资源类型</div>
			<div v-for="(item, index) in ResourceType" :key="index">
				<el-radio class="SelectItem" v-model="Arguments.Resource" :label="item.Value">{{
					item.Title
				}}</el-radio>
			</div>
		</div>

        <!-- 标题 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">标题</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputTitle"
					v-model="Arguments.Title"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 主题 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">主题</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputTheme"
					v-model="Arguments.Theme"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 时间 -->
		<div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">时间</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputTime"
					v-model="Arguments.TimeFrom"
					placeholder=""
				/>
				<div class="SearchText">至</div>
				<input
					class="AdvancedSearchInput InputTime"
					v-model="Arguments.TimeTo"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 地点 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">地点</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputLocation"
					v-model="Arguments.Location"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 语种 -->
        <div class="SearchBlock">
			<div class="SearchType">语种</div>
			<div v-for="(item, index) in Language" :key="index">
				<el-radio class="SelectItem" v-model="Arguments.Language" :label="item.Value">{{
					item.Title
				}}</el-radio>
			</div>
		</div>

        <!-- 人物 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">人物</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputPeople"
					v-model="Arguments.People"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 事件 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">事件</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputEvent"
					v-model="Arguments.Event"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 来源 -->
        <div class="SearchBlock">
			<div class="SearchType">来源</div>
			<div v-for="(item, index) in Source" :key="index">
				<el-radio class="SelectItem" v-model="Arguments.Source" :label="item.Value">{{
					item.Title
				}}</el-radio>
			</div>
		</div>

		<div class="RedButton FilterButton">筛选</div>
	</div>
</template>

<script>
export default {
	name: "Condition",
	props: {
		Arguments: {
			type: Object,
		},
	},
	data() {
		return {
			ResourceType: [
				{
					Title: "信件信函",
					Value: "1",
				},
				{
					Title: "书稿",
					Value: "2",
				},
				{
					Title: "手稿",
					Value: "3",
				},
				{
					Title: "日记",
					Value: "4",
				},
				{
					Title: "笔记",
					Value: "5",
				},
				{
					Title: "公文",
					Value: "6",
				},
				{
					Title: "会议资料",
					Value: "7",
				},
				{
					Title: "出版合同",
					Value: "8",
				},
				{
					Title: "其他",
					Value: "9",
				},
			],
			Language: [
				{
					Title: "中文",
					Value: "1",
				},
				{
					Title: "英文",
					Value: "2",
				},
			],
			Source: [
				{
					Title: "赠书",
					Value: "1",
				},
				{
					Title: "馆藏",
					Value: "2",
				},
			],
		};
	},
};
</script>

<style scoped>
.Container {
	position: relative;
	width: 12vw;
    height: auto;
	/* background-color: lightblue; */

}
.SearchBlock {
	position: relative;
	width: 12vw;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
    margin-bottom: 2vw;
	/* background-color: lightgreen; */
}
.SelectItem{
    margin-top: 1vw;
}
.SearchType {
	font-size: 1.5vw;
	font-weight: bold;
}
.SearchText {
	font-size: 1.5vw;
}
.InputContainer {
	position: relative;
	width: 12vw;
	height: 4vw;
	/* background-color: lightpink; */

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.InputTime {
	width: 4.2vw;
}
.InputTitle, .InputTheme, .InputLocation, .InputPeople, .InputEvent, .InputSource {
    width: 12vw;
}
.FilterButton {
	position: relative;
	width: 9vw;
	height: 3vw;
}
</style>