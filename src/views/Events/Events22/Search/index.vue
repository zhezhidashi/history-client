<template>
    <div class="SearchContainer">
        <div class="Choice1Container" @click="GoToPage('Events21')">
            印像
        </div>
        <div class="Choice2Container">事纪</div>

        <!-- <div class="SelectContainer">
            <el-select v-model="Arguments.SelectValue" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div> -->
        <div class="ContentContainer">
            <input class="SearchContentStyle SearchContent" type="search" v-model="Arguments.Keywords"
                placeholder="请输入关键词" />
        </div>

        <div @click="ChangeArguments" class="SearchLogoContainer" style="position: relative">
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
		};
	},
    methods: {
        ChangeArguments() {
            this.$emit("ChangeArguments", this.Arguments);
        },
        GoToPage(name) {
			this.$router.push({ name });
		},
    },
};
</script>

<style scoped>
.SearchContainer {
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

.Choice1Container {
    position: relative;
    width: 8vw;
    height: 4.5vw;
    background-color: #e3e3e3;
    font-size: 1.5vw;
    
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Choice2Container {
    position: relative;
    width: 8vw;
    height: 4.3vw;
    background-color: #e3e3e3;

    font-size: 1.5vw;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #9b0000;
    border-bottom: 0.2vw solid #9b0000;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.5vw;
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