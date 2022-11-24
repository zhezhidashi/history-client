<template>
	<div class="Background AntiqueWorks">
        <Search />
        <Content />
    </div>
</template>

<script>
import Search from '@/views/AntiqueWorks/AntiqueWorks11/Search'
import Content from '@/views/AntiqueWorks/AntiqueWorks11/Content'
export default {
    name: 'AntiqueWorks11',
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
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
</style>