<template>
	<div class="Background Container">
		<!-- <div class="WebPath">
			<div @click="GoToPage('OralHistory2')" style="cursor: pointer">
				口述档案
			</div>
			&ensp;>&ensp;
			<div>李明滨口述史</div>
		</div> -->
		<div class="VideoBlock">
			<div v-for="(item, index) in Videos" :key="index">
				<div class="ItemContainer">
					<div class="InfoContainer">
						<div class="TimeLocation">
							访谈时间：{{ item.Time }} &emsp; 访谈地点：{{
								item.Location
							}}
						</div>
					</div>
					<video width="100%" controls>
						<source src="movie.mp4" type="video/mp4" />
					</video>
					<div class="IntroContainer">
						简介：{{ item.Description }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "OralHistory3",
	data() {
		return {
			Videos: [
				{
					Time: "2010/11/8",
					Location: "外文楼217",
					Description: "",
					Video: "movie.mp4",
				},
				{
					Time: "2010/11/8",
					Location: "外文楼217",
					Description: "",
					Video: "movie.mp4",
				},
			],
		};
	},
	methods: {
		GoToPage(name) {
			this.$router.push({ name });
		},
	},
};
</script>

<style scoped>
.Container {
	position: relative;
	min-height: 90vw;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.WebPath {
	position: relative;
    font-size: 1.5vw;
	width: 50vw;
	line-height: 200%;
	display: flex;
}
.VideoBlock {
	position: relative;
	height: auto;
	width: 80vw;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.ItemContainer {
	position: relative;
	width: 50vw;
	height: 35vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	/* background: lightblue; */
}
.InfoContainer {
	position: relative;
	width: 100%;
	height: 2vw;
	display: flex;

	align-items: center;
	justify-content: flex-end;
}
.TimeLocation {
	font-size: 1.2vw;
}
.IntroContainer {
	position: relative;
	width: 100%;
	height: 7vw;
	font-size: 1.2vw;
	line-height: 150%;
	/* background: lightgreen; */
}
</style>