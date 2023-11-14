<template>
    <div class="Background OralHistory4Container">
        <TabChoices :Tabs="Tabs" :TabTotalPages="TabTotalPages" :TabIndex="TabIndex" :ContentStatus="ContentStatus"
            @ChangeTabIndex="ChangeTabIndex" @ChangeContentStatus="ChangeContentStatus" />
        <div class="ImageContentContainer">
            <Images :Media="Media" :WebPath="WebPath" :Description="Description" :Paths="Paths" :TabIndex="TabIndex"
            :ContentStatus="ContentStatus" :ContentInfo="ContentInfo" />
        </div>
    </div>
</template>

<script>
import TabChoices from "./TabChoices";
import Images from "./Images";
import { getForm, postForm, GetType, MergeItem, MatchName, GetFieldInfo, getMediaUrl } from "@/api/data";
export default {
    name: "OralHistory4",
    components: {
        TabChoices,
        Images,
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
            // Type为 0 是音频，Type 为 1 是视频
            Media: {
                Url: "",
                Type: 0,
                // Url: "https://room_dev_api_doc.pacificsilkroad.cn/file/download/media_file/m91oK2J31N.mp3/eyJhbGciOiJIUzUxMiIsImlhdCI6MTY4NDIwNjY4MSwiZXhwIjoxNjg0MjkzMDgxfQ.eyJ1c2VybmFtZSI6Im5hZG1pbiIsImNyZWF0ZV90aW1lIjoiMjAyMy0wNS0xNiAxMToxMToyMS40MTU2MTIifQ.Ssrlejy8T_aTrZ5gtSsay0qGmBeKBvQWbhL73-HxhS35f4dvYWcsLvSDPoPZP7IzicVswZPqSh1GVHPMSl_W8w",
                // Type: 0,
                // Url: "李明滨访谈录音.mp3",
                // Type: 0,
            },
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
                name: "OralHistory3",
                query: {
                    Path: this.Paths[0],
                    TabIndex: this.TabIndex,
                    ContentStatus: this.ContentStatus,
                    PeopleName: this.WebPath[1],
                }
            })
        },

        GetTabs() {
            let _this = this;

            GetFieldInfo(_this, function (FieldInfoMap) {
                let DataForm = {
                    location_id: 99999999,
                    page_index: 1,
                    page_size: 99999,
                    sort_by: "-show_time",
                    path: _this.Paths[0],
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

                })
            })

        },

        GetOtherInfo() {
            let _this = this;
            // 获得该信件的 TemplateID
            let LetterTemplateID = _this.$route.query.LetterTemplateID;

            // 获取该信件的信息
            GetFieldInfo(_this, function (FieldInfoMap) {
                let DataForm = {
                    path: _this.Paths[2],
                };
                postForm('/data/node', DataForm, _this, function (res) {
                    let item = res.data
                    for (let FieldID in item.content) {

                        if (MatchName(FieldInfoMap[FieldID], "简介") || MatchName(FieldInfoMap[FieldID], "描述")) {
                            _this.Description = item.content[FieldID];
                        }
                        else if (
                            !MatchName(FieldInfoMap[FieldID], "图片") &&
                            !MatchName(FieldInfoMap[FieldID], "节点名称") &&
                            !MatchName(FieldInfoMap[FieldID], "标题") &&
                            !MatchName(FieldInfoMap[FieldID], "起始时间") &&
                            !MatchName(FieldInfoMap[FieldID], "结束时间") &&
                            !MatchName(FieldInfoMap[FieldID], "视频") &&
                            !MatchName(FieldInfoMap[FieldID], "音频") &&
                            item.content[FieldID] != "" &&
                            item.content[FieldID] != 1000000000) {
                            _this.ContentInfo.push({
                                NameZH: FieldInfoMap[FieldID],
                                Value: item.content[FieldID]
                            })
                        }
                    }

                })
            })

            // 获取图片列表
            GetFieldInfo(_this, function (FieldInfoMap) {
                let DataForm = {
                    location_id: 99999999,
                    page_index: 1,
                    page_size: 99999,
                    sort_by: "-show_time",
                    path: _this.Paths[2],
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
                    for (let PicIndex = 0; PicIndex < List.length; PicIndex++) {
                        let item = List[PicIndex];
                        for (let FieldID in item.content) {
                            if (MatchName(FieldInfoMap[FieldID], "图片")) {
                                _this.ImageList.push({
                                    ImageUrl: item.content[FieldID],
                                    Index: PicIndex,
                                    ImagePath: item.path,
                                })
                            }
                        }
                    }
                })
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
        this.Media.Url = getMediaUrl(this.$route.query.MediaPath);
        this.Media.Type = parseInt(this.$route.query.MediaType);

        console.log("***", this.Media);

        let _this = this;

        // 获取 Tab
        _this.GetTabs();

        // 获取页面其他信息
        _this.GetOtherInfo();

    },
};
</script>

<style scoped>
.OralHistory4Container {
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
    /* justify-content: space-evenly; */
}
</style>