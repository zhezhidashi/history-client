<template>
	<div class="ImagesContainer">
		<div class="WebPath">
			<div @click="GoToPage('AntiqueWorks12')" style="cursor: pointer">
				古籍特藏
			</div>
			&ensp;&gt;&ensp;
			<div @click="GoToPage('AntiqueWorks22')" style="cursor: pointer">
				特藏
			</div>
			&ensp;&gt;&ensp;
			<div>{{ Title }}</div>
		</div>

		<div class="ImageListAndMainImageContainer">
			<!--左侧图片列表-->
			<div class="ImageListContainer">
				<vue-scroll class="ImageListContainer" :ops="ops">
					<div v-for="item in ImageList" :key="item.ImageID">
						<div
							:class="
								item.Index === MainImageIndex
									? 'ClickImage'
									: 'ImageListImgContainer'
							"
						>
							<div
								@click="ImageListBtn(item)"
								class="ImageListImg"
								:style="`background-image:url(${item.ImageUrl})`"
							></div>
						</div>
					</div>
				</vue-scroll>
			</div>

			<!--右侧大图片-->
			<div style="position: relative; width: 65vw; height: 35vw">
				<img
					@click="ImageShift(-1)"
					id="PageShiftLeft"
					src="ShiftLeft.svg"
				/>
				<img
					@click="ImageShift(1)"
					id="PageShiftRight"
					src="ShiftRight.svg"
				/>
				<viewer class="MainImageContainer" :images="ImageList">
					<img
						class="MainImage"
						v-for="item in ImageList"
						:src="item.ImageUrl"
						:key="item.ImageID"
						v-show="item.Index === MainImageIndex"
					/>
				</viewer>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Image",
	props: ["ImageList", "Title", "TotalImage"],
	data() {
		return {
			MainImageIndex: 0,

			// scroll 的配置项
			ops: {
				vuescroll: {},
				scrollPanel: {},
				rail: {
					keepShow: true,
				},
				bar: {
					hoverStyle: true,
					onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
					// opacity: 0, //滚动条透明度
					background: "#9F9E9E",
					"overflow-x": "hidden",
				},
			},
		};
	},
	methods: {
		GoToPage(name) {
			this.$router.push({ name });
		},

		// 点击下方列表的图片，修改大图的url
		ImageListBtn(item) {
			this.MainImageIndex = item.Index;
		},

		// 左右按钮切换图片
		ImageShift(d) {
			this.MainImageIndex =
				(this.MainImageIndex + d + this.TotalImage) % this.TotalImage;
			// console.log(this.PictureID);
		},
	},
};
</script>

<style scoped>
.ImagesContainer {
	position: relative;
	width: 80vw;
	height: 38vw;
	/* background-color: lightblue; */
}
.WebPath {
	position: relative;
	height: 3vw;
	font-size: 1.2vw;
	line-height: 300%;

	display: flex;
}
.ImageListAndMainImageContainer {
	position: relative;
	width: 80vw;
	height: 35vw;
	/* background-color: lightgreen; */
	display: flex;

	border-radius: 7px;
	border: 1px solid #9f9e9e;
}

/*左侧的图片列表*/
.ImageListContainer {
	position: relative;
	width: 15vw;
	height: 35vw;
	background: white;
	border-radius: 7px 0 0 7px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
/* 左侧图片列表中每一个 image 的 Container */
.ImageListImgContainer {
	position: relative;
	width: 8vw;
	height: 8vw;
	padding: 2vw;
	/* background: blue; */
}

/* 点击图片的动画 */
.ClickImage {
	position: relative;
	animation: MyMove 0.3s forwards;
}

@keyframes MyMove {
	from {
		width: 8vw;
		height: 8vw;
		padding: 2vw;
	}
	to {
		width: 10vw;
		height: 10vw;
		padding: 1vw;
	}
}

.ImageListImg {
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	overflow: hidden;
	background-position: center center;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	border-radius: 7px;
	cursor: pointer;
	z-index: 10;
}

/* 网页主图 */
.MainImageContainer {
	position: relative;
	width: 65vw;
	height: 35vw;
	background: lightgrey;
	border-radius: 0 7px 7px 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
#PageShiftLeft {
	position: absolute;
	top: 15vw;
	width: 3vw;
	left: 1.5vw;
	z-index: 15;
	cursor: pointer;
}
#PageShiftRight {
	position: absolute;
	top: 15vw;
	width: 3vw;
	right: 1.5vw;
	z-index: 15;
	cursor: pointer;
}
.MainImage {
	position: relative;
	max-width: 100%;
	max-height: 100%;
	cursor: pointer;
}
</style>