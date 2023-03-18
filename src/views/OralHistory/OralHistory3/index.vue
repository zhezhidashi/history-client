<template>
    <div class="Background Container">
        <div class="WebPath">
            <div @click="GoToPage('OralHistory2')" style="cursor: pointer">
                口述档案
            </div>
            &ensp;>&ensp;
            <div>{{ PeopleName }}</div>
        </div>
        <div class="VideoBlock">
            <div v-for="(item, index) in Videos" :key="index">
                <el-button @click="DownloadVideo(item)">下载</el-button>
                <div class="ItemContainer">
                    <div class="InfoContainer">
                        <div class="TimeLocation">
                            访谈时间：{{ item.Time1 }} ~ {{ item.Time2 }} &emsp; 访谈地点：{{ item.Location }}
                        </div>
                    </div>
                    <div class="IntroContainer">
                        简介：
                        <div v-for="(line, index) in item.Description" :key="index">
                            &emsp;&emsp;{{ line }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getForm, postForm, GetType, MergeItem, MatchName, GetFieldInfo } from "@/api/data";
export default {
    name: "OralHistory3",
    data() {
        return {
            Videos: [
                // {
                //   Time: "2010年11月18日14:00",
                //   Location: "北京大学民主楼法语系会议室",
                //   Description: [],
                //   Content: "李明滨访谈录音.mp3",
                // },
            ],
            PeopleName: "",
            Path1: "",
            Path2: "",
        };
    },
    methods: {
        GoToPage(name) {
            this.$router.push({ name });
        },
        DownloadVideo(item) {
            let _this = this;
            getForm(`/file/download/media_file?path=${item.Content}`, _this, function (res) {
                // console.log("***", res);
            });
        },
        GetList() {
            let _this = this;
            GetFieldInfo(function (FieldInfoMap) {
                let DataForm = {
                    location_id: 99999999,
                    page_index: 1,
                    page_size: 99999,
                    sort_by: "-show_time",
                    path: _this.Path2,
                    deep_range: 1,
                    filter_rule: {},
                    order_rule: {
                        method: "show_time",
                        order: "+",
                    },
                    template_id: 0,
                };

                postForm('/data/list', DataForm, _this, function (res) {
                    let List = res.data.list;
                    for (let VideoIndex = 0; VideoIndex < List.length; VideoIndex++) {
                        let item = List[VideoIndex];
                        let ItemForm = {
                            Time1: undefined,
                            Time2: undefined,
                            Location: undefined,
                            Description: undefined,
                            Content: undefined,
                        };
                        for (let FieldID in item.content) {
                            if (MatchName(FieldInfoMap[FieldID], "起始时间")) {
                                ItemForm.Time1 = item.content[FieldID];
                            }
                            else if (MatchName(FieldInfoMap[FieldID], "结束时间")) {
                                ItemForm.Time2 = item.content[FieldID];
                            }
                            else if (MatchName(FieldInfoMap[FieldID], "地点")) {
                                ItemForm.Location = item.content[FieldID];
                            }
                            else if (MatchName(FieldInfoMap[FieldID], "简介")) {
                                ItemForm.Description = item.content[FieldID].split("$$$");
                            }
                            else if (MatchName(FieldInfoMap[FieldID], "视频") || MatchName(FieldInfoMap[FieldID], "音频")) {
                                ItemForm.Content = item.content[FieldID];
                            }
                        }
                        _this.Videos.push(ItemForm);
                    }
                })
            })
        }
    },
    mounted() {
        this.Path1 = this.$route.query.Path1;
        this.Path2 = this.$route.query.Path2;

        this.GetList();

    },
};
</script>

<style scoped>
.Container {
    position: relative;
    height: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background: lightgreen; */
}

.WebPath {
    position: relative;
    font-size: 1.2vw;
    width: 50vw;
    line-height: 400%;
    display: flex;
}

.VideoBlock {
    position: relative;
    height: auto;
    width: 80vw;
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
    align-items: center;
}

.VideoItem {
    position: relative;
    width: 50vw;
    height: 4.5vw;
    /* background: red; */
}

.ItemContainer {
    position: relative;
    width: 50vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* background: lightblue; */
}

.InfoContainer {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.TimeLocation {
    position: relative;
    font-size: 1.2vw;
    line-height: 200%;
}

.IntroContainer {
    position: relative;
    width: 100%;
    height: auto;
    font-size: 1.2vw;
    line-height: 200%;
    /* background: lightgreen; */
}
</style>
