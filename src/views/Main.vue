<template>
	<el-container>
		<el-header v-if="this.$route.meta.PageType === 1" class="Header" :height="this.$route.meta.PageType === 1 ? '11vh' : '0'">
			<common-header></common-header>
		</el-header>
		<el-main class="Main" :style="`top: ${this.$route.meta.PageType === 1 ? '11vh' : '0'}`">
			<router-view></router-view>
		</el-main>
		<el-footer class="Footer" height="18vh" :style="`top: ${this.$route.meta.PageType === 1 ? '11vh' : '0'}`">
			<common-footer></common-footer>
		</el-footer>
	</el-container>
</template>

<style scoped>
.Container {
	position: relative;
	width: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}

.Header {
	position: fixed;
	top: 0;
	z-index: 999;
	height: auto;
	width: 100%;
	background: #9B0000;
	border-radius: 0;
}
.Main {
    padding: 0;
	position: relative;
	width: 100%;
	height: auto;
}
.Footer {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #9B0000;
	width: 100%;
}

</style>

<script>
import CommonFooter from "../components/CommonFooter.vue";
import CommonHeader from "../components/CommonHeader.vue";

export default {
	name: "Main",
	components: {
		CommonFooter,
		CommonHeader,
	},
	data() {
		return {};
	},

	methods: {},
};

</script>
