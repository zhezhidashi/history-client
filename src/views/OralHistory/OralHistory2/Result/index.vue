<template>
	<div>
		<div class="Container">
			<div v-for="(item, index) in SearchResult" :key="index">
				<div class="ItemContainer">
					<div class="ImageItem">
						<!-- 鼠标悬停查看详情 -->
						<div class="ImageHover">
							<div class="RedButton SeeVideo">查看视频</div>
						</div>
						<div
							class="BackgroundImage ImageContainer"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
					<div class="TextContainer">
						<div class="TextTitle">{{ item.Title }}</div>
						<div class="TextTime">{{ item.Time }}</div>
						<div class="TextLocation">{{ item.Location }}</div>
					</div>
				</div>
			</div>

            <!-- 翻页器 -->
			<div class="ShiftContainer">
				<img
					@click="PageShift(-1)"
					class="ShiftLeft"
					src="ShiftLeft.svg"
					alt=""
				/>
				<div class="ShiftPages">
					{{ NowIndex }} &emsp; / &emsp; {{ TotalPages }}
				</div>
				<img
					@click="PageShift(1)"
					class="ShiftRight"
					src="ShiftRight.svg"
					alt=""
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Result",
    props: {
        Arguments:{
            type: Object,
        },
    },
	data() {
		return {
            NowIndex: 1,
            TotalPages: 1,
			// 访谈列表
			SearchResult: [
				{
					Title: "李明滨口述史",
					Time: "2010/11/8",
					Location: "访谈地点：外文楼217",
					Image: "李明滨.jpg",
				},
				{
					Title: "韦旭升口述史",
					Time: "2010/11/8",
					Location: "访谈地点：外文楼217",
					Image: "韦旭升.jpg",
				},
			],
		};
	},
	methods: {
        PageShift(d){
            if (this.NowIndex + d > 0 && this.NowIndex + d <= this.TotalPages){
                this.NowIndex += d;
            }
            else{
                this.$message({ type: "warning", message: "已经是第一页或最后一页" });
            }
        }
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
	line-height: 300%;
}
/* 时间、地点 */
.TextTime,
.TextLocation {
	font-size: 1.3vw;
	line-height: 120%;
	color: #9f9e9e;
}
</style>