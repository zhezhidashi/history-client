<template>
	<div>
		<div class="AntiqueWorks31Container">
			<Images
				:ImageList="ImageList"
				:Title="Title"
			/>
			<Content :ContentInfo="ContentInfo" :Title="Title" />
		</div>
	</div>
</template>

<script>
import Images from "@/views/AntiqueWorks/AntiqueWorks31/Images";
import Content from "@/views/AntiqueWorks/AntiqueWorks31/Content";
import { postForm, getForm, GetType, MatchName } from "@/api/data";
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
		};
	},
	methods: {
        GetOtherInfo() {
            let _this = this;
            // 获得该信件的 TemplateID
            let BookTemplateID = _this.$route.query.TemplateID;
            let BookPath = _this.$route.query.Path;
            // 存一下 子模板 的 ID, NameZH，以及对应的数据：TemplateID、NameZH、Value

            getForm(`/template/one?main_id=${BookTemplateID}`, _this, function(res) {
                let ChildTemplateID = res.data.children_template_limit;
                for (let ChildIndex = 0; ChildIndex < ChildTemplateID.length; ChildIndex++) {
                    getForm(`/template/one?main_id=${ChildTemplateID[ChildIndex]}`, _this, function(res) {
                        let ChildName = res.data.name;
                        let ChildID = ChildTemplateID[ChildIndex];
                        // 找到图片列表
                        if (MatchName(ChildName, "列表")) {
                            // 接下来，我们找到图片列表对应的 Path
                            let DataForm = {
                                location_id: 99999999,
                                page_index: 1,
                                page_size: 99999,
                                sort_by: "-show_time",
                                path: BookPath,
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
                        // 找到普通数据和标题，注意要筛掉封面图片
                        else if(!MatchName(ChildName, "图片")){
                            
                            let DataForm = {
                                location_id: 99999999,
                                page_index: 1,
                                page_size: 99999,
                                sort_by: "-show_time",
                                path: BookPath,
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
                                    if(key != "name" && MatchName(ChildName, "标题"))
                                        _this.Title = res.data.list[0].content[key];
                                    else if(key != "name" && res.data.list[0].content[key].toString() != "" && res.data.list[0].content[key].toString() != "1000000000"){
                                        _this.ContentInfo.push({
                                            TemplateID: ChildID,
                                            NameZH: ChildName,
                                            Value: res.data.list[0].content[key],
                                        });
                                    }
                                }
                            })

                        }
                    })
                }
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