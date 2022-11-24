<template>
	<div class="Background AntiqueWorks">
        <Search />
        <Content />
    </div>
</template>

<script>
import Search from '@/views/AntiqueWorks/AntiqueWorks12/Search'
import Content from '@/views/AntiqueWorks/AntiqueWorks12/Content'
export default {
    name: 'AntiqueWorks12',
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
.AntiqueWorks {
    position: relative;

    height: 70vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
</style>