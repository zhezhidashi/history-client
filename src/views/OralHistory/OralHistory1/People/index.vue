<template>
  <div class="Container">
    <div class="PeopleBlock">
      <div v-for="(item, index) in People[NowIndex]" :key="index">
        <div
          class="Card PeopleContainer"
          @click="GoToPage('OralHistory3', item)"
        >
          <div
            class="BackgroundImage PeopleImage"
            :style="`background-image:url(${item.Image})`"
          ></div>
          <div class="PeopleTitle">{{ item.Title }}</div>
        </div>
      </div>
    </div>
    <div class="ShiftContainer">
      <img
        @click="ImageShift(-1)"
        class="ShiftLeft"
        src="ShiftLeft.svg"
        alt=""
      />
      <div class="ShiftPages">
        {{ NowIndex + 1 }} &emsp; / &emsp; {{ TotalPages }}
      </div>
      <img
        @click="ImageShift(1)"
        class="ShiftRight"
        src="ShiftRight.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { throttle } from "lodash";
import { postForm, getForm, GetType, MergeItem, MatchName } from "@/api/data";
export default {
  name: "Search",
  data() {
    return {
      TotalPages: 1,
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
  },
  mounted() {
    let _this = this;
    // 首先查询 archive，获得其模版；
    let DataForm = {
      path: "root/interview",
    };
    postForm("/data/node", DataForm, _this, function (res) {
      let ArchiveTemplateID = res.data.template_id;

      //然后查询 People 模板ID
      getForm(
        `/template/one?main_id=${ArchiveTemplateID}`,
        _this,
        function (res) {
          let PeopleTemplateID = res.data.children_template_limit[0];

          // 查询 People 所在 Path
          let DataForm = {
            location_id: 99999999,
            page_index: 1,
            page_size: 99999,
            sort_by: "-show_time",
            path: "root/interview",
            deep_range: 0,
            filter_rule: {},
            order_rule: {
              method: "show_time",
              order: "+",
            },
            template_id: PeopleTemplateID,
          };

          postForm("/data/list", DataForm, _this, function (res) {
            for (
              let PeopleIndex = 0;
              PeopleIndex < res.data.list.length;
              PeopleIndex++
            ) {
              let PeoplePath = res.data.list[PeopleIndex].path;

              // 查询 People 拥有的字段的模板
              getForm(
                `/template/one?main_id=${PeopleTemplateID}`,
                _this,
                function (res) {
                  // Field 意为字段
                  let FieldTemplateID = res.data.children_template_limit;

                  let ItemForm = {
                    Path: PeoplePath,
                    Title: "",
                    Image: "",
                    TemplateID: PeopleTemplateID,
                  };

                  // 查询每个字段模板信息，如模板名字
                  for (let i = 0; i < FieldTemplateID.length; i++) {
                    let FieldID = FieldTemplateID[i];
                    getForm(
                      `/template/one?main_id=${FieldID}`,
                      _this,
                      function (res) {
                        let FieldName = res.data.name;
                        if (
                          MatchName(FieldName, "图片") ||
                          MatchName(FieldName, "标题")
                        ) {
                          // 查询当前字段所在数据
                          let DataForm = {
                            location_id: 99999999,
                            page_index: 1,
                            page_size: 99999,
                            sort_by: "-show_time",
                            path: PeoplePath,
                            deep_range: 0,
                            filter_rule: {},
                            order_rule: {
                              method: "show_time",
                              order: "+",
                            },
                            template_id: FieldID,
                          };
                          postForm(
                            `/data/list`,
                            DataForm,
                            _this,
                            function (res) {
                              let item = res.data.list[0];
                              for (let key in item.content) {
                                if (GetType(key) !== "name") {
                                  if (MatchName(FieldName, "图片")) {
                                    ItemForm.Image = item.content[key];
                                  } else if (MatchName(FieldName, "标题")) {
                                    ItemForm.Title = item.content[key];
                                  }
                                }
                              }

                              if (ItemForm.Title != "" && ItemForm.Image != "") {
                                _this.TotalPages = MergeItem(
                                  ItemForm,
                                  _this.People,
                                  _this.TotalPages,
                                  4
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
      );
    });
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
