<template>
	<div class="Background MainSearch">
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
import Search from "@/views/Other/MainSearch/Search";
import Condition from "@/views/Other/MainSearch/Condition";
import Result from "@/views/Other/MainSearch/Result";
export default {
	name: "MainSearch",
	components: {
		Search,
		Condition,
		Result,
	},
	data() {
		return {
			Arguments: {
				// 搜索关键词
				Keywords: "",

                // 资源类型
                ResourceType: "",
				// 时间
				TimeFrom: "",
				TimeTo: "",
				// 语种
				Language: "",
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
.MainSearch {
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