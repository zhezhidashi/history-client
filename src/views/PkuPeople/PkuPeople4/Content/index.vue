<template>
	<div class="ContentContainer">
		<div v-for="(item, index) in ContentInfo" :key="index">
			<div class="Item">
				<div class="ItemName">{{ item.NameZH }}：</div>
				<div class="ItemValue">{{ item.Value }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Content",
	props: ["ContentInfo", "Title"],
	data() {
		return {};
	},
	methods: {},
};
</script>

<style scoped>
.ContentContainer {
	position: relative;
	width: 80vw;
	height: 25vw;
	/* background-color: lightcoral; */
}
.Title{
    position: relative;
    font-size: 1.8vw;
    font-weight: bold;
    height: 5.4vw;
    line-height: 300%;
}
.Item{
    position: relative;
    display: flex;
    font-size: 1.2vw;
    line-height: 200%;
}
.ItemName{
    position: relative;
    color: rgb(0, 0, 0, 0.6);
}
.ItemValue{
    position: relative;
}
</style>