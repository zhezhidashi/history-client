<template>
	<div class="Background Container">
		<div class="ItemContainer">
            <div class="InfoContainer">
                <div class="WebPath">口述档案&ensp;>&ensp;李明滨口述史</div>
                <div class="TimeLocation">访谈时间：2010/11/8 &emsp; 访谈地点：外文楼217</div>
            </div>
			<video width="100%" controls>
				<source src="movie.mp4" type="video/mp4" />
				<source src="movie.ogg" type="video/ogg" />
				<source src="movie.webm" type="video/webm" />
				<object data="movie.mp4" width="320" height="240">
					<embed src="movie.swf" width="320" height="240" />
				</object>
			</video>
            <div class="IntroContainer">简介：</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "OralHistory3",
	data() {
		return {};
	},
};
</script>

<style scoped>
.Container {
	position: relative;
	min-height: 80vw;
	height: auto;
	display: flex;
	align-items: center;
}
.ItemContainer {
    position: relative;
    width: 40vw;
    height: 30vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* background: lightblue; */
}
.InfoContainer{
    position: relative;
    width: 100%;
    height: 2vw;
    display: flex;
    
    align-items: center;
    justify-content: space-between;
}
.WebPath, .TimeLocation{
    font-size: 1vw;
}
.IntroContainer{
    position: relative;
    width: 100%;
    height: 6vw;
    font-size: 1vw;
    line-height: 150%;
    /* background: lightgreen; */
}

</style>