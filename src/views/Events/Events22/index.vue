<template>
    <div class="Background Events22">
        <Search :Arguments="Arguments" @ChangeArguments="ChangeArguments" />
        <div class="ConditionResult">
            <Condition :Arguments="Arguments" @ChangeArguments="ChangeArguments" @FilterButton="FilterButton" />
            <Result :Arguments="Arguments" :NowIndex="NowIndex" :TotalPages="TotalPages" :SearchResult="SearchResult"
                :Description="Description" @ChangePages="ChangePages" />
        </div>
    </div>
</template>

<script>
import Search from "@/views/Events/Events22/Search";
import Condition from "@/views/Events/Events22/Condition";
import Result from "@/views/Events/Events22/Result";
import { postForm, getForm, MergeItem, MatchName, GetFieldInfo, GetFilterRule, GetTemplateIDList } from "@/api/data";
export default {
    name: "Events22",
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

                // 标题
                Title: "",
                // 作者
                Author: "",
                // 主题词
                Subject: "",
                // 来源
                Source: "",

                // 出版日期
                TimeFrom: "",
                TimeTo: "",

                // 分类号
                TypeNumber: "",
                // 语种
                Language: "",
                // 印章
                Seal: "",
                // 版本类别：
                VersionType: "",
                // 外部形态：
                ExternalForm: "",
            },

            NowIndex: 1,
            TotalPages: 1,
            // 搜索结果
            SearchResult: [
                // {
                //     Title: "从征缅甸记畧：2卷",
                //     People: "（清）冯鲁严撰",
                //     VersionType: "",
                //     ExternalForm: "线装，外加硬皮重新装订，1册，26.8 x 15cm",
                //     Subject: "笔记，史料，中国，清代",
                //     Language: "汉文",
                //     Seal: "张礼千",
                //     TypeNumber: "",
                //     Image: "AntiqueImage1.jpg",
                // },
            ],

            // 搜索条目描述类型
            Description: [
                {
                    NameZH: "时间",
                    NameEN: "Time",
                },
            ],

            ResourceFieldList: ["列表：事纪"],
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
        FilterButton() {
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
                            page_size: 5,
                            sort_by: "-show_time",
                            path: "root/event",
                            deep_range: 1,
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
                                    Title: "",
                                    Time: "",
                                    Image: "",
                                    Path: item.path,
                                    TemplateID: item.template_id,
                                }
                                for (let FieldID in item.content) {
                                    if (MatchName(FieldInfoMap[FieldID], "标题")) {
                                        ItemForm.Title = item.content[FieldID];
                                    }
                                    if (MatchName(FieldInfoMap[FieldID], "时间")) {
                                        ItemForm.Time = item.content[FieldID];
                                    }
                                    if (MatchName(FieldInfoMap[FieldID], "图片")) {
                                        ItemForm.Image = item.content[FieldID];
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
    }
};
</script>

<style scoped>
.Events22 {
    min-height: 150vw;
    height: auto;
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