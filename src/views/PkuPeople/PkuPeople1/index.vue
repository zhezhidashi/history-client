<template>
	<div class="Background PkuPeople1">
		<Search />
		<People />
	</div>
</template>

<script>
import Search from "@/views/PkuPeople/PkuPeople1/Search";
import People from "@/views/PkuPeople/PkuPeople1/People";
export default {
	name: "PkuPeople1",
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
.PkuPeople1 {
    min-height: 65vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
</style>