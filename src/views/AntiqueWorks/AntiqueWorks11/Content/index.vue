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
import { postForm, getForm, GetType, MergeItem, MatchName, GetFieldInfo } from "@/api/data";
export default {
    name: "Content",
    data() {
        return {
            Images1: [
                // {
                // 	Image: "AntiqueImage1.jpg",
                // 	Path: "",
                //  TemplateID: 0,
                // },
            ],
            Images2: [
                // {
                // 	Image: "特藏01.jpg",
                //  Path: "",
                //  TemplateID: 0,
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
            GetFieldInfo(function (FieldInfoMap) {
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
                    template_id_list: [0],
                };
                postForm('/data/list', DataForm, _this, function (res) {
                    let List = res.data.list;
                    for (let ArchiveIndex = 0; ArchiveIndex < List.length; ArchiveIndex++) {
                        let item = List[ArchiveIndex];
                        let ItemForm = {
                            Path: item.path,
                            Image: "",
                            TemplateID: item.template_id,
                        }
                        for (let FieldID in item.content) {
                            if (MatchName(FieldInfoMap[FieldID], "图片")) {
                                ItemForm.Image = item.content[FieldID];
                            }
                        }
                        ImageList.push(ItemForm);
                    }
                })
            })
                    
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
