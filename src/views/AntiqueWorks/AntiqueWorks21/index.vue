<template>
	<div class="Background AntiqueWorks21">
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
import Search from "@/views/AntiqueWorks/AntiqueWorks21/Search";
import Condition from "@/views/AntiqueWorks/AntiqueWorks21/Condition";
import Result from "@/views/AntiqueWorks/AntiqueWorks21/Result";
export default {
	name: "AntiqueWorks21",
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

				// 出版日期
				TimeFrom: "",
				TimeTo: "",

				// 分类号
				TypeNumber: "",
                // 语种
				Language: "",
                // 印章
                Seal: "",
				// 版本类别：
                VersionType: "",
                // 外部形态：
                ExternalForm: "",
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
.AntiqueWorks21 {
	min-height: 150vw;
    height: auto;
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