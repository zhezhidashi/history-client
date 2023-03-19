<template>
	<div class="Container">
        <!-- 资源类型 -->
        <div class="SearchBlock">
			<div class="SearchType">资源类型</div>
			<div v-for="(item, index) in ResourceType" :key="index" class="el-checkbox-group" >
				<el-checkbox class="SelectItem" v-model="ResourceFieldList" :label="item.Title"></el-checkbox>
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
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">语种</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputLanguage"
					v-model="Arguments.Language"
					placeholder=""
				/>
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
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">来源</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputSource"
					v-model="Arguments.Source"
					placeholder=""
				/>
			</div>
		</div>

		<div class="RedButton FilterButton" @click="FilterButton">筛选</div>
	</div>
</template>

<script>
export default {
	name: "Condition",
	props: {
		Arguments: {
			type: Object,
		},
        ResourceFieldList: {
            type: Array,
        },
	},
	data() {
		return {
			ResourceType: [
				{
					Title: "信件信函",
				},
				{
					Title: "书稿",
				},
				{
					Title: "手稿",
				},
				{
					Title: "日记",
				},
				{
					Title: "笔记",
				},
				{
					Title: "公文",
				},
				{
					Title: "会议资料",
				},
				{
					Title: "出版合同",
				},
				{
					Title: "其他",
				},
			],
		};
	},
    methods: {
        FilterButton(ResourceFieldList){
            this.$emit(FilterButton, ResourceFieldList)
        }
    }
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
.InputTitle, .InputTheme, .InputLanguage, .InputLocation, .InputPeople, .InputEvent, .InputSource {
    width: 12vw;
}
.FilterButton {
	position: relative;
	width: 9vw;
	height: 3vw;
}
</style>