<template>
	<div class="Container">
        <!-- 姓名 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">姓名</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputName"
					v-model="Arguments.Name"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 主题 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">主题</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputTheme"
					v-model="Arguments.Theme"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 专业 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">专业</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputMajor"
					v-model="Arguments.Major"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 访谈时间 -->
		<div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">访谈时间</div>
			<div class="SearchTime">
				<input
					class="AdvancedSearchInput InputTime"
					v-model="Arguments.TimeFrom"
					placeholder=""
				/>
				<div class="SearchText">至</div>
				<input
					class="AdvancedSearchInput InputTime"
					v-model="Arguments.TimeTo"
					placeholder=""
				/>
			</div>
		</div>
        <!-- 地点 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">访谈地点</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputLocation"
					v-model="Arguments.Location"
					placeholder=""
				/>
			</div>
		</div>
		 
		<div class="RedButton FilterButton" @click="FilterButton">筛选</div>
	</div>
</template>

<script>
export default {
	name: "Condition",
	props: {
		Arguments: {
			type: Object,
		},
	},
	data() {
		return {
			// Locations: [
			// 	{
			// 		Title: "外文楼",
			// 		Value: "1",
			// 	},
			// 	{
			// 		Title: "红楼",
			// 		Value: "2",
			// 	},
			// ],
		};
	},
    methods: {
        FilterButton(){
            this.$emit("FilterButton");
        }
    }
};
</script>

<style scoped>
.Container {
	position: relative;
	width: 12vw;
	/* background-color: lightblue; */
}
.SearchBlock {
	position: relative;
	width: 12vw;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;

    margin-bottom: 3vw;
	/* background-color: lightgreen; */
}
.SelectItem{
    margin-top: 1vw;
}
.SearchType {
	font-size: 1.5vw;
	font-weight: bold;
}
.SearchText {
	font-size: 1.5vw;
}
.SearchTime {
	position: relative;
	width: 12vw;
	height: 4vw;
	/* background-color: lightpink; */

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.InputTime {
    width: 4.2vw;
}

.InputName, .InputTheme, .InputMajor, .InputLocation {
    width: 12vw;
}
.FilterButton {
	position: relative;
	width: 9vw;
	height: 3vw;
}
</style>