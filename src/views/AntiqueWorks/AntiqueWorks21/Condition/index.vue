<template>
	<div class="Container">
        <!-- 出版日期 -->
		<div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">出版日期</div>
			<div class="InputContainer">
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

        <!-- 分类号 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">分类号</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputTypeNumber"
					v-model="Arguments.TypeNumber"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 语种 -->
        <div class="SearchBlock">
			<div class="SearchType">语种</div>
			<div v-for="(item, index) in Language" :key="index">
				<el-radio class="SelectItem" v-model="Arguments.Language" :label="item.Value">{{
					item.Title
				}}</el-radio>
			</div>
		</div>

        <!-- 印章 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">印章</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputSeal"
					v-model="Arguments.Seal"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 版本类别 -->
        <div class="SearchBlock">
			<div class="SearchType">版本类别</div>
			<div v-for="(item, index) in VersionType" :key="index">
				<el-radio class="SelectItem" v-model="Arguments.VersionType" :label="item.Value">{{
					item.Title
				}}</el-radio>
			</div>
		</div>

        <!-- 外部形态 -->
        <div class="SearchBlock">
			<div class="SearchType">外部形态</div>
			<div v-for="(item, index) in ExternalForm" :key="index">
				<el-radio class="SelectItem" v-model="Arguments.ExternalForm" :label="item.Value">{{
					item.Title
				}}</el-radio>
			</div>
		</div>

		<div class="RedButton FilterButton">筛选</div>
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
			Language: [
				{
					Title: "中文",
					Value: "1",
				},
				{
					Title: "英文",
					Value: "2",
				},
			],
			VersionType: [
                {
                    Title: "刻本",
                    Value: "1",
                },
                {
                    Title: "印刷本",
                    Value: "2",
                },
            ],
            ExternalForm: [
                {
                    Title: "刻本",
                    Value: "1",
                },
                {
                    Title: "印刷本",
                    Value: "2",
                },
            ],
		};
	},
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
    margin-bottom: 2vw;
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
.InputContainer {
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
.InputTypeNumber, .InputSeal, .InputEvent, .InputSource {
    width: 12vw;
}
.FilterButton {
	position: relative;
	width: 9vw;
	height: 3vw;
}
</style>