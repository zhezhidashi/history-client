<template>
	<div>
        <div class="OriginalUrlContainer">
            <el-button @click="OpenWeb" class="OriginalUrl" plain>查看原文</el-button>
            <!-- <el-button type="info">成功按钮</el-button> -->
        </div>
        
        <div class="WebImageContainer">
            <img class="WebImage" :src="WebImage" alt="">
        </div>
	</div>
</template>

<script>

import { postForm, getForm, GetType, MatchName, GetFieldInfo } from "@/api/data";
export default {
	name: "Events32",
	data() {
		return {
            // 原文网址
			OriginalUrl: "",
            // 标题
			Title: "",
            // 快照
            WebImage: "",
		};
	},
	methods: {
        GetOtherInfo() {
            let _this = this;
            // 获得该事纪的 TemplateID
            let BookPath = _this.$route.query.Path;
            
            // 获取该事纪的信息
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
                        else if (MatchName(FieldInfoMap[FieldID], "原文网址")){
                            _this.OriginalUrl = item.content[FieldID];
                        }
                        else if (MatchName(FieldInfoMap[FieldID], "网页快照")){
                            _this.WebImage = item.content[FieldID];
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

        OpenWeb(){
            window.open(this.OriginalUrl);
        }
    },
	mounted() {
		this.GetOtherInfo();
	},
};
</script>

<style scoped>
.OriginalUrlContainer{
    width: 100vw;
    display: flex;
    justify-content: center;
}
.OriginalUrl{
    width: 45vw;
    font-size: 1.5vw;
}
.WebImageContainer{
    width: 100vw;
}
.WebImage{
    width: 100%;
}
</style>