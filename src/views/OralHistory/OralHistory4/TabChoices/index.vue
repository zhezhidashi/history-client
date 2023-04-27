<template>
	<div class="TabChoicesContainer">
		<div class="TabBlock">
			<div class="HoverTab TabLeft" @click="ChangeTabIndex(-1)">
				<img src="LeftTriangle.svg" alt="" />
			</div>
			<div class="ItemBlock">
				<div v-for="(item, index) in Tabs[TabIndex]" :key="6 * TabIndex + index">
					<div
						class="ItemContainer HoverTab"
						:style="
							6 * TabIndex + index === ContentStatus
								? 'background: white; border-bottom: 0.2vw solid #9B0000; border-top: 0.2vw solid #ffffff;'
								: ''
						"
						@click="ChangeContentStatus(6 * TabIndex + index)"
					>
						{{ item.Title }}
					</div>
				</div>
			</div>
			<div class="HoverTab TabRight" @click="ChangeTabIndex(1)">
				<img src="RightTriangle.svg" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TabChoices",
	props: {
		Tabs: {
			type: Array,
			default: () => [],
		},
		TabIndex: {
			type: Number,
			default: 0,
		},
		ContentStatus: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {};
	},
	methods: {
		ChangeTabIndex(d) {
			if (
				this.TabIndex + d >= 0 &&
				this.TabIndex + d < this.Tabs.length
			) {
				this.$emit("ChangeTabIndex", this.TabIndex + d);
			}
		},
		ChangeContentStatus(index) {
			this.$emit("ChangeContentStatus", index);
		},
	},
};
</script>

<style scoped>
.TabChoicesContainer {
	position: relative;
	width: 100vw;
	height: 6vw;
	background-color: #e3e3e3;
	display: flex;
	justify-content: center;
}
.TabBlock {
	position: relative;
	width: 80vw;
	height: 100%;
	display: flex;
	/* background-color: lightblue; */
	cursor: pointer;
}
.TabLeft,
.TabRight {
	position: relative;
	width: 6vw;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background-color: lightgreen; */
}
.ItemBlock {
	position: relative;
	width: 68vw;
	height: 100%;
	display: flex;

	/* background-color: lightpink; */
}
.ItemContainer {
	position: relative;
	box-sizing: border-box;
	width: 11.3vw;
	height: 6vw;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.5vw;
}
</style>