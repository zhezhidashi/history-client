<template>
    <div class="Container">
        <div class="PeopleBlock">
            <div v-for="(item, index) in People[NowIndex]" :key="index">
                <div class="Card PeopleContainer" @click="GoToPage('OralHistory3', item)">
                    <div class="BackgroundImage PeopleImage" :style="`background-image:url(${item.Image})`"></div>
                    <div class="PeopleTitle">{{ item.Title }}</div>
                </div>
            </div>
        </div>
        <div class="ShiftContainer">
            <img @click="ImageShift(-1)" class="ShiftLeft" src="ShiftLeft.svg" alt="" />
            <div class="ShiftPages">
                {{ NowIndex + 1 }} &emsp; / &emsp; {{ TotalPages }}
            </div>
            <img @click="ImageShift(1)" class="ShiftRight" src="ShiftRight.svg" alt="" />
        </div>
    </div>
</template>

<script>
import { throttle } from "lodash";
import { postForm, getForm, GetType, MergeItem, MatchName, GetFieldInfo } from "@/api/data";
export default {
    name: "Search",
    data() {
        return {
            TotalPages: 0,
            NowIndex: 0,
            People: [
                // [
                // 	{
                // 		Title: "李明滨口述史",
                // 		Image: "李明滨.jpg",
                // 		Path: "0",
                // 	},
                // ],
            ],
        };
    },
    methods: {
        GoToPage(name, item) {
            this.$router.push({
                name,
                query: {
                    Path1: "root/interview",
                    Path2: item.Path,
                    TemplateID: item.TemplateID,
                },
            });
        },

        // 人物图片按钮切换
        ImageShift: throttle(function (d) {
            let Images = document.querySelectorAll(".PeopleImage");
            let Titles = document.querySelectorAll(".PeopleTitle");

            let Len = Images.length;
            let ImageFadeTimer = setInterval(ImageFade, 7);
            let opa = 100;
            let _this = this;

            function ImageFade() {
                if (opa > 0) {
                    for (let i = 0; i < Len; i++) {
                        Images[i].style.opacity = String(opa / 100);
                        Titles[i].style.opacity = String(opa / 100);
                    }
                } else if (opa === 0) {
                    _this.NowIndex =
                        (_this.NowIndex + d + _this.TotalPages) % _this.TotalPages;
                } else if (opa > -100) {
                    for (let i = 0; i < Len; i++) {
                        Images[i].style.opacity = String(-opa / 100);
                        Titles[i].style.opacity = String(-opa / 100);
                    }
                } else {
                    clearInterval(ImageFadeTimer);
                }
                opa--;
            }
        }, 2000),

        GetList() {
            let _this = this;
            // 获取字段列表
            GetFieldInfo(function (FieldInfoMap) {
                let DataForm = {
                    location_id: 99999999,
                    page_index: 1,
                    page_size: 99999,
                    sort_by: "-show_time",
                    path: "root/interview",
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
                    for (let PeopleIndex = 0; PeopleIndex < List.length; PeopleIndex++) {
                        let item = List[PeopleIndex];
                        let ItemForm = {
                            Path: item.path,
                            Title: "",
                            Image: "",
                            TemplateID: item.template_id,
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
    mounted() {
        this.GetList();
    },
};
</script>

<style scoped>
.Container {
    width: 80vw;
    height: 35vw;
    /* background-color: lightblue; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.PeopleBlock {
    position: relative;
    width: 80vw;
    height: 25vw;
    /* background-color: lightcyan; */
    display: flex;
    flex-direction: row;
    align-items: center;
}

.PeopleContainer {
    position: relative;
    width: 17vw;
    margin: 0 1.5vw;
    height: 25vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.PeopleImage {
    position: relative;
    width: 17vw;
    height: 20vw;
}

.PeopleTitle {
    position: relative;
    line-height: 5vw;
}
</style>
