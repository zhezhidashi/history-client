<template>
	<div>
		<div class="Container">
			<div v-for="(item, index) in SearchResult" :key="index">
				<div class="ItemContainer">
					<div class="ImageItem">
						<!-- 鼠标悬停查看详情 -->
						<div class="ImageHover">
							<div
								class="RedButton SeeImage"
								@click="GoToPage('AntiqueWorks32')"
							>
								查看大图
							</div>
						</div>
						<div
							class="BackgroundImage ImageContainer"
							:style="`background-image:url(${item.Image})`"
						></div>
					</div>
					<div class="TextContainer">
						<div class="TextTitle">{{ item.Title }}</div>
						<div class="TextDescription">
							<div
								v-for="(item_, index_) in Description"
								:key="index_"
							>
								<div class="NameContainer">
									<div class="TextNameZH">
										{{ item_.NameZH }}：
									</div>
									<div class="TextNameEN">
										{{ item[item_.NameEN] }}
									</div>
								</div>
							</div>
						</div>
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
		Arguments: {
			type: Object,
		},
	},
	data() {
		return {
			NowIndex: 1,
			TotalPages: 1,
			// 搜索结果
			SearchResult: [
				{
					Title: "粵東皇華集：第一卷",
					Time: "清光绪七至八年（1881-1882）",
					People: "李调元",
					VersionType: "刻本",
					ExternalForm: "线装2册",
					Language: "汉文",
					Seal: "张礼千",
					TypeNumber: "K254.9",
					Source: "张礼千赠书",
					Image: "AntiqueImage1.jpg",
				},
				{
					Title: "粵東皇華集：第一卷",
					Time: "清光绪七至八年（1881-1882）",
					People: "李调元",
					VersionType: "刻本",
					ExternalForm: "线装2册",
					Language: "汉文",
					Seal: "张礼千",
					TypeNumber: "K254.9",
					Source: "张礼千赠书",
					Image: "AntiqueImage2.jpg",
				},
				{
					Title: "粵東皇華集：第一卷",
					Time: "清光绪七至八年（1881-1882）",
					People: "李调元",
					VersionType: "刻本",
					ExternalForm: "线装2册",
					Language: "汉文",
					Seal: "张礼千",
					TypeNumber: "K254.9",
					Source: "张礼千赠书",
					Image: "AntiqueImage3.jpg",
				},
				{
					Title: "粵東皇華集：第一卷",
					Time: "清光绪七至八年（1881-1882）",
					People: "李调元",
					VersionType: "刻本",
					ExternalForm: "线装2册",
					Language: "汉文",
					Seal: "张礼千",
					TypeNumber: "K254.9",
					Source: "张礼千赠书",
					Image: "AntiqueImage4.jpg",
				},
			],

			// 搜索条目描述类型
			Description: [
				{
					NameZH: "出版时间",
					NameEN: "Time",
				},
				{
					NameZH: "主要责任人",
					NameEN: "People",
				},
				{
					NameZH: "版本类别",
					NameEN: "VersionType",
				},
				{
					NameZH: "外观形态",
					NameEN: "ExternalForm",
				},
				{
					NameZH: "古籍语种",
					NameEN: "Language",
				},
				{
					NameZH: "印章",
					NameEN: "Seal",
				},
				{
					NameZH: "分类号",
					NameEN: "TypeNumber",
				},
				{
					NameZH: "来源",
					NameEN: "Source",
				},
			],
		};
	},
	methods: {
		PageShift(d) {
			if (this.NowIndex + d > 0 && this.NowIndex + d <= this.TotalPages) {
				this.NowIndex += d;
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
	height: 4vw;
	font-size: 1.5vw;
	font-weight: bold;
}
/* 其他描述信息 */
.TextDescription {
	position: relative;
	width: 30vw;
	height: 14vw;
	/* background-color: lightblue; */

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}
.NameContainer {
	position: relative;
	height: auto;
	display: flex;
	align-items: center;
	font-size: 1vw;
	/* line-height: 150%; */
}
.TextNameZH {
	color: rgba(0, 0, 0, 0.6);
}
.TextNameEN {
	color: rgba(0, 0, 0);
}
</style>