<template>
    <div>
        <div class="Container">
            <div v-for="(item, index) in SearchResult" :key="index">
                <div class="ItemContainer">
                    <div class="ImageItem">
                        <!-- 鼠标悬停查看详情 -->
                        <div class="ImageHover">
                            <div class="RedButton SeeImage" @click="GoToPage('PkuPeople4')">
                                查看大图
                            </div>
                        </div>
                        <div class="BackgroundImage ImageContainer" :style="`background-image:url(${item.Image})`"></div>
                    </div>
                    <div class="TextContainer">
                        <div class="TextTitle" @click="GoToPage('PkuPeople4')">
                            {{ item.Title }}
                        </div>
                        <div class="TextDescription">
                            {{ item.Description }}
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
export default {
    name: "Result",
    props: {
        Arguments: {
            type: Object,
        },
        NowIndex: Number,
        TotalPages: Number,
        SearchResult: Array,
    },
    data() {
        return {
            // NowIndex: 1,
            // TotalPages: 1,
            // 访谈列表
            // SearchResult: [
            //     {
            //         Title: "季先生之女给季先生的信件",
            //         Description:
            //             "季先生之女给季先生的信件 此页是季先生的女儿于1957年2月20日写给季先生的信，内容主要是想在“本周六上午来看您”。",
            //         Image: "PkuPeople2-Image1.jpg",
            //     },
            //     {
            //         Title: "文艺社给季先生的信",
            //         Description:
            //             "此页是季先生的女儿于1957年2月20日写给季先生的信，内容主要是想在“本周六上午来看您”。",
            //         Image: "PkuPeople2-Image2.jpg",
            //     },
            // ],
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
        GoToPage(name) {
            this.$router.push({ name });
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
    background-color: #f4f4f4;
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

.SeeImage {
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
    position: relative;
    font-size: 1.5vw;
    line-height: 300%;
    cursor: pointer;
}

/* 时间、地点 */
.TextDescription {
    position: relative;
    font-size: 1.3vw;
    line-height: 120%;
    color: #9f9e9e;
}
</style>