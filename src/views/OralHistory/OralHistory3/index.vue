<template>
	<div class="Background OralHistory3Container">
        <div class="TabAndContentContainer">
            <TabChoices
                :Tabs="Tabs"
                :TabIndex="TabIndex"
                :ContentStatus="ContentStatus"
                :People="People"
                :PeopleImage="PeopleImage"
                :PeopleIntro="PeopleIntro"
                @ChangeTabIndex="ChangeTabIndex"
                @ChangeContentStatus="ChangeContentStatus"
            />
            <Content
                :Contents="Contents"
                :People="People"
                :ParentPath="ParentPath"
                :TabPath="TabPath"
                :TabIndex="TabIndex"
                :TabName="Tabs[TabIndex][ContentStatus % 6].Title"
                :ContentStatus="ContentStatus"
                :ContentTotalPages="ContentTotalPages"
            />
        </div>
		
	</div>
</template>

<script>
import TabChoices from "./TabChoices";
import Content from "./Content";
import { getForm, postForm, GetType, MergeItem, MatchName, GetFieldInfo } from "@/api/data";
export default {
	name: "OralHistory3",
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
                //     {
				// 		Title: "信件",
				// 		TemplateID: "",
				// 		Path: "",
				// 	},
                //     {
				// 		Title: "信件",
				// 		TemplateID: "",
				// 		Path: "",
				// 	},
                //     {
				// 		Title: "信件",
				// 		TemplateID: "",
				// 		Path: "",
				// 	},
                //     {
				// 		Title: "信件",
				// 		TemplateID: "",
				// 		Path: "",
				// 	},
                //     {
				// 		Title: "信件",
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
				// 	// {
				// 	// 	Title: "季先生之女给季先生的信件",
				// 	// 	Path: "",
				// 	// 	TemplateID: 0,
                //  //  MediaType: 0,
                //  //  MediaPath: "",
				// 	// },
                    
				// ],
			],
			People: "",
            PeopleImage: "",
            PeopleIntro: "",
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
			_this.ContentStatus = index;
			let NowTab = _this.Tabs[_this.TabIndex][_this.ContentStatus % 6];
            // 清空内容
            _this.Contents = [];

			// 修改 TabPath
			_this.TabPath = NowTab.Path;

            GetFieldInfo(_this, function(FieldInfoMap){
                let DataForm = {
                    location_id: 99999999,
                    page_index: 1,
                    page_size: 99999,
                    sort_by: "-show_time",
                    path: _this.TabPath,
                    deep_range: 1,
                    filter_rule: {},
                    order_rule: {
                        method: "show_time",
                        order: "+",
                    },
                    template_id_list: [],
                };
                postForm('/data/list', DataForm, _this, function (res) {
                    let List = res.data.list;
                    for (let LetterIndex = 0; LetterIndex < List.length; LetterIndex++) {
                        let item = List[LetterIndex];
                        let ItemForm = {
                            Path: item.path,
                            Title: "",
                            TemplateID: item.template_id,
                            MediaType: 0,
                            MediaPath: "",
                        }
                        for (let FieldID in item.content) {
                            
                            if (MatchName(FieldInfoMap[FieldID], "标题")) {
                                ItemForm.Title = item.content[FieldID];
                            }
                            else if (MatchName(FieldInfoMap[FieldID], "音频")){
                                ItemForm.MediaType = 0;
                                ItemForm.MediaPath = item.content[FieldID];
                            }
                            else if (MatchName(FieldInfoMap[FieldID], "视频")){
                                ItemForm.MediaType = 1;
                                ItemForm.MediaPath = item.content[FieldID];
                            }
                            
                        }
                        console.log("***", ItemForm);
                        _this.ContentTotalPages = MergeItem(
                            ItemForm,
                            _this.Contents,
                            _this.ContentTotalPages,
                            16
                        );
                    }
                })
            })
        },

        GetList(){
            let _this = this;
            GetFieldInfo(_this, function(FieldInfoMap){
                let DataForm = {
                    location_id: 99999999,
                    page_index: 1,
                    page_size: 99999,
                    sort_by: "-show_time",
                    path: _this.ParentPath,
                    deep_range: 1,
                    filter_rule: {},
                    order_rule: {
                        method: "show_time",
                        order: "+",
                    },
                    template_id_list: [],
                };

                postForm('/data/list', DataForm, _this, function(res){
                    let List = res.data.list;
                    for (let TabIndex = 0; TabIndex < List.length; TabIndex++) {
                        let item = List[TabIndex];
                        let ItemForm = {
                            Path: item.path,
                            Title: "",
                            TemplateID: res.data.template_id,
                        }
                        for (let FieldID in item.content) {
                            
                            if (MatchName(FieldInfoMap[FieldID], "标题")) {
                                ItemForm.Title = item.content[FieldID];
                            }
                        }
                        _this.TabTotalPages = MergeItem(ItemForm, _this.Tabs, _this.TabTotalPages, 6);
                    }
                    _this.ChangeTabIndex(_this.TabIndex);
                    _this.ChangeContentStatus(_this.ContentStatus);
                    
                })
            })
        },
       

        GetPageInfo(){
            let _this = this;
            GetFieldInfo(_this, function(FieldInfoMap){
                let DataForm = {
                    path: _this.ParentPath,
                }
                postForm('/data/node', DataForm, _this, function(res){
                    for(let FieldID in res.data.content){
                        if(MatchName(FieldInfoMap[FieldID], "标题")){
                            _this.People = res.data.content[FieldID];
                        }
                        else if(MatchName(FieldInfoMap[FieldID], "简介")){
                            _this.PeopleIntro = res.data.content[FieldID];
                        }
                        else if(MatchName(FieldInfoMap[FieldID], "图片")){
                            _this.PeopleImage = res.data.content[FieldID];
                        }
                    }
                })
            })
        },
    
	},
	mounted() {
		this.ParentPath = this.$route.query.Path;
		this.TabIndex = parseInt(this.$route.query.TabIndex);
		this.ContentStatus = parseInt(this.$route.query.ContentStatus);

        this.GetList();
		this.GetPageInfo();
    },
};
</script>

<style scoped>
.OralHistory3Container {
	position: relative;
	width: 100vw;
	height: 80vw;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.TabAndContentContainer{
    position: relative;
    width: 100vw;
    height: 80vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>