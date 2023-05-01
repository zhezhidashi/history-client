<template>
	<div class="Background Events">
        <Search />
        <Content />
    </div>
</template>

<script>
import Search from '@/views/Events/Events12/Search'
import Content from '@/views/Events/Events12/Content'
export default {
    name: 'Events12',
    components: {
        Search,
        Content
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped>
.Events {
    position: relative;

    height: 70vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
</style>