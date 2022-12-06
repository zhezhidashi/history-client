<template>
	<div class="Background PkuPeople4Container">
		<TabChoices
			:Tabs="Tabs"
			:TabsTotalPages="TabsTotalPages"
			:TabIndex="TabIndex"
			:ContentStatus="ContentStatus"
			@ChangeTabIndex="ChangeTabIndex"
			@ChangeContentStatus="ChangeContentStatus"
		/>
		<div class="ImageContentContainer">
			<Images
				:ImageList="ImageList"
				:WebPath="WebPath"
				:TotalImage="TotalImage"
				:Description="Description"
			/>
			<Content :ContentInfo="ContentInfo" />
		</div>
	</div>
</template>

<script>
import TabChoices from "./TabChoices";
import Images from "./Images";
import Content from "./Content";
export default {
	name: "PkuPeople4",
	components: {
		TabChoices,
		Images,
		Content,
	},
	data() {
		return {
			Tabs: [
				[
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
				],
				[
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
			],
			// 页码
			TabIndex: 0,
			// 记录点击某个Tab后的状态
			ContentStatus: 0,
			WebPath: [
				"北大外语人",
				"季羡林先生原始文献",
				"信件信函",
				"季先生之女给季先生的信件",
			],
			ImageList: [
				{
					ImageUrl: "PkuPeople4Image1.jpg",
					Index: 0,
					ImageID: "0",
				},
				{
					ImageUrl: "PkuPeople4Image2.jpg",
					Index: 1,
					ImageID: "1",
				},
				{
					ImageUrl: "PkuPeople4Image3.jpg",
					Index: 2,
					ImageID: "2",
				},
				{
					ImageUrl: "PkuPeople4Image4.jpg",
					Index: 3,
					ImageID: "3",
				},
				{
					ImageUrl: "PkuPeople4Image1.jpg",
					Index: 4,
					ImageID: "4",
				},
				{
					ImageUrl: "PkuPeople4Image2.jpg",
					Index: 5,
					ImageID: "5",
				},
				{
					ImageUrl: "PkuPeople4Image3.jpg",
					Index: 6,
					ImageID: "6",
				},
				{
					ImageUrl: "PkuPeople4Image4.jpg",
					Index: 7,
					ImageID: "7",
				},
			],
			TotalImage: 8,
			Description:
				"某月某月季先生之女给季先生的信，主要内容为想在周六上午来看您。",

			ContentInfo: [
				{
					NameEN: "Subject",
					NameZH: "主题",
					Value: "",
				},
				{
					NameEN: "ResourceType",
					NameZH: "资源类型",
					Value: "",
				},
				{
					NameEN: "Time",
					NameZH: "时间",
					Value: "",
				},
				{
					NameEN: "Location",
					NameZH: "地点",
					Value: "",
				},
				{
					NameEN: "Language",
					NameZH: "语种",
					Value: "",
				},
				{
					NameEN: "People",
					NameZH: "人物",
					Value: "",
				},
				{
					NameEN: "Event",
					NameZH: "事件",
					Value: "",
				},
				{
					NameEN: "Source",
					NameZH: "来源",
					Value: "",
				},
			],
		};
	},
	methods: {
		ChangeTabIndex(index) {
			this.TabIndex = index;
		},
		ChangeContentStatus(index) {
			this.ContentStatus = index;
		},
	},
};
</script>

<style scoped>
.PkuPeople4Container {
	position: relative;
	width: 100vw;
	height: 85vw;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.ImageContentContainer {
    position: relative;
    top: 2vw;
	width: 100%;
	height: 70vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
</style>