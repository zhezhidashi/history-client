<template>
    <div class="Background Container">
        <div class="WebPath">
            <div @click="GoToPage('OralHistory1')" style="cursor: pointer">
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
                            访谈时间：{{ item.Time }} &emsp; 访谈地点：{{ item.Location }}
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
import { getForm, postForm, GetType, MergeItem, MatchName, GetFieldInfo, GetTitle, downloadVideo } from "@/api/data";
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

            TotalPages: 0,
            NowIndex: 1,
        };
    },
    methods: {
        GoToPage(name) {
            this.$router.push({ name });
        },
        DownloadVideo(item) {
            let _this = this;
            // window.open(`https://room_dev_api_doc.pacificsilkroad.cn/file/download/media_file?path=${item.Content}`, "_self");
            downloadVideo(`/file/download/media_file?path=${item.Content}`, _this, function (res) {
                if(res.status === 200){
                    let blob = new Blob([res.data], {
                    type: 'accept: application/json'
                    });
                    let fileName = item.Content;
                    // for IE
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, fileName);
                    } else {
                        // for Non-IE
                        let objectUrl = URL.createObjectURL(blob);
                        let link = document.createElement("a");
                        link.href = objectUrl;
                        link.setAttribute("download", fileName);
                        document.body.appendChild(link);
                        link.click();
                        window.URL.revokeObjectURL(link.href);
                    }
                }
                
            });
        },

        GetList(PageIndex) {
            
            let _this = this;
            _this.Videos = [];
            GetFieldInfo(_this, function (FieldInfoMap) {
                let DataForm = {
                    location_id: 99999999,
                    page_index: PageIndex,
                    page_size: 3,
                    sort_by: "-show_time",
                    path: _this.Path2,
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

                    _this.TotalPages = res.data.total_page;
                    for (let VideoIndex = 0; VideoIndex < List.length; VideoIndex++) {
                        let item = List[VideoIndex];
                        let ItemForm = {
                            Time: undefined,
                            Location: undefined,
                            Description: undefined,
                            Content: undefined,
                        };
                        for (let FieldID in item.content) {
                            if (FieldInfoMap[FieldID] === "时间") {
                                ItemForm.Time = item.content[FieldID];
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
        },

        PageShift(d) {
            if (this.NowIndex + d > 0 && this.NowIndex + d <= this.TotalPages) {
                this.NowIndex += d;
                this.GetList(this.NowIndex);

            } else {
                this.$message({
                    type: "warning",
                    message: "已经是第一页或最后一页",
                });
            }
        },
    },
    mounted() {
        this.Path1 = this.$route.query.Path1;
        this.Path2 = this.$route.query.Path2;

        this.GetList(1);

        let _this = this;
        // 获取人物名称
        GetTitle(this, this.Path2, function (res) {
            _this.PeopleName = res;
        })
    },
};
</script>

<style scoped>
.Container {
    position: relative;
    height: 160vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    /* background: lightgreen; */
}

.WebPath {
    position: relative;
    font-size: 1.2vw;
    width: 50vw;
    line-height: 600%;
    display: flex;
    /* background-color: lightyellow; */
}

.VideoBlock {
    position: relative;
    height: 152vw;
    width: 80vw;
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
    align-items: center;
    /* background-color: lightblue; */
}

.ItemContainer {
    position: relative;
    width: 50vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2vw;
    /* justify-content: space-between; */
    /* background: lightgreen; */
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
