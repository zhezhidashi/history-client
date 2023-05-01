<template>
	<div class="SearchContainer">
        <div class="Choice1Container">印像</div>
        <div class="Choice2Container" @click="GoToPage('Events12')" >事纪</div>
		<!-- <div class="SelectContainer">
			<el-select v-model="SelectValue" placeholder="请选择">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select>
		</div> -->
		<div class="ContentContainer">
			<input
				class="SearchContentStyle SearchContent"
				type="search"
				v-model="Keywords"
				placeholder="请输入关键词"
			/>
		</div>

		<div
			@click="GoToPage('Events21')"
			class="SearchLogoContainer"
			style="position: relative"
		>
			<img class="SearchLogo" src="SearchLogo.svg" alt="" />
		</div>
	</div>
</template>

<script>
export default {
	name: "Search",
	data() {
		return {
			// options: [
			// 	{
			// 		value: "1",
			// 		label: "题名",
			// 	},
			// 	{
			// 		value: "2",
			// 		label: "责任者",
			// 	},
			// 	{
			// 		value: "3",
			// 		label: "主题词",
			// 	},
			// 	{
			// 		value: "4",
			// 		label: "来源",
			// 	},
			// ],
			// SelectValue: "1",
			Keywords: "",
		};
	},
	methods: {
		GoToPage(name) {
			this.$router.push({ 
                name, 
                query: {
                    Keywords: this.Keywords,
                }
            });
		},
	},
};
</script>

<style scoped>
.SearchContainer {
	position: relative;
	width: 80vw;
	height: 4.5vw;
	/* background-color: lightblue; */

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.Choice1Container{
    position: relative;
    width: 8vw;
    height: 4.3vw;
    background-color: #e3e3e3;
    color: #9B0000;
    border-bottom: 0.2vw solid #9B0000;
    cursor: pointer;

    font-size: 1.5vw;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Choice2Container{
    position: relative;
    width: 8vw;
    height: 4.5vw;
    background-color: #e3e3e3;
    cursor: pointer;

    font-size: 1.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.SelectContainer {
	position: relative;
	width: 10vw;
	height: 4.5vw;
	/* background-color: lightgreen; */
}

.ContentContainer {
	position: relative;
	width: 57vw;
	height: 4.5vw;
	border: 1px solid #dcdfe6;
    box-sizing: border-box;
	/* background-color: lightcoral; */

	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
}

.SearchContent {
	position: relative;
	width: 53vw;
}
</style>