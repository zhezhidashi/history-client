<template>
	<div class="Background OralHistory2">
		<Search :Arguments="Arguments" @ChangeArguments="ChangeArguments" />
		<div class="ConditionResult">
			<Condition
				:Arguments="Arguments"
				@ChangeArguments="ChangeArguments"
			/>
			<Result :Arguments="Arguments" />
		</div>
	</div>
</template>

<script>
import Search from "@/views/OralHistory/OralHistory2/Search";
import Condition from "@/views/OralHistory/OralHistory2/Condition";
import Result from "@/views/OralHistory/OralHistory2/Result";
export default {
	name: "OralHistory2",
	components: {
		Search,
		Condition,
		Result,
	},
	data() {
		return {
			Arguments: {
				// 搜索框选择种类
				SelectValue: "1",
				// 搜索关键词
				Keywords: "",
				// 访谈时间
				TimeFrom: "",
				TimeTo: "",
				// 访谈地点
				Location: "",
			},
		};
	},
	methods: {
		ChangeArguments(Arguments) {
			this.Arguments = Arguments;
		},
	},
};
</script>

<style scoped>
.OralHistory2 {
	min-height: 80vw;
}
.ConditionResult {
    position: relative;
    width: 80vw;
    left: 10vw;
    top: 10vw;
    /* background-color: lightcoral; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>