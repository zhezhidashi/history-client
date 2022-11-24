<template>
	<div>
		<div class="TabBlock">
			<div class="TabContainer">
				<div v-for="(item, index) in Tabs" :key="index">
					<div @click="GoToPage(item.name)" class="Tab HoverTab" :style="index === -1 ? 'background: white; border-bottom: 0.2vw solid #9B0000; border-top: 0.2vw solid #ffffff;': ''">
						{{ item.title }}
					</div>
				</div>
			</div>
		</div>
        <div class="ChoicesBlock">
            <div class="ChoicesContainer">
                <div v-for="(item, index) in Choices" :key="index">
                    <div @click="GoToPage(item.name)" class="Choice">
                        <div class="BackgroundImage ImageContainer" :style="`background-image:url(${item.image})`"></div>
                        <div class="ChoiceTitle">{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
	name: "Choices",
	data() {
		return {
			Tabs: [
				{
					title: "成果分享",
					name: "Home",
					path: "/Home",
				},
				{
					title: "史料展示",
					name: "PkuPeople1",
					path: "/PkuPeople1",
				},
				{
					title: "网站简介",
					name: "WebIntroduction",
					path: "/WebIntroduction",
				},
				{
					title: "特别鸣谢",
					name: "Thanks",
					path: "/Thanks",
				},
			],
            Choices: [
                {
                    title: "北大外语人",
                    name: "PkuPeople1",
                    path: "/PkuPeople1",
                    image: "HomeImage1.jpg",
                },
                {
                    title: "红楼/燕园足迹",
                    name: "",
                    path: "",
                    image: "HomeImage2.jpg",
                },
                {
                    title: "口述档案",
                    name: "OralHistory1",
                    path: "/OralHistory1",
                    image: "HomeImage3.jpg",
                },
                {
                    title: "古籍特藏",
                    name: "AntiqueWorks11",
                    path: "/AntiqueWorks11",
                    image: "HomeImage4.jpg",
                }
            ],
		};
	},
    methods: {
        GoToPage(name) {
            this.$router.push({name});
        },
    },
};
</script>

<style scoped>
.TabBlock {
	position: relative;
	width: 100vw;
	height: 6vw;
	background: #e3e3e3;
	display: flex;
	justify-content: center;
}
.TabContainer {
	position: relative;
	width: 80vw;
	height: 6vw;
	display: flex;
	justify-content: center;
}
.Tab {
	position: relative;
    box-sizing: border-box;
	width: 20vw;
	height: 6vw;
	cursor: pointer;
    font-size: 1.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; */
}
.ChoicesBlock{
    position: relative;
    width: 100vw;
    height: 70vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ChoicesContainer{
    position: relative;
    width: 80vw;
    height: 60vw;
    display: flex;
    flex-wrap: wrap;
    /* background: lightblue; */
}

/* 这里不用 base.css 中 Card 属性的原因是，背景颜色 hover 上去之后无法变化，只有使用属性默认值，才能用 base.css 里面的 hover 修改属性值 */
.Choice{
    position: relative;
    width: 35vw;
    height: 25vw;
    margin: 2.5vw;
    background-color: #E3E3E3;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5vw;
    cursor: pointer;

    /* 需要参与过渡的属性 */
    transition-property: background-color, color;
    /* 过渡动画的持续时间 */
    transition-duration: 0.5s;
}
.Choice:hover{
    background-color: #9B0000;
    color: white;
}

.ImageContainer{
    position: relative;
    width: 35vw;
    height: 20vw;
}
.ChoiceTitle{
    position: relative;
    width: 35vw;
    height: 5vw;
    font-size: 1.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>