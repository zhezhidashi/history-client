<template>
    <div class="ContentContainer">
        <div class="ChoiceContainer">
            <!-- 精选古籍和查看全部 -->
            <div class="TextBlock">
                <div>精选古籍</div>
                <div class="SeeAll" @click="GoToPage('AntiqueWorks21', {})">
                    查看全部
                </div>
            </div>
            <!-- 图片列表 -->
            <div class="ImageBlock">
                <div v-for="(item, index) in Images1" :key="index">
                    <div class="ImageItem">
                        <!-- 鼠标悬停查看详情 -->
                        <div class="ImageHover">
                            <div class="RedButton SeeDetails" @click="
    									GoToPage('AntiqueWorks31', {
        										Path: item.Path,
                                                TemplateID: item.TemplateID,
        									})
    								">
                                查看古籍
                            </div>
                        </div>
                        <div class="BackgroundImage ImageContainer" :style="`background-image:url(${item.Image})`"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ChoiceContainer">
            <!-- 精选特藏和查看全部 -->
            <div class="TextBlock">
                <div>精选特藏</div>
                <div class="SeeAll" @click="GoToPage('AntiqueWorks22', {})">
                    查看全部
                </div>
            </div>
            <!-- 图片列表 -->
            <div class="ImageBlock">
                <div v-for="(item, index) in Images2" :key="index">
                    <div class="ImageItem">
                        <!-- 鼠标悬停查看详情 -->
                        <div class="ImageHover">
                            <div class="RedButton SeeDetails" @click="
    									GoToPage('AntiqueWorks32', {
                                            Path: item.Path,
                                            TemplateID: item.TemplateID,
        								})
    								">
                                查看特藏
                            </div>
                        </div>
                        <div class="BackgroundImage ImageContainer" :style="`background-image:url(${item.Image})`"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postForm, getForm, GetType, MergeItem, MatchName } from "@/api/data";
export default {
    name: "Content",
    data() {
        return {
            Images1: [
                // {
                // 	Image: "AntiqueImage1.jpg",
                // 	Path: "",
                // },
            ],
            Images2: [
                // {
                // 	Image: "特藏01.jpg",
                //     Path: "",
                // },
            ],
        };
    },
    methods: {
        GoToPage(name, query) {
            this.$router.push({ name, query });
        },
        GetList(ParentPath, ImageList) {
            let _this = this;
            // 首先查询 archive，获得其模版；
            let DataForm = {
                location_id: 99999999,
                page_index: 1,
                page_size: 4,
                sort_by: "-show_time",
                path: ParentPath,
                deep_range: 1,
                filter_rule: {},
                order_rule: {
                    method: "show_time",
                    order: "+",
                },
                template_id: 0,
            };
            /* 
            以古籍为例
            搜索深度为 1 的数据，找到所有 单部古籍 的根节点；但是这个一定要筛掉古籍的根节点（返回结果似乎已经筛掉了）
            然后遍历列表数据列表，存下来其 Path 的值，并根据每部古籍的模板 ID 获取子模板的ID，
            然后请求每个子模板ID的数据，获取每个古籍的封面图，记录下来Image.
            */
            postForm("/data/list", DataForm, _this, function(res) {
                let BookList = res.data.list;
                for (let BookIndex = 0; BookIndex < BookList.length; BookIndex++) {
                    let BookItem = BookList[BookIndex];
                    let BookTemplateID = BookItem.template_id;
                    let BookPath = BookItem.path;
                    let ItemForm = {
                        Image: undefined,
                        Path: BookItem.path,
                        TemplateID: BookItem.template_id,
                    }

                    getForm(`/template/one?main_id=${BookTemplateID}`, _this, function(res) {
                        let FieldTemplateID = res.data.children_template_limit;
                        for (let FieldIndex = 0; FieldIndex < FieldTemplateID.length; FieldIndex++) {
                            let FieldID = FieldTemplateID[FieldIndex];

                            getForm(`/template/one?main_id=${FieldID}`, _this, function(res) {
                                let FieldName = res.data.name;
                                if (MatchName(FieldName, "图片") && !MatchName(FieldName, "列表")) {

                                    let DataForm = {
                                        location_id: 99999999,
                                        page_index: 1,
                                        page_size: 1,
                                        sort_by: "-show_time",
                                        path: BookPath,
                                        deep_range: 1,
                                        filter_rule: {},
                                        order_rule: {
                                            method: "show_time",
                                            order: "+",
                                        },
                                        template_id: FieldID,
                                    };

                                    postForm("/data/list", DataForm, _this, function(res) {
                                        let DataItem = res.data.list[0];
                                        for (let key in DataItem.content) {
                                            if (key != "name") {
                                                ItemForm.Image = DataItem.content[key];
                                            }
                                        }

                                        if (ItemForm.Image != undefined) {
                                            ImageList.push(ItemForm);
                                        }
                                    })

                                }
                            })
                        }
                    })

                }

            });
        },
    },
    mounted() {
        this.GetList("root/ancient_book", this.Images1);
        this.GetList("root/reservation", this.Images2);
    },
};
</script>

<style scoped>
.ContentContainer {
    position: relative;
    width: 80vw;
    height: 50vw;
    /* background-color: lightblue; */
}

.ChoiceContainer {
    position: relative;
    width: 80vw;
    height: 25vw;
}

.TextBlock {
    position: relative;
    width: 80vw;
    height: 4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5vw;
    /* background-color: lightpink; */
}

.SeeAll {
    padding-bottom: 0.1vw;
    border-bottom: 0.1vw solid #9b0000;
    color: #9b0000;
    cursor: pointer;
}

.ImageBlock {
    position: relative;
    width: 80vw;
    height: 17vw;
    /* background-color: lightgreen; */
    display: flex;
    align-items: center;
}

/* 鼠标悬浮出现“查看详情” */

.ImageHover {
    position: absolute;
    width: 17vw;
    height: 17vw;
    margin: 0 1.5vw;
    overflow: hidden;
    border-radius: 4px;
    background: rgba(95, 95, 95, 0.37);
    z-index: 15;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.5s;
}

/* 冒号两边不能有空格！！！ */

.ImageItem:hover .ImageHover {
    opacity: 1;
}

.SeeDetails {
    width: 8vw;
    height: 3vw;
}

.ImageContainer {
    position: relative;
    width: 17vw;
    height: 17vw;
    margin: 0 1.5vw;
    border-radius: 4px;
}
</style>