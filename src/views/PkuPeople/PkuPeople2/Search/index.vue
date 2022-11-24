<template>
	<div class="Container">
		<div class="SelectContainer">
			<el-select v-model="Arguments.SelectValue" placeholder="请选择">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select>
		</div>
		<div class="ContentContainer">
			<input
				class="SearchContentStyle SearchContent"
				type="search"
				v-model="Arguments.Keywords"
				placeholder="请输入关键词"
			/>
		</div>

		<div @click="ChangeArguments" class="SearchLogoContainer" style="position: relative;">
			<img class="SearchLogo" src="SearchLogo.svg" alt="" />
		</div>
	</div>
</template>

<script>
export default {
	name: "Search",
    props: {
        Arguments: {
            type: Object,
        },
    },
	data() {
		return {
			options: [
				{
					value: "1",
					label: "姓名",
				},
				{
					value: "2",
					label: "题名",
				},
				{
					value: "3",
					label: "主题",
				},
			],
		};
	},
    methods: {
        ChangeArguments() {
            this.$emit("ChangeArguments", this.Arguments);
        },
    },
};
</script>

<style scoped>
.Container {
	position: relative;
	left: 0;
	right: 0;
	width: 80vw;
	height: 4.5vw;
    top: 5vw;
    left: 10vw;
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
	width: 63vw;
	height: 4.5vw;
	border: 1px solid #dcdfe6;
    box-sizing: border-box;
	/* background-color: lightcoral; */

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.SearchContent{
    position: relative;
    width: 59vw;
}

</style>