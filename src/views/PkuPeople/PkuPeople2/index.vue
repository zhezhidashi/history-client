<template>
    <div class="Background PkuPeople2">
        <Search :Arguments="Arguments" @ChangeArguments="ChangeArguments" />
        <div class="ConditionResult">
            <Condition :Arguments="Arguments" @ChangeArguments="ChangeArguments"
                @FilterButton="FilterButton" />
            <Result :Arguments="Arguments" :NowIndex="NowIndex" :TotalPages="TotalPages" :SearchResult="SearchResult"
                @ChangePages="ChangePages" />
        </div>
    </div>
</template>

<script>
import Search from "@/views/PkuPeople/PkuPeople2/Search";
import Condition from "@/views/PkuPeople/PkuPeople2/Condition";
import Result from "@/views/PkuPeople/PkuPeople2/Result";
import { postForm, getForm, MergeItem, MatchName, GetFieldInfo, GetFilterRule, GetTemplateIDList } from "@/api/data";
export default {
    name: "PkuPeople2",
    components: {
        Search,
        Condition,
        Result,
    },
    data() {
        return {
            // Search and Condition
            Arguments: {
                // 搜索关键词
                Keywords: "",
                // 标题
                Title: "",
                // 主题
                Theme: "",
                // 时间
                TimeFrom: "",
                TimeTo: "",
                // 地点
                Location: "",
                // 语种
                Language: "",
                // 人物
                People: "",
                // 事件
                Event: "",
                // 来源
                Source: "",
            },

            // Result
            SearchResult: [
                // {
                //     Title: "季先生之女给季先生的信件",
                //     Description:
                //         "季先生之女给季先生的信件 此页是季先生的女儿于1957年2月20日写给季先生的信，内容主要是想在“本周六上午来看您”。",
                //     Image: "PkuPeople2-Image1.jpg",
                // },
            ],
            NowIndex: 1,
            TotalPages: 1,
            // 注意，这个名字和Condition.vue里面的名字一样，但是不是作为参数传过去，是condition里面每次修改都覆盖这个数组。
            ResourceFieldList: ["信件信函", "书稿", "手稿", "日记", "笔记", "公文", "会议资料", "出版合同", "其他"],
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

            GetFilterRule(_this, _this.Arguments, function (res) {
                FilterRule = res;
                GetTemplateIDList(_this.ResourceFieldList, function (res) {
                    TemplateIDList = res;
                    
                    console.log("***", _this.Arguments, _this.ResourceFieldList, FilterRule, TemplateIDList)

                    GetFieldInfo(_this, function (FieldInfoMap) {
                        let DataForm = {
                            location_id: 99999999,
                            page_index: _this.NowIndex,
                            page_size: 6,
                            sort_by: "-show_time",
                            path: "root/archives",
                            deep_range: 3,
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
                                    Title: "",
                                    Image: "",
                                    Description: "",
                                    TemplateID: item.template_id,
                                }
                                for (let FieldID in item.content) {
                                    if (MatchName(FieldInfoMap[FieldID], "标题")) {
                                        ItemForm.Title = item.content[FieldID];
                                    }
                                    else if (MatchName(FieldInfoMap[FieldID], "图片")) {
                                        ItemForm.Image = item.content[FieldID];
                                    }
                                    else if(MatchName(FieldInfoMap[FieldID], "描述") || MatchName(FieldInfoMap[FieldID], "简介")){
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
.PkuPeople2 {
    height: 180vw;
}

.ConditionResult {
    position: relative;
    height: auto;
    width: 80vw;
    left: 10vw;
    top: 10vw;
    /* background-color: lightcoral; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>