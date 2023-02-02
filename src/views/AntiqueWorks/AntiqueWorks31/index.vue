<template>
	<div>
		<div class="AntiqueWorks31Container">
			<Images
				:ImageList="ImageList"
				:Title="Title"
			/>
			<Content :ContentInfo="ContentInfo" :Title="Title" />
		</div>
	</div>
</template>

<script>
import Images from "@/views/AntiqueWorks/AntiqueWorks31/Images";
import Content from "@/views/AntiqueWorks/AntiqueWorks31/Content";
import { postForm, getForm, GetType } from "@/api/data";
export default {
	name: "AntiqueWorks31",
	components: {
		Images,
		Content,
	},
	data() {
		return {
			ImageList: [
				// {
				//     ImageUrl: "古籍详情01.jpg",
				//     Index: 0,
				//     Path: "0",
				// },
			],

			// 中英文对应
			InfoMap: {},

			ContentInfo: [
				// {
				// 	NameZH: "主要责任人",
				// 	NameEN: "People",
				//     Value: "（清）冯鲁严撰"
				// },
			],

			Title: "",
		};
	},
	methods: {},
	mounted() {
		let ParentPath = this.$route.query.Path;
		let _this = this;

		// 查询父节点得出父节点模板ID和父节点名称
		postForm("/data/node", { path: ParentPath }, _this, function (res) {
			let ParentTemplateID = res.data.template_id;
			let List = res.data.content;

			// 先把模板中文字段名字对应上
			getForm(
				`/template/one?main_id=${ParentTemplateID}`,

				_this,
				function (res) {
					for (let key in res.data.structure) {
						if (GetType(key) === "other") {
							_this.InfoMap[key] =
								res.data.structure[key].show_name;
						}
					}

					for (let key in List) {
						if (GetType(key) === "title") {
							_this.Title = List[key];
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
					let ChildrenTemplateID = res.data.children_template_limit;

					//最后根据子模板查询 archive 下的数据
					for (let ChildID of ChildrenTemplateID) {
						let DataForm = {
							location_id: 99999999,
							page_index: 1,
							page_size: 99999,
							sort_by: "-show_time",
							path: ParentPath,
							deep_range: 0,
							filter_rule: {},
							order_rule: {
								method: "show_time",
								order: "+",
							},
							template_id: ChildID,
						};
						postForm(`/data/list`, DataForm, _this, function (res) {
							let List = res.data.list;
							for (let i = 0; i < List.length; i++) {
								let NewMap = {
									ImageUrl: List[i].content["img&attr0"],
									Index: i,
									ImagePath: List[i].path,
								};
								_this.ImageList.push(NewMap);
							}
						});
					}
				}
			);
		});
	},
};
</script>

<style scoped>
.AntiqueWorks31Container {
	position: relative;
	width: 100%;
	height: 80vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
</style>