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
    </div>
  </div>
</template>

<script>
import { getForm, postForm, GetType, MergeItem, MatchName } from "@/api/data";
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
        postForm(`/file/download/media_file?path=${item.Content}`, {}, _this, function (res) {
        console.log("***", res);
      });
    },
  },
  mounted() {
    let _this = this;
    _this.Path1 = _this.$route.query.Path1;
    _this.Path2 = _this.$route.query.Path2;
    let PeopleTemplateID = this.$route.query.TemplateID;

    // 首先由 PeopleTemplateID 获取 标题、简介、视频列表 的子模板ID
    getForm(`/template/one?main_id=${PeopleTemplateID}`, _this, function (res) {
      let FieldTemplateID = res.data.children_template_limit;
      // 获取各个子模板的内容
      for (
        let FieldIndex = 0;
        FieldIndex < FieldTemplateID.length;
        FieldIndex++
      ) {
        let FieldID = FieldTemplateID[FieldIndex];
        getForm(`/template/one?main_id=${FieldID}`, _this, function (res) {
          let FieldName = res.data.name;
          if (MatchName(FieldName, "标题") || MatchName(FieldName, "列表")) {
            let DataForm = {
              location_id: 99999999,
              page_index: 1,
              page_size: 99999,
              sort_by: "-show_time",
              path: _this.Path2,
              deep_range: 0,
              filter_rule: {},
              order_rule: {
                method: "show_time",
                order: "+",
              },
              template_id: FieldID,
            };
            postForm("/data/list", DataForm, _this, function (res) {
              if (res.data.list.length != 0) {
                let ListPath = res.data.list[0].path;

                if (MatchName(FieldName, "标题")) {
                  for (let key in res.data.list[0].content) {
                    if (key != "name") {
                      _this.PeopleName = res.data.list[0].content[key];
                    }
                  }
                } else {
                  let ItemForm = {
                    Time: undefined,
                    Location: undefined,
                    Description: undefined,
                    Content: undefined,
                  };
                  // 查找每一个视频列表的子模板 ID
                  getForm(
                    `/template/one?main_id=${FieldID}`,
                    _this,
                    function (res) {
                      let ListItemTemplateID = res.data.children_template_limit;
                      for (
                        let ListItemIndex = 0;
                        ListItemIndex < ListItemTemplateID.length;
                        ListItemIndex++
                      ) {
                        let ItemTemplateID = ListItemTemplateID[ListItemIndex];

                        getForm(
                          `/template/one?main_id=${ItemTemplateID}`,
                          _this,
                          function (res) {
                            let ItemTemplateName = res.data.name;

                            let DataForm = {
                              location_id: 99999999,
                              page_index: 1,
                              page_size: 99999,
                              sort_by: "-show_time",
                              path: ListPath,
                              deep_range: 0,
                              filter_rule: {},
                              order_rule: {
                                method: "show_time",
                                order: "+",
                              },
                              template_id: ItemTemplateID,
                            };

                            postForm(
                              "/data/list",
                              DataForm,
                              _this,
                              function (res) {
                                let VideoInfo = res.data.list[0];

                                for (let key in VideoInfo.content) {
                                  if (key != "name") {
                                    if (MatchName(ItemTemplateName, "简介")) {
                                      ItemForm.Description = VideoInfo.content[key].split("$$$");
                                    } else if (
                                      MatchName(ItemTemplateName, "时间")
                                    ) {
                                      ItemForm.Time = VideoInfo.content[key];
                                    } else if (
                                      MatchName(ItemTemplateName, "地点")
                                    ) {
                                      ItemForm.Location =
                                        VideoInfo.content[key];
                                    } else if (
                                      MatchName(ItemTemplateName, "视频") || MatchName(ItemTemplateName, "音频")
                                    ) {
                                      ItemForm.Content = VideoInfo.content[key];
                                    }
                                  }
                                }

                                if (
                                  ItemForm.Description != undefined &&
                                  ItemForm.Time != undefined &&
                                  ItemForm.Location != undefined &&
                                  ItemForm.Content != undefined
                                ) {
                                  
                                  _this.Videos.push(ItemForm);
                                }
                              }
                            );
                          }
                        );
                      }
                    }
                  );
                }
              }
            });
          }
        });
      }
    });
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
