<template>
	<div class="ContentContainer">
        <div class="ChoiceContainer">
            <!-- 精选古籍和查看全部 -->
            <div class="TextBlock">
                <div>精选古籍</div>
                <div class="SeeAll">查看全部</div>
            </div>
            <!-- 图片列表 -->
            <div class="ImageBlock"></div>
        </div>
        <div class="ChoiceContainer">
            <!-- 精选特藏和查看全部 -->
            <div class="TextBlock">
                <div>精选古籍</div>
                <div class="SeeAll">查看全部</div>
            </div>
            <!-- 图片列表 -->
            <div class="ImageBlock"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Content',
    data(){
        return {

        }
    },
    methods: {
        
    }
};
</script>

<style scoped>
.ContentContainer{
    position: relative;
    width: 80vw;
    height: 50vw;
    /* background-color: lightblue; */
}
.ChoiceContainer{
    position: relative;
    width: 80vw;
    height: 25vw;
}
.TextBlock{
    position: relative;
    width: 80vw;
    height: 3vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5vw;
    /* background-color: lightpink; */
}
.SeeAll{
    padding-bottom: 0.1vw;
    border-bottom: 0.1vw solid #9B0000;
    color: #9B0000;
    cursor: pointer;
}

</style>