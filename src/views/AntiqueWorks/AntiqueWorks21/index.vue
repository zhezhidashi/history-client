<template>
    <div class="Background AntiqueWorks21">
        <Search :Arguments="Arguments" @ChangeArguments="ChangeArguments" />
        <div class="ConditionResult">
            <Condition :Arguments="Arguments" @ChangeArguments="ChangeArguments" @FilterButton="FilterButton" />
            <Result :Arguments="Arguments" :NowIndex="NowIndex" :TotalPages="TotalPages" :SearchResult="SearchResult"
                :Description="Description" @ChangePages="ChangePages" />
        </div>
    </div>
</template>

<script>
import Search from "@/views/AntiqueWorks/AntiqueWorks21/Search";
import Condition from "@/views/AntiqueWorks/AntiqueWorks21/Condition";
import Result from "@/views/AntiqueWorks/AntiqueWorks21/Result";
import { postForm, getForm, MergeItem, MatchName, GetFieldInfo, GetFilterRule, GetTemplateIDList } from "@/api/data";
export default {
    name: "AntiqueWorks21",
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
                {
                    Title: "从征缅甸记畧：1卷",
                    People: "（清）冯鲁严撰",
                    VersionType: "",
                    ExternalForm: "线装，外加硬皮重新装订，1册，26.8 x 15cm",
                    Subject: "笔记，史料，中国，清代",
                    Language: "汉文",
                    Seal: "张礼千",
                    TypeNumber: "",
                    Image: "AntiqueImage1.jpg",
                },
            ],

            // 搜索条目描述类型
            Description: [
                {
                    NameZH: "作者",
                    NameEN: "People",
                },
                {
                    NameZH: "版本类别",
                    NameEN: "VersionType",
                },
                {
                    NameZH: "外观形态",
                    NameEN: "ExternalForm",
                },
                {
                    NameZH: "主题词",
                    NameEN: "Subject",
                },
                {
                    NameZH: "古籍语种",
                    NameEN: "Language",
                },
                {
                    NameZH: "印章",
                    NameEN: "Seal",
                },
                {
                    NameZH: "分类号",
                    NameEN: "TypeNumber",
                },
            ],

            ResourceFieldList: ["列表：古籍"],
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

            GetFilterRule(_this.Arguments, function (res) {
                FilterRule = res;
                GetTemplateIDList(_this.ResourceFieldList, function (res) {
                    TemplateIDList = res;

                    console.log("***", _this.Arguments, _this.ResourceFieldList, FilterRule, TemplateIDList)

                    GetFieldInfo(function (FieldInfoMap) {
                        let DataForm = {
                            location_id: 99999999,
                            page_index: _this.NowIndex,
                            page_size: 5,
                            sort_by: "-show_time",
                            path: "root/ancient_book",
                            deep_range: 0,
                            filter_rule: FilterRule,
                            order_rule: {
                                method: "show_time",
                                order: "+",
                            },
                            template_id: TemplateIDList[0],
                        };
                        
                        postForm('/data/list', DataForm, _this, function (res) {
                            let List = res.data.list;

                            _this.TotalPages = res.data.total_page;

                            for (let PeopleIndex = 0; PeopleIndex < List.length; PeopleIndex++) {
                                let item = List[PeopleIndex];
                                let ItemForm = {
                                    Title: "",
                                    People: "",
                                    VersionType: "",
                                    ExternalForm: "",
                                    Subject: "",
                                    Language: "",
                                    Seal: "",
                                    TypeNumber: "",
                                    Image: "",
                                }
                                for (let FieldID in item.content) {
                                    if (MatchName(FieldInfoMap[FieldID], "标题")) {
                                        ItemForm.Title = item.content[FieldID];
                                    }
                                    if (MatchName(FieldInfoMap[FieldID], "作者")) {
                                        ItemForm.People = item.content[FieldID];
                                    }
                                    if (MatchName(FieldInfoMap[FieldID], "版本类别")) {
                                        ItemForm.VersionType = item.content[FieldID];
                                    }
                                    if (MatchName(FieldInfoMap[FieldID], "外观形态")) {
                                        ItemForm.ExternalForm = item.content[FieldID];
                                    }
                                    if (MatchName(FieldInfoMap[FieldID], "主题词")) {
                                        ItemForm.Subject = item.content[FieldID];
                                    }
                                    if (MatchName(FieldInfoMap[FieldID], "语言")) {
                                        ItemForm.Language = item.content[FieldID];
                                    }
                                    if (MatchName(FieldInfoMap[FieldID], "印章")) {
                                        ItemForm.Seal = item.content[FieldID];
                                    }
                                    if (MatchName(FieldInfoMap[FieldID], "分类号")) {
                                        ItemForm.TypeNumber = item.content[FieldID];
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
.AntiqueWorks21 {
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