<template>
	<div class="Background OralHistory1">
		<Search />
		<People />
	</div>
</template>

<script>
import Search from "@/views/OralHistory/OralHistory1/Search";
import People from "@/views/OralHistory/OralHistory1/People";
export default {
	name: "OralHistory1",
	components: {
		Search,
		People,
	},
	data() {
		return {};
	},
};
</script>

<style scoped>
.OralHistory1 {
    min-height: 65vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
</style>