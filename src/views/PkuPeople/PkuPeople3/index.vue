<template>
	<div class="Background PkuPeople3Container">
		<TabChoices
			:Tabs="Tabs"
			:TabIndex="TabIndex"
			:ContentStatus="ContentStatus"
			@ChangeTabIndex="ChangeTabIndex"
			@ChangeContentStatus="ChangeContentStatus"
		/>
		<Content
			:Contents="Contents"
			:People="People"
            :ParentPath="ParentPath"
            :TabPath="TabPath"
            :TabIndex="TabIndex"
            :ContentStatus="ContentStatus"
			:ContentTotalPages="ContentTotalPages"
		/>
	</div>
</template>

<script>
import TabChoices from "./TabChoices";
import Content from "./Content";
import { getForm, postForm, GetType } from "@/api/data";
export default {
	name: "PkuPeople3",
	components: {
		TabChoices,
		Content,
	},
	data() {
		return {
			// 父节点
			ParentPath: "",
			ParentTemplateID: "",

			Tabs: [
				// [
				// 	{
				// 		Title: "信件信函",
				// 		TemplateID: "",
				// 		Path: "",
				// 	},
				// ],
			],
			// 页码
			TabIndex: 0,
			// 记录点击某个Tab后的状态
			ContentStatus: 0,

			// Tabs 的页码
			TabTotalPages: 0,

			// Contents[x][y].ItemID 是在数据库中的主键
			Contents: [
				// [
				// 	{
				// 		Title: "季先生之女给季先生的信件",
				// 		Path: "",
				// 		TemplateID: 0,
				// 	},
				// ],
			],
			People: "",
			ContentTotalPages: 2,

            // 选中 Tab 的 Path
            TabPath: "",
		};
	},
	methods: {
		ChangeTabIndex(index) {
			this.TabIndex = index;
		},
		ChangeContentStatus(index) {
			let _this = this;
			this.ContentStatus = index;
			let NowTab = this.Tabs[this.TabIndex][this.ContentStatus % 6];

            // 修改 TabPath
            this.TabPath = NowTab.Path;
            // 查询当前 tab 的内容
            
            postForm(`/data/node`, {path: NowTab.Path}, _this, function(res){
                for(let key in res.data.content){
                    if(GetType(key) === 'title'){
                        _this.People = res.data.content[key];
                    }
                }
            });

			// 查询当前 tab 的子节点模版
			getForm(
				`/template/one?main_id=${NowTab.TemplateID}`,
				_this,
				function (res) {
					let ChildrenTemplateID = res.data.children_template_limit;

					//最后根据子模板查询 archive 下的数据
					for (let ChildID of ChildrenTemplateID) {
						let DataForm = {
							location_id: 99999999,
							page_index: 1,
							page_size: 99999,
							sort_by: "-show_time",
							path: NowTab.Path,
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
							_this.ContentTotalPages = Math.ceil(List.length / 16);
							let j = 0;
							for (let i = 0; i < _this.ContentTotalPages; i++) {
								_this.Contents.push([]);
								for (
									;
									j < List.length && j < (i + 1) * 16;
									j++
								) {
									let ItemForm = {
										Path: List[j].path,
										Title: "",
										TemplateID: List[j].template_id,
									};

									for (let key in List[j].content) {
										if (GetType(key) === "title") {
											ItemForm.Title =
												List[j].content[key];
										}
									}
									_this.Contents[i].push(ItemForm);
								}
							}
						});
					}
				}
			);
		},
	},
	mounted() {
		this.ParentPath = this.$route.query.Path;
        this.TabIndex = parseInt(this.$route.query.TabIndex);
        this.ContentStatus = parseInt(this.$route.query.ContentStatus);


		let _this = this;
		// 查询父节点
		postForm(
			"/data/node",
			{ path: _this.ParentPath },
			_this,
			function (res) {
				// 获取父节点的模板ID
				_this.ParentTemplateID = res.data.template_id;
				// 查询父节点的子节点模板
				getForm(
					`/template/one?main_id=${_this.ParentTemplateID}`,
					_this,
					function (res) {
						let ChildrenTemplateID =
							res.data.children_template_limit;

						//最后根据子模板查询 archive 下的数据
						for (let ChildID of ChildrenTemplateID) {
							let DataForm = {
								location_id: 99999999,
								page_index: 1,
								page_size: 99999,
								sort_by: "-show_time",
								path: _this.ParentPath,
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
									_this.TabTotalPages = Math.ceil(
										List.length / 6
									);
									let j = 0;
									for (
										let i = 0;
										i < _this.TabTotalPages;
										i++
									) {
										_this.Tabs.push([]);
										for (
											;
											j < List.length && j < (i + 1) * 6;
											j++
										) {
											let ItemForm = {
												Path: List[j].path,
												Title: "",
												TemplateID: List[j].template_id,
											};

											for (let key in List[j].content) {
												if (GetType(key) === "other") {
													ItemForm.Title =
														List[j].content[key];
												}
											}
											_this.Tabs[i].push(ItemForm);
										}
									}
									// 默认页面展示第一个Tab
                                    _this.ChangeTabIndex(_this.TabIndex)
									_this.ChangeContentStatus(_this.ContentStatus);
								}
							);
						}
					}
				);
			}
		);
	},
};
</script>

<style scoped>
.PkuPeople3Container {
	position: relative;
	width: 100vw;
	height: 80vw;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>