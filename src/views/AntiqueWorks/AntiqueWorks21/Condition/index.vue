<template>
	<div class="Container">
        <!-- 标题 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">标题</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputTitle"
					v-model="Arguments.Title"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 作者 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">作者</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputAuthor"
					v-model="Arguments.Author"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 主题词 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">主题词</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputSubject"
					v-model="Arguments.Subject"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 来源 -->
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">来源</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputSource"
					v-model="Arguments.Source"
					placeholder=""
				/>
			</div>
		</div>


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
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputLanguage"
					v-model="Arguments.Language"
					placeholder=""
				/>
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
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputVersionType"
					v-model="Arguments.VersionType"
					placeholder=""
				/>
			</div>
		</div>

        <!-- 外部形态 -->
        <div class="SearchBlock">
			<div class="SearchType">外部形态</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputExternalForm"
					v-model="Arguments.ExternalForm"
					placeholder=""
				/>
			</div>
		</div>

		<div class="RedButton FilterButton" @click="FilterButton" >筛选</div>
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
			
		};
	},
    methods: {
        FilterButton() {
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
.InputTypeNumber, .InputSeal, .InputEvent, .InputSource, .InputLanguage, .InputVersionType, .InputExternalForm, .InputAuthor, .InputSubject, .InputTitle {
    width: 12vw;
}
.FilterButton {
	position: relative;
	width: 9vw;
	height: 3vw;
}
</style>