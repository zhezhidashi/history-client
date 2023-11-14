<template>
	<div>
		<div class="AntiqueWorks31Container">
			<Images
				:ImageList="ImageList"
				:Title="Title"
			/>
			<Content :ContentInfo="ContentInfo" :Title="Title" :PDFUrl="PDFUrl" />
		</div>
	</div>
</template>

<script>
import Images from "@/views/AntiqueWorks/AntiqueWorks31/Images";
import Content from "@/views/AntiqueWorks/AntiqueWorks31/Content";
import { postForm, getForm, GetType, MatchName, GetFieldInfo } from "@/api/data";
export default {
	name: "AntiqueWorks31",
	components: {
		Images,
		Content,
	},
	data() {
		return {
			ImageList: [
				// {
				//     ImageUrl: "古籍详情01.jpg",
				//     Index: 0,
				//     Path: "0",
				// },
			],

			// 中英文对应
			InfoMap: {},

			ContentInfo: [
				// {
				// 	NameZH: "主要责任人",
				// 	TemplateID: 0,
				//  Value: "（清）冯鲁严撰"
				// },
			],

			Title: "",

            PDFUrl: "",
		};
	},
	methods: {
        GetOtherInfo() {
            let _this = this;
            // 获得该信件的 TemplateID
            let BookPath = _this.$route.query.Path;
            
            // 获取该信件的信息
            GetFieldInfo(_this, function (FieldInfoMap) {
                let DataForm = {
                    path: BookPath,
                };

                postForm('/data/node', DataForm, _this, function (res) {
                    let item = res.data
                    for (let FieldID in item.content) {
                        if(MatchName(FieldInfoMap[FieldID], "标题")){
                            _this.Title = item.content[FieldID]
                        }
                        else if (MatchName(FieldInfoMap[FieldID], "PDF") || MatchName(FieldInfoMap[FieldID], "pdf")) {
                            _this.PDFUrl = item.content[FieldID];
                        }
                        else if (
                            !MatchName(FieldInfoMap[FieldID], "图片") && 
                            !MatchName(FieldInfoMap[FieldID], "节点名称") && 
                            !MatchName(FieldInfoMap[FieldID], "标题") && 
                            !MatchName(FieldInfoMap[FieldID], "起始时间") &&
                            !MatchName(FieldInfoMap[FieldID], "结束时间") &&
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
                    path: BookPath,
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
        this.GetOtherInfo();
	},
};
</script>

<style scoped>
.AntiqueWorks31Container {
	position: relative;
	width: 100%;
	height: 80vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}
</style>