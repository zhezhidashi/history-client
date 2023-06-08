<template>
  <div class="TabChoicesContainer">
    <div class="PeopleTitle">
      {{ People }}
    </div>

    <div
      class="BackgroundImage PeopleImage"
      :style="`background-image:url(${PeopleImage})`"
    ></div>

    <div @click="ShowIntro" class="PeopleIntroduction">
        点击查看简介
    </div>

    <div class="TabBlock">
      <div class="HoverShift TabLeft" @click="ChangeTabIndex(-1)">
        <img class="TabShiftImage" src="LeftTriangle.svg" alt="" />
      </div>
      <div class="ItemBlock">
        <div
          v-for="(item, index) in Tabs[TabIndex]"
          :key="6 * TabIndex + index"
        >
          <div
            class="ItemContainer HoverTab"
            :style="
              6 * TabIndex + index === ContentStatus
                ? 'background: white; border-bottom: 0.2vw solid #9B0000; border-top: 0.2vw solid #ffffff;'
                : ''
            "
            @click="ChangeContentStatus(6 * TabIndex + index)"
          >
          {{ item.Title }} ({{ item.ChildNum }})
          </div>
        </div>
      </div>
      <div class="HoverShift TabRight" @click="ChangeTabIndex(1)">
        <img class="TabShiftImage" src="RightTriangle.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabChoices",
  props: {
    Tabs: {
      type: Array,
      default: () => [],
    },
    TabIndex: {
      type: Number,
      default: 0,
    },
    ContentStatus: {
      type: Number,
      default: 0,
    },
    People: {
      type: String,
      default: "",
    },
    PeopleImage: {
      type: String,
      default: "",
    },
    PeopleIntro: {
        type: String,
        default: "",
    }
  },
  data() {
    return {};
  },
  methods: {
    ChangeTabIndex(d) {
      if (this.TabIndex + d >= 0 && this.TabIndex + d < this.Tabs.length) {
        this.$emit("ChangeTabIndex", this.TabIndex + d);
      }
    },
    ChangeContentStatus(index) {
      this.$emit("ChangeContentStatus", index);
    },
    ShowIntro(){
        this.$notify({
            title: '简介',
            message: this.PeopleIntro,
            duration: 0
        });
    }
  },
};
</script>

<style scoped>
.PeopleTitle {
  position: relative;
  width: 18vw;
  height: 6vw;
  /* background-color: lightblue; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
}
.PeopleIntroduction{
    position: relative;
    width: 18vw;
    height: 5vw;
    /* background-color: lightblue; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5vw;
    cursor: pointer;
}
.TabChoicesContainer {
  position: relative;
  width: 18vw;
  height: 71vw;
  background-color: #e3e3e3;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.PeopleImage {
  position: relative;
  width: 14vw;
  height: 14vw;
  /* background-color: lightpink; */
}
.TabBlock {
  position: relative;
  width: 18vw;
  height: 46vw;
  display: flex;
  flex-direction: column;
  /* background-color: lightblue; */
  cursor: pointer;
}
.TabLeft,
.TabRight {
  position: relative;
  width: 18vw;
  height: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* background-color: lightgreen; */
}

.HoverShift {
  /* 需要参与过渡的属性 */
  transition-property: background, border-bottom;
  /* 过渡动画的持续时间 */
  transition-duration: 0.5s;
}

.HoverShift:hover {
  background: white;
  border-bottom: 0.2vw solid #9b0000;

  /* border-top: 0.2vw solid #ffffff; */
  /* border-bottom: 0.2vw solid #9B0000; */
}
.ItemBlock {
  position: relative;
  width: 18vw;
  height: 36vw;
  display: flex;
  flex-direction: column;
  /* background-color: lightpink; */
}
.ItemContainer {
  position: relative;
  box-sizing: border-box;
  width: 18vw;
  height: 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5vw;
}

.TabShiftImage{
    rotate: 90deg;
}
</style>
