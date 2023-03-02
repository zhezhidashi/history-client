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
            :TabName="Tabs[TabIndex][ContentStatus].Title"
			:ContentStatus="ContentStatus"
			:ContentTotalPages="ContentTotalPages"
		/>
	</div>
</template>

<script>
import TabChoices from "./TabChoices";
import Content from "./Content";
import { getForm, postForm, GetType, MergeItem, MatchName } from "@/api/data";
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
			ContentTotalPages: 0,

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
            // 清空内容
            this.Contents = [];

			// 修改 TabPath
			this.TabPath = NowTab.Path;
			// 查询当前 tab 的内容
            // 找到一封信件信函的模版ID
            getForm(`/template/one?main_id=${NowTab.TemplateID}`, _this, function(res){
                let ChildTemplateID = res.data.children_template_limit;
                for(let ChildID of ChildTemplateID){
                    // 查找子模板的名字，由名字定位到一封信件信函的模板ID
                    getForm(`/template/one?main_id=${ChildID}`, _this, function(res){
                        let LetterTemplateName = res.data.name;
                        if(!MatchName(LetterTemplateName, "标题")){
                            let LetterTemplateID = ChildID;

                            // 搜索数据，找到一封信件信函下面对应的诸如”季羡林先生之女信件“的数据，找到Path
                            let DataForm = {
                                location_id: 99999999,
                                page_index: 1,
                                page_size: 99999,
                                sort_by: "-show_time",
                                path: NowTab.Path,
                                deep_range: 1,
                                filter_rule: {},
                                order_rule: {
                                    method: "show_time",
                                    order: "+",
                                },
                                template_id: LetterTemplateID,
                            }

                            postForm(`/data/list`, DataForm, _this, function(res){
                                let LetterList = res.data.list;
                                for(let LetterIndex = 0; LetterIndex < LetterList.length; LetterIndex++){
                                    let LetterPath = LetterList[LetterIndex].path;

                                    let ItemForm = {
                                        Path: LetterPath,
                                        Title: "",
                                        TemplateID: LetterTemplateID,
                                    }; 

                                    // 查找一封信件信函的标题对应的模板ID
                                    getForm(`/template/one?main_id=${LetterTemplateID}`, _this, function(res){
                                        let LetterChildrenTemplateID = res.data.children_template_limit;
                                        for(let ChildID of LetterChildrenTemplateID){
                                            getForm(`/template/one?main_id=${ChildID}`, _this, function(res){
                                                if(MatchName(res.data.name, "标题")){
                                                    let LetterTitleTemplateID = ChildID;

                                                    // 查找该标题对应的内容
                                                    let DataForm = {
                                                        location_id: 99999999,
                                                        page_index: 1,
                                                        page_size: 99999,
                                                        sort_by: "-show_time",
                                                        path: LetterPath,
                                                        deep_range: 1,
                                                        filter_rule: {},
                                                        order_rule: {
                                                            method: "show_time",
                                                            order: "+",
                                                        },
                                                        template_id: LetterTitleTemplateID,
                                                    }
                                                    postForm(`/data/list`, DataForm, _this, function(res){
                                                        for(let key in res.data.list[0].content){
                                                            if(key != 'name'){
                                                                ItemForm.Title = res.data.list[0].content[key];
                                                                _this.ContentTotalPages = MergeItem(
                                                                    ItemForm,
                                                                    _this.Contents,
                                                                    _this.ContentTotalPages,
                                                                    16
                                                                );
                                                            }
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
		},
	},
	mounted() {
		this.ParentPath = this.$route.query.Path;
		this.TabIndex = parseInt(this.$route.query.TabIndex);
		this.ContentStatus = parseInt(this.$route.query.ContentStatus);
        this.People = this.$route.query.PeopleName;

		let _this = this;
		// 查询父节点
		postForm(
			"/data/node",
			{ path: _this.ParentPath },
			_this,
			function (res) {
				// 获取父节点的模板ID
				_this.ParentTemplateID = res.data.template_id;
				// 查询 Tab 模板ID
				getForm(
					`/template/one?main_id=${_this.ParentTemplateID}`,
					_this,
					function (res) {
						let ChildrenTemplateID =
							res.data.children_template_limit;

                        // 请求Tab的父节点数据，可获取 Tab 的 Path
                        // 注意，这个 Tab 里面不全是 Tab，还有 人物的标题、图片！！
                        for(let TabTemplateID of ChildrenTemplateID){
                            let PeopleDataForm = {
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
                            template_id: TabTemplateID,
                        };

                        postForm(`/data/list`, PeopleDataForm, _this, function (res) {
                            let TabItemList = res.data.list;
                            for(let TabIndex = 0; TabIndex < TabItemList.length; TabIndex++){
                                let TabPath = TabItemList[TabIndex].path;

                                // 查询每个 Tab 拥有的子模板
                                getForm(`/template/one?main_id=${TabTemplateID}`, _this, function(res){
                                    let TabFieldTemplateID = res.data.children_template_limit;
                                    let TabName = res.data.name;

                                    
                                    
                                    if(!MatchName(TabName, "标题") && !MatchName(TabName, "图片")) {
                                        // 查询每个 Tab 的子模板下的数据
                                        let ItemForm = {
                                            Path: TabPath,
                                            Title: "",
                                            TemplateID: TabTemplateID,
                                        };

                                        for(let TabFieldIndex = 0; TabFieldIndex < TabFieldTemplateID.length; TabFieldIndex++){
                                            // 查询每个字段模板信息，如模板名字
                                            getForm(`/template/one?main_id=${TabFieldTemplateID[TabFieldIndex]}`, _this, function(res){
                                                let TabFieldName = res.data.name;

                                                // 查询当前字段所在数据
                                                let TabDataForm = {
                                                    location_id: 99999999,
                                                    page_index: 1,
                                                    page_size: 99999,
                                                    sort_by: "-show_time",
                                                    path: TabPath,
                                                    deep_range: 0,
                                                    filter_rule: {},
                                                    order_rule: {
                                                        method: "show_time",
                                                        order: "+",
                                                    },
                                                    template_id: TabFieldTemplateID[TabFieldIndex],
                                                };
                                                
                                                postForm(`/data/list`, TabDataForm, _this, function (res) {
                                                    let item = res.data.list[0];
                                                    if (MatchName(TabFieldName, "标题")) {
                                                        for (let key in item.content) {
                                                            ItemForm.Title = item.content[key];
                                                        }
                                                    }
                                                })

                                                if(TabFieldIndex === TabFieldTemplateID.length - 1){
                                                    _this.TabTotalPages = MergeItem(ItemForm, _this.Tabs, _this.TabTotalPages, 6);
                                                }
                                                if(TabIndex === TabItemList.length - 1 && TabFieldIndex === TabFieldTemplateID.length - 1){
                                                    //默认页面展示第一个Tab
                                                    _this.ChangeTabIndex(_this.TabIndex);
                                                    _this.ChangeContentStatus(
                                                        _this.ContentStatus
                                                    );
                                                }
                                            })
                                        }
                                    }
                                    
                                }) 
                            }
                        });
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