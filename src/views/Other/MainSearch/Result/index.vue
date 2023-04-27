<template>
    <div>
        <div class="Container">
            <div v-for="(item, index) in SearchResult" :key="index">
                <div class="ItemContainer">
                    <div class="ImageItem">
                        <!-- 鼠标悬停查看详情 -->
                        <div class="ImageHover">
                            <div class="RedButton SeeVideo" @click="GoToPage(item)">
                                查看详情
                            </div>
                        </div>
                        <div class="BackgroundImage ImageContainer" :style="`background-image:url(${item.Image})`"></div>
                    </div>
                    <div class="TextContainer">
                        <div class="TextTitle" @click="GoToPage(item)">
                            {{ item.Title }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 翻页器 -->
            <div class="ShiftContainer">
                <img @click="PageShift(-1)" class="ShiftLeft" src="ShiftLeft.svg" alt="" />
                <div class="ShiftPages">
                    {{ NowIndex }} &emsp; / &emsp; {{ TotalPages }}
                </div>
                <img @click="PageShift(1)" class="ShiftRight" src="ShiftRight.svg" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import { getForm, postForm, GetType, MergeItem, MatchName, GetFieldInfo, GetTitle } from "@/api/data";
export default {
    name: "Result",
    props: {
        Arguments: {
            type: Object,
        },
        NowIndex: {
            type: Number,
        },
        TotalPages: {
            type: Number,
        },
        SearchResult: {
            type: Array,
        },
    },
    data() {
        return {


        };
    },
    methods: {
        PageShift(d) {
            if (this.NowIndex + d > 0 && this.NowIndex + d <= this.TotalPages) {
                this.$emit("ChangePages", d);
            } else {
                this.$message({
                    type: "warning",
                    message: "已经是第一页或最后一页",
                });
            }
        },
        GoToPage(item) {
            let _this = this;
            let PathList = item.Path.split("/");
            if (PathList[1] === "archives") {
                let PathList = item.Path.split("/");
                let query = {
                    TabIndex: 0,
                    ContentStatus: 0,
                    Path1: PathList[0] + "/" + PathList[1] + "/" + PathList[2],
                    Path2: PathList[0] + "/" + PathList[1] + "/" + PathList[2] + "/" + PathList[3],
                    Path3: PathList[0] + "/" + PathList[1] + "/" + PathList[2] + "/" + PathList[3] + "/" + PathList[4],
                    PeopleName: "",
                    TabName: "",
                    LetterName: "",
                    LetterTemplateID: item.TemplateID,
                }

                GetTitle(_this, query.Path1, function (res) {
                    query.PeopleName = res;
                    GetTitle(_this, query.Path2, function (res) {
                        query.TabName = res;


                        // 计算 TabIndex 和 ContentStatus
                        GetFieldInfo(_this, function (FieldInfoMap) {
                            let DataForm = {
                                location_id: 99999999,
                                page_index: 1,
                                page_size: 99999,
                                sort_by: "-show_time",
                                path: query.Path1,
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
                                for (let TabIndex = 0; TabIndex < List.length; TabIndex++) {
                                    let item = List[TabIndex];
                                    for (let FieldID in item.content) {

                                        if (MatchName(FieldInfoMap[FieldID], "标题") && item.content[FieldID] === query.TabName) {
                                            query.TabIndex = TabIndex / 6;
                                            query.ContentStatus = TabIndex;
                                        }
                                    }
                                }

                                GetTitle(_this, query.Path3, function (res) {
                                    query.LetterName = res;
                                    console.log("&&&", query);
                                    _this.$router.push({
                                        name: 'PkuPeople4',
                                        query: query,
                                    });
                                })

                            })
                        })
                    })
                })

            }
            else if (PathList[1] === "interview") {
                // let Path = PathList[0] + '/' + PathList[1] + '/' + PathList[2];
                // this.$router.push({
                //     name: 'OralHistory3',
                //     query: {
                //         Path1: "root/interview",
                //         Path2: Path,
                //         TemplateID: item.TemplateID,
                //     },
                // });

                let PathList = item.Path.split("/");
                let query = {
                    TabIndex: 0,
                    ContentStatus: 0,
                    Path1: PathList[0] + "/" + PathList[1] + "/" + PathList[2],
                    Path2: PathList[0] + "/" + PathList[1] + "/" + PathList[2] + "/" + PathList[3],
                    Path3: PathList[0] + "/" + PathList[1] + "/" + PathList[2] + "/" + PathList[3] + "/" + PathList[4],
                    PeopleName: "",
                    TabName: "",
                    LetterName: "",
                    LetterTemplateID: item.TemplateID,
                }

                GetTitle(_this, query.Path1, function (res) {
                    query.PeopleName = res;
                    GetTitle(_this, query.Path2, function (res) {
                        query.TabName = res;


                        // 计算 TabIndex 和 ContentStatus
                        GetFieldInfo(_this, function (FieldInfoMap) {
                            let DataForm = {
                                location_id: 99999999,
                                page_index: 1,
                                page_size: 99999,
                                sort_by: "-show_time",
                                path: query.Path1,
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
                                for (let TabIndex = 0; TabIndex < List.length; TabIndex++) {
                                    let item = List[TabIndex];
                                    for (let FieldID in item.content) {

                                        if (MatchName(FieldInfoMap[FieldID], "标题") && item.content[FieldID] === query.TabName) {
                                            query.TabIndex = TabIndex / 6;
                                            query.ContentStatus = TabIndex;
                                        }
                                    }
                                }

                                GetTitle(_this, query.Path3, function (res) {
                                    query.LetterName = res;
                                    console.log("&&&", query);
                                    _this.$router.push({
                                        name: 'OralHistory4',
                                        query: query,
                                    });
                                })

                            })
                        })
                    })
                })

                
            }
            else if (PathList[1] === "picture") {

            }
            else if (PathList[1] === "ancient_book") {
                this.$router.push({
                    name: "AntiqueWorks31",
                    query: {
                        Path: item.Path,
                        TemplateID: item.TemplateID,
                    }
                });
            }
            else if (PathList[1] === "reservation") {
                this.$router.push({
                    name: "AntiqueWorks32",
                    query: {
                        Path: item.Path,
                        TemplateID: item.TemplateID,
                    }
                });
            }
        },
    },
};
</script>

<style scoped>
.Container {
    position: relative;
    width: 60vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: lightblue; */
}

.ItemContainer {
    position: relative;
    width: 60vw;
    height: 22vw;
    margin-bottom: 4vw;
    border-radius: 4px;
    /* background-color: white; */
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

/* 图片 */
.ImageItem {
    position: relative;
    width: 25vw;
    height: 18vw;
    /* background-color: lightcoral; */
}

/* 鼠标悬浮出现“查看详情” */
.ImageHover {
    position: absolute;
    width: 25vw;
    height: 18vw;
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

.SeeVideo {
    width: 11vw;
    height: 3vw;
}

.ImageContainer {
    position: relative;
    width: 25vw;
    height: 18vw;
    border-radius: 4px;
}

/* 文字 */
.TextContainer {
    position: relative;
    width: 30vw;
    height: 18vw;
    /* background-color: lightblue; */
}

/* 标题 */
.TextTitle {
    font-size: 1.5vw;
    line-height: 150%;
    margin-bottom: 1vw;
    cursor: pointer;
}

/* 时间、地点 */
.TextTime,
.TextLocation {
    font-size: 1.3vw;
    line-height: 120%;
    color: #9f9e9e;
}
</style>