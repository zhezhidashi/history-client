<template>
	<div class="Background PkuPeople2">
		<Search :Arguments="Arguments" @ChangeArguments="ChangeArguments" />
		<div class="ConditionResult">
			<Condition
				:Arguments="Arguments"
                :ResourceFieldList="ResourceFieldList"
				@ChangeArguments="ChangeArguments"
                @FilterButton="FilterButton"
			/>
			<Result :Arguments="Arguments" :NowIndex="NowIndex" :TotalPages="TotalPages" :SearchResult="SearchResult" @ChangePages="ChangePages" />
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

            // ResourceFieldList: ["信件信函", "书稿", "手稿", "日记", "笔记", "公文", "会议资料", "出版合同", "其他"],
            ResourceFieldList: ["信件信函"],

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
            
		};
	},
	methods: {
		ChangeArguments(Arguments) {
			this.Arguments = Arguments;
		},
        ChangePages(d){
            this.NowIndex += d;
        },
        FilterButton(ResourceFieldList){
            this.ResourceFieldList = ResourceFieldList;
            this.GetList();
        },

        GetList(PageIndex) {
            let _this = this;
            // 获取字段列表
            
            let FilterRule = GetFilterRule(_this.Arguments);
            let TemplateIDList = GetTemplateIDList(this.ResourceFieldList);
            
            GetFieldInfo(function (FieldInfoMap) {
                let DataForm = {
                    location_id: 99999999,
                    page_index: PageIndex,
                    page_size: 6,
                    sort_by: "-show_time",
                    path: "root/archives",
                    deep_range: 2,
                    filter_rule: FilterRule,
                    order_rule: {
                        method: "show_time",
                        order: "+",
                    },
                    template_id: TemplateIDList,
                };
                postForm('/data/list', DataForm, _this, function (res) {
                    let List = res.data.list;
                    for (let PeopleIndex = 0; PeopleIndex < List.length; PeopleIndex++) {
                        let item = List[PeopleIndex];
                        let ItemForm = {
                            Path: item.path,
                            Title: "",
                            Image: ""
                        }
                        for (let FieldID in item.content) {
                            if (MatchName(FieldInfoMap[FieldID], "标题")) {
                                ItemForm.Title = item.content[FieldID];
                            }
                            else if (MatchName(FieldInfoMap[FieldID], "图片")) {
                                ItemForm.Image = item.content[FieldID];
                            }
                        }
                        _this.TotalPages = MergeItem(ItemForm,
                            _this.People,
                            _this.TotalPages,
                            4
                        );
                    }
                })
            })
        },
	},
    mounted(){
        // this.GetList();
        this.Arguments.Keywords = this.$route.Keywords;
    },
};
</script>

<style scoped>
.PkuPeople2 {
	min-height: 140vw;
    height: auto;
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