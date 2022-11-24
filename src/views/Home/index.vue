<template>
	<div class="Background">
		<MainImage />
        <Choices />
	</div>
</template>

<script>
import MainImage from "@/views/Home/MainImage";
import Choices from "@/views/Home/Choices";
export default {
	name: "Home",
    components: {
        MainImage,
        Choices
    },
	data() {
		return {};
	},
};
</script>

<style scoped>
</style>