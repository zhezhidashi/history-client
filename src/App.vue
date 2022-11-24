<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "App",
	components: {},
};
</script>

<style>
#app {
	height: 100vh;
}
html,
body {
	margin: 0;
	padding: 0;
    /* background: #efefef; */
}
</style>
