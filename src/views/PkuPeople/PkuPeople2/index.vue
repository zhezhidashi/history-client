<template>
	<div class="Background PkuPeople2">
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
import Search from "@/views/PkuPeople/PkuPeople2/Search";
import Condition from "@/views/PkuPeople/PkuPeople2/Condition";
import Result from "@/views/PkuPeople/PkuPeople2/Result";
export default {
	name: "PkuPeople2",
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
				// 资源类型
                ResourceType: "",
                Title: "",
                Theme: "",
                // 时间
                TimeFrom: "",
                TimeTo: "",
                // 地点
                Location: "",
                // 语种
                Language: "",
                // 人物
                People: "",
                // 事件
                Event: "",
                // 来源
                Source: "",
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
.PkuPeople2 {
	min-height: 140vw;
    height: auto;
}
.ConditionResult {
    position: relative;
    height: auto;
    width: 80vw;
    left: 10vw;
    top: 10vw;
    /* background-color: lightcoral; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>