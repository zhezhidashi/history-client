<template>
    <div class="Background MainSearch">
        <Search :Arguments="Arguments" @ChangeArguments="ChangeArguments" />
        <div class="ConditionResult">
            <Condition :Arguments="Arguments" @ChangeArguments="ChangeArguments" @FilterButton="FilterButton" />
            <Result :Arguments="Arguments" :NowIndex="NowIndex" :TotalPages="TotalPages" :SearchResult="SearchResult"
                @ChangePages="ChangePages" />
        </div>
    </div>
</template>

<script>
import Search from "@/views/Other/MainSearch/Search";
import Condition from "@/views/Other/MainSearch/Condition";
import Result from "@/views/Other/MainSearch/Result";
import { postForm, getForm, MergeItem, MatchName, GetFieldInfo, GetFilterRule, GetTemplateIDList } from "@/api/data";
export default {
    name: "MainSearch",
    components: {
        Search,
        Condition,
        Result,
    },
    data() {
        return {
            Arguments: {
                // 搜索关键词
                Keywords: "",

                // 时间
                TimeFrom: "",
                TimeTo: "",
                // 语种
                Language: "",
            },

            // 访谈列表
            SearchResult: [
                {
                    Title: "李明滨口述史",
                    Time: "2010/11/8",
                    Location: "访谈地点：外文楼217",
                    Image: "李明滨.jpg",
                },
                {
                    Title: "韦旭升口述史",
                    Time: "2010/11/8",
                    Location: "访谈地点：外文楼217",
                    Image: "韦旭升.jpg",
                },
            ],

            NowIndex: 1,
            TotalPages: 1,
            ResourceFieldList: ["信件信函", "书稿", "手稿", "日记", "笔记", "公文", "会议资料", "出版合同", "其他", "口述史音频", "口述史视频", "列表：古籍", "列表：特藏"],
        };
    },
    methods: {
        ChangeArguments(Arguments) {
            this.Arguments = Arguments;
            this.GetList();
        },
        ChangePages(d) {
            this.NowIndex += d;
            this.GetList();
        },
        FilterButton(ResourceFieldList) {
            this.ResourceFieldList = ResourceFieldList;
            this.GetList();
        },

        GetList() {
            let _this = this;
            // 获取字段列表
            _this.SearchResult = [];
            let FilterRule = {}
            let TemplateIDList = [];

            GetFilterRule(_this.Arguments, function (res) {
                FilterRule = res;
                GetTemplateIDList(_this.ResourceFieldList, function (res) {
                    TemplateIDList = res;

                    console.log("***", _this.Arguments, _this.ResourceFieldList, FilterRule, TemplateIDList)

                    GetFieldInfo(function (FieldInfoMap) {

                        let DataForm = {
                            location_id: 99999999,
                            page_index: _this.NowIndex,
                            page_size: 6,
                            sort_by: "-show_time",
                            path: "root",
                            deep_range: 0,
                            filter_rule: FilterRule,
                            order_rule: {
                                method: "show_time",
                                order: "+",
                            },
                            template_id_list: TemplateIDList,
                        };
                        postForm('/data/list', DataForm, _this, function (res) {
                            let List = res.data.list;

                            _this.TotalPages = res.data.total_page;
                            for (let PeopleIndex = 0; PeopleIndex < List.length; PeopleIndex++) {
                                let item = List[PeopleIndex];
                                let ItemForm = {
                                    Path: item.path,
                                    TemplateID: item.template_id,
                                    Title: "",
                                    Image: "",
                                    Description: "",
                                }
                                for (let FieldID in item.content) {
                                    if (MatchName(FieldInfoMap[FieldID], "标题")) {
                                        ItemForm.Title = item.content[FieldID];
                                    }
                                    else if (MatchName(FieldInfoMap[FieldID], "图片")) {
                                        ItemForm.Image = item.content[FieldID];
                                    }
                                    else if (MatchName(FieldInfoMap[FieldID], "描述") || MatchName(FieldInfoMap[FieldID], "简介")) {
                                        ItemForm.Description = item.content[FieldID];
                                    }
                                }
                                _this.SearchResult.push(ItemForm)
                            }
                        })
                    })

                });
            });
        },
    },
    mounted() {
        this.Arguments.Keywords = this.$route.query.Keywords;
        this.GetList();
    },
};
</script>

<style scoped>
.MainSearch {
    min-height: 180vw;
}

.ConditionResult {
    position: relative;
    width: 80vw;
    left: 10vw;
    top: 10vw;
    /* background-color: lightcoral; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>