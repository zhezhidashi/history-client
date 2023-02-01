<template>
	<div class="ContentContainer">
		<div class="ContentTitle">{{ People }}</div>
		<div class="ItemPart">
			<div class="ItemBlock">
				<div v-for="(item, index) in Contents[NowIndex]" :key="index">
					<div
						class="LineLimit Item"
						@click="GoToPage('PkuPeople4', item)"
					>
						{{ item.Title }}
					</div>
				</div>
			</div>
			<div class="VerticalLine"></div>
			<div class="ItemBlock">
				<div
					v-for="(item, index) in Contents[NowIndex + 1]"
					:key="index"
				>
					<div
						class="LineLimit Item"
						@click="GoToPage('PkuPeople4', item)"
					>
						{{ item.Title }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Content",
	props: [
		"Contents",
		"People",
		"ContentTotalPages",
        "ParentPath",
		"TabPath",
		"TabIndex",
		"ContentStatus",
	],
	data() {
		return {
			NowIndex: 0,
		};
	},
	methods: {
		GoToPage(name, item) {
			this.$router.push({
				name: name,
				query: {
					TabIndex: this.TabIndex,
					ContentStatus: this.ContentStatus,
                    Path1: this.ParentPath,
					Path2: this.TabPath,
					Path3: item.Path,
				},
			});
		},
	},
};
</script>

<style scoped>
.ContentContainer {
	position: relative;
	width: 80vw;
	height: 70vw;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}
.ContentTitle {
	position: relative;
	width: 100%;
	height: 5vw;
	font-size: 2.5vw;
	font-weight: bold;
	line-height: 200%;
	color: #333333;
}
.ItemPart {
	position: relative;
	width: 80vw;
	height: 55vw;
	/* background-color: lightblue; */
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.ItemBlock {
	position: relative;
	width: 37vw;
	height: 55vw;
	/* background-color: lightgreen; */

	display: flex;
	flex-direction: column;
}
.VerticalLine {
	position: relative;
	width: 1px;
	height: 55vw;
	background-color: #9e9e9e;
}
.Item {
	position: relative;
	width: 100%;
	font-size: 1.5vw;
	line-height: 230%;
	cursor: pointer;

	-webkit-line-clamp: 1;
}
</style>