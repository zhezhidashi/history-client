<template>
    <div class="Background PkuPeople4Container">
        <TabChoices :Tabs="Tabs" :TabTotalPages="TabTotalPages" :TabIndex="TabIndex" :ContentStatus="ContentStatus" @ChangeTabIndex="ChangeTabIndex" @ChangeContentStatus="ChangeContentStatus" />
        <div class="ImageContentContainer">
            <Images :ImageList="ImageList" :WebPath="WebPath" :Description="Description" :Paths="Paths" :TabIndex="TabIndex" :ContentStatus="ContentStatus" />
            <Content :ContentInfo="ContentInfo" />
        </div>
    </div>
</template>

<script>
import TabChoices from "./TabChoices";
import Images from "./Images";
import Content from "./Content";
import { getForm, postForm, GetType, MergeItem, MatchName } from "@/api/data";
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
                // [
                // 	{
                // 		Title: "信件信函",
                // 	},
                // ],
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
            this.$router.push({
                name: "PkuPeople3",
                query: {
                    Path: this.Paths[0],
                    TabIndex: this.TabIndex,
                    ContentStatus: this.ContentStatus,
                }
            })
        },

        GetTabs() {
            let _this = this;
            postForm(
                "/data/node", { path: _this.Paths[0] },
                _this,
                function(res) {
                    // 获取父节点的模板ID
                    _this.ParentTemplateID = res.data.template_id;
                    // 查询 Tab 模板ID
                    getForm(
                        `/template/one?main_id=${_this.ParentTemplateID}`,
                        _this,
                        function(res) {
                            let ChildrenTemplateID =
                                res.data.children_template_limit;

                            // 请求Tab的父节点数据，可获取 Tab 的 Path
                            // 注意，这个 Tab 里面不全是 Tab，还有 人物的标题、图片！！
                            for (let TabTemplateID of ChildrenTemplateID) {
                                let PeopleDataForm = {
                                    location_id: 99999999,
                                    page_index: 1,
                                    page_size: 99999,
                                    sort_by: "-show_time",
                                    path: _this.Paths[0],
                                    deep_range: 0,
                                    filter_rule: {},
                                    order_rule: {
                                        method: "show_time",
                                        order: "+",
                                    },
                                    template_id: TabTemplateID,
                                };

                                postForm(`/data/list`, PeopleDataForm, _this, function(res) {
                                    let TabItemList = res.data.list;
                                    for (let TabIndex = 0; TabIndex < TabItemList.length; TabIndex++) {
                                        let TabPath = TabItemList[TabIndex].path;

                                        // 查询每个 Tab 拥有的子模板
                                        getForm(`/template/one?main_id=${TabTemplateID}`, _this, function(res) {
                                            let TabFieldTemplateID = res.data.children_template_limit;
                                            let TabName = res.data.name;

                                            
                                            if (!MatchName(TabName, "标题") && !MatchName(TabName, "图片")) {
                                                // 查询每个 Tab 的子模板下的数据
                                                let ItemForm = {
                                                    Path: TabPath,
                                                    Title: "",
                                                    TemplateID: TabTemplateID,
                                                };

                                                for (let TabFieldIndex = 0; TabFieldIndex < TabFieldTemplateID.length; TabFieldIndex++) {
                                                    // 查询每个字段模板信息，如模板名字
                                                    getForm(`/template/one?main_id=${TabFieldTemplateID[TabFieldIndex]}`, _this, function(res) {
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

                                                        postForm(`/data/list`, TabDataForm, _this, function(res) {
                                                            let item = res.data.list[0];
                                                            if (MatchName(TabFieldName, "标题")) {
                                                                for (let key in item.content) {
                                                                    ItemForm.Title = item.content[key];
                                                                }
                                                            }
                                                        })

                                                        if (TabFieldIndex === TabFieldTemplateID.length - 1) {
                                                            _this.TabTotalPages = MergeItem(ItemForm, _this.Tabs, _this.TabTotalPages, 6);
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

        GetOtherInfo() {
            let _this = this;
            // 获得该信件的 TemplateID
            let LetterTemplateID = _this.$route.query.LetterTemplateID;
            // 存一下 子模板 的 ID, NameZH，以及对应的数据：TemplateID、NameZH、Value

            getForm(`/template/one?main_id=${LetterTemplateID}`, _this, function(res) {
                let ChildTemplateID = res.data.children_template_limit;
                for (let ChildIndex = 0; ChildIndex < ChildTemplateID.length; ChildIndex++) {
                    getForm(`/template/one?main_id=${ChildTemplateID[ChildIndex]}`, _this, function(res) {
                        let ChildName = res.data.name;
                        let ChildID = ChildTemplateID[ChildIndex];
                        if(MatchName(ChildName, "描述") || MatchName(ChildName, "简介")){
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
                            postForm('/data/list', DataForm, _this, function(res){
                                for(let key in res.data.list[0].content){
                                    if(key != "name"){
                                        _this.Description = res.data.list[0].content[key];
                                    }
                                }
                            })
                        }
                        else if (!MatchName(ChildName, "标题") && !MatchName(ChildName, "列表")) {
                            
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
                            postForm('/data/list', DataForm, _this, function(res){
                                for(let key in res.data.list[0].content){
                                    if(key != "name" && res.data.list[0].content[key].toString() != "" && res.data.list[0].content[key].toString() != "1000000000"){
                                        _this.ContentInfo.push({
                                            TemplateID: ChildID,
                                            NameZH: ChildName,
                                            Value: res.data.list[0].content[key],
                                        });
                                    }
                                }
                            })

                        } else if (MatchName(ChildName, "列表")) {
                            // 接下来，我们找到图片列表对应的 Path
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

                            postForm(`/data/list`, DataForm, _this, function(res) {
                                let ImageListPath = res.data.list[0].path;

                                // 找到图片对应的模板ID
                                getForm(`/template/one?main_id=${ChildID}`, _this, function(res) {
                                    let ImageListTemplateID = res.data.children_template_limit[0];

                                    let ImageListForm = {
                                        location_id: 99999999,
                                        page_index: 1,
                                        page_size: 99999,
                                        sort_by: "-show_time",
                                        path: ImageListPath,
                                        deep_range: 0,
                                        filter_rule: {},
                                        order_rule: {
                                            method: "show_time",
                                            order: "+",
                                        },
                                        template_id: ImageListTemplateID,
                                    };

                                    postForm(`/data/list`, ImageListForm, _this, function(res) {
                                        for (let item of res.data.list) {
                                            _this.ImageList.push({
                                                ImageUrl: item.content["img&attr0"],
                                                Index: _this.ImageList.length,
                                                ImagePath: item.path,
                                            });
                                        }
                                    })
                                })
                            })
                        }
                    })
                }
            })
        },
    },
    mounted() {
        this.TabIndex = parseInt(this.$route.query.TabIndex);
        this.ContentStatus = parseInt(this.$route.query.ContentStatus);
        this.Paths.push(this.$route.query.Path1);
        this.Paths.push(this.$route.query.Path2);
        this.Paths.push(this.$route.query.Path3);
        this.WebPath.push(this.$route.query.PeopleName);
        this.WebPath.push(this.$route.query.TabName);
        this.WebPath.push(this.$route.query.LetterName);

        let _this = this;

        // 获取 Tab
        _this.GetTabs();

        // 获取页面其他信息
        _this.GetOtherInfo();

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