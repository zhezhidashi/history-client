<template>
	<div class="Container">
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
			@click="GoToPage('PkuPeople2')"
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
			// 		label: "标题",
			// 	},
			// 	{
			// 		value: "2",
			// 		label: "主题",
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
                    // Type: this.options[parseInt(this.SelectValue) - 1].label,
                    Keywords: this.Keywords,
                }
            });
		},
	},
};
</script>

<style scoped>
.Container {
	position: relative;
	width: 80vw;
	height: 4.5vw;
	/* background-color: lightblue; */

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.SelectContainer {
	position: relative;
	width: 12vw;
	height: 4.5vw;
	/* background-color: lightgreen; */
}

.ContentContainer {
	position: relative;
	width: 79vw;
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
	width: 71vw;
}
</style>