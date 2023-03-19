<template>
	<div class="Background OralHistory2">
		<Search :Arguments="Arguments" @ChangeArguments="ChangeArguments" />
		<div class="ConditionResult">
			<Condition
				:Arguments="Arguments"
				@ChangeArguments="ChangeArguments"
                @FilterButton="FilterButton"
			/>
			<Result :Arguments="Arguments" :NowIndex="NowIndex" :TotalPages="TotalPages" :SearchResult="SearchResult" @ChangePages="ChangePages" />
		</div>
	</div>
</template>

<script>
import Search from "@/views/OralHistory/OralHistory2/Search";
import Condition from "@/views/OralHistory/OralHistory2/Condition";
import Result from "@/views/OralHistory/OralHistory2/Result";
import { postForm, getForm, MergeItem, MatchName, GetFieldInfo, GetFilterRule, GetTemplateIDList } from "@/api/data";
export default {
	name: "OralHistory2",
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
                // 姓名
                Name: "",
                // 主题
                Theme: "",
                // 专业
                Major: "",

				// 访谈时间
				TimeFrom: "",
				TimeTo: "",
				// 访谈地点
				Location: "",
			},
            NowIndex: 1,
            TotalPages: 1,
            // 访谈列表
			SearchResult: [
				// {
				// 	Title: "李明滨口述史",
				// 	Time: "2010/11/8",
				// 	Location: "访谈地点：外文楼217",
				// 	Image: "李明滨.jpg",
				// },
				// {
				// 	Title: "韦旭升口述史",
				// 	Time: "2010/11/8",
				// 	Location: "访谈地点：外文楼217",
				// 	Image: "韦旭升.jpg",
				// },
                // {
				// 	Title: "李明滨口述史",
				// 	Time: "2010/11/8",
				// 	Location: "访谈地点：外文楼217",
				// 	Image: "李明滨.jpg",
				// },
				// {
				// 	Title: "韦旭升口述史",
				// 	Time: "2010/11/8",
				// 	Location: "访谈地点：外文楼217",
				// 	Image: "韦旭升.jpg",
				// },
                // {
				// 	Title: "李明滨口述史",
				// 	Time: "2010/11/8",
				// 	Location: "访谈地点：外文楼217",
				// 	Image: "李明滨.jpg",
				// },
			],
            // ResourceFieldList: ["口述史音频", "口述史视频"],
            ResourceFieldList: ["口述史音频"],
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
                            path: "root/interview",
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
                                    Title: "",
                                    TimeFrom: "",
                                    TimeTo: "",
                                    Location: "",
                                    Image: "",
                                }
                                for (let FieldID in item.content) {
                                    if (MatchName(FieldInfoMap[FieldID], "标题")) {
                                        ItemForm.Title = item.content[FieldID];
                                    }
                                    else if(MatchName(FieldInfoMap[FieldID], "起始时间")){
                                        ItemForm.TimeFrom = item.content[FieldID];
                                    }
                                    else if(MatchName(FieldInfoMap[FieldID], "结束时间")){
                                        ItemForm.TimeTo = item.content[FieldID];
                                    }
                                    else if(MatchName(FieldInfoMap[FieldID], "地点")){
                                        ItemForm.Location = item.content[FieldID];
                                    }
                                    else if (MatchName(FieldInfoMap[FieldID], "图片")) {
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
    mounted(){
        this.Arguments.Keywords = this.$route.query.Keywords;
        this.GetList();
    }
};
</script>

<style scoped>
.OralHistory2 {
	min-height: 155vw;
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