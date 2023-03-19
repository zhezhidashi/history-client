<template>
    <div class="Container">

        <div class="SearchBlock" style="height: 7vw">
            <div class="SearchType">时间</div>
            <div class="SearchTime">
                <input class="AdvancedSearchInput InputTime" v-model="Arguments.TimeFrom" placeholder="" />
                <div class="SearchText">至</div>
                <input class="AdvancedSearchInput InputTime" v-model="Arguments.TimeTo" placeholder="" />
            </div>
        </div>
        <div class="SearchBlock" style="height: 7vw">
			<div class="SearchType">语种</div>
			<div class="InputContainer">
				<input
					class="AdvancedSearchInput InputLanguage"
					v-model="Arguments.Language"
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
            FilterButton() {
                this.$emit("FilterButton", this.ResourceFieldList);
            }
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

    margin-bottom: 3vw;
    /* background-color: lightgreen; */
}

.SelectItem {
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

.InputLanguage {
    width: 12vw;
}

.FilterButton {
    position: relative;
    width: 9vw;
    height: 3vw;
}
</style>