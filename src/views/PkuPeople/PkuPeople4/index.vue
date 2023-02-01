<template>
	<div class="Background PkuPeople4Container">
		<TabChoices
			:Tabs="Tabs"
			:TabTotalPages="TabTotalPages"
			:TabIndex="TabIndex"
			:ContentStatus="ContentStatus"
			@ChangeTabIndex="ChangeTabIndex"
			@ChangeContentStatus="ChangeContentStatus"
		/>
		<div class="ImageContentContainer">
			<Images
				:ImageList="ImageList"
				:WebPath="WebPath"
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
import { getForm, postForm, GetType } from "@/api/data";
export default {
	name: "PkuPeople4",
	components: {
		TabChoices,
		Images,
		Content,
	},
	data() {
		return {
			// 父节点
			Paths: [],
			// 当前档案的 template_id
			ArchiveTemplateID: "",

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
			TabTotalPages: 0,
			// 记录点击某个Tab后的状态
			ContentStatus: 0,
			WebPath: ["档案/手稿"],
			ImageList: [
				// {
				// 	ImageUrl: "PkuPeople4Image1.jpg",
				// 	Index: 0,
				// 	ImagePath: "0",
				// },
			],
			Description: "",

			// 中英文对应
			InfoMap: {},

			ContentInfo: [
				// {
				// 	NameEN: "Subject",
				// 	NameZH: "主题",
				// 	Value: "",
				// },
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
	mounted() {
		this.TabIndex = parseInt(this.$route.query.TabIndex);
		this.ContentStatus = parseInt(this.$route.query.ContentStatus);
		this.Paths.push(this.$route.query.Path1);
		this.Paths.push(this.$route.query.Path2);
		this.Paths.push(this.$route.query.Path3);

		let _this = this;
		// 获取WebPath的后三个，以及页面其他信息
		postForm("/data/node", { path: _this.Paths[0] }, _this, function (res) {
			let List = res.data.content;
			for (let key in List) {
				if (GetType(key) === "title") {
					_this.WebPath.push(List[key]);
				}
			}
			postForm(
				"/data/node",
				{ path: _this.Paths[1] },
				_this,
				function (res) {
					let List = res.data.content;
					for (let key in List) {
						if (GetType(key) === "title") {
							_this.WebPath.push(List[key]);
						}
					}
					//
					postForm(
						"/data/node",
						{ path: _this.Paths[2] },
						_this,
						function (res) {
							let List = res.data.content;
							_this.ArchiveTemplateID = res.data.template_id;

							// 先把模板中文字段名字对应上
							getForm(
								`/template/one?main_id=${_this.ArchiveTemplateID}`,
								_this,
								function (res) {
									for (let key in res.data.structure) {
										if (GetType(key) === "other") {
											_this.InfoMap[key] =
												res.data.structure[
													key
												].show_name;
										}
									}

									for (let key in List) {
										if (GetType(key) === "title") {
											_this.WebPath.push(List[key]);
										} else if (GetType(key) === "intro") {
											_this.Description = List[key];
										} else if (
											GetType(key) === "other" &&
											List[key] != ""
										) {
											_this.ContentInfo.push({
												NameEN: key,
												NameZH: _this.InfoMap[key],
												Value: List[key],
											});
										}
									}

									// 查询图片模板ID
									let ChildrenTemplateID =
										res.data.children_template_limit;

									//最后根据子模板查询 archive 下的数据
									for (let ChildID of ChildrenTemplateID) {
										let DataForm = {
											location_id: 99999999,
											page_index: 1,
											page_size: 99999,
											sort_by: "-show_time",
											path: _this.Paths[2],
											deep_range: 0,
											filter_rule: {},
											order_rule: {
												method: "show_time",
												order: "+",
											},
											template_id: ChildID,
										};
										postForm(
											`/data/list`,
											DataForm,
											_this,
											function (res) {
												let List = res.data.list;
												for (
													let i = 0;
													i < List.length;
													i++
												) {
													let NewMap = {
														ImageUrl:
															List[i].content[
																"img&attr0"
															],
														Index: i,
														ImagePath: List[i].path,
													};
													_this.ImageList.push(
														NewMap
													);
												}
											}
										);
									}
								}
							);
						}
					);
				}
			);
		});
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