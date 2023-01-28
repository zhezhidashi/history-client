<template>
	<div class="Container">
        <div class="PeopleBlock">
            <div v-for="(item, index) in People[NowIndex]" :key="index">
                <div class="Card PeopleContainer" @click="GoToPage('PkuPeople3')">
                    <div class="BackgroundImage PeopleImage" :style="`background-image:url(${item.Image})`">
                    </div>
                    <div class="PeopleTitle">{{item.Title}}</div>
                </div>
            </div>
        </div>
        <div class="ShiftContainer">
            <img @click="ImageShift(-1)" class="ShiftLeft" src="ShiftLeft.svg" alt="">
            <div class="ShiftPages">{{NowIndex + 1}} &emsp; / &emsp; {{TotalPages}}</div>
            <img @click="ImageShift(1)" class="ShiftRight" src="ShiftRight.svg" alt="">
        </div>
    </div>
</template>

<script>
import { throttle } from "lodash";
export default {
	name: "Search",
	data() {
		return {
            TotalPages: 1,
            NowIndex: 0,
            People: [
                [
                    {
                        Title: '季羡林先生原始文献',
                        Image: '季羡林.jpg',
                        ID: '0',
                    },
                    {
                        Title: '魏銈孙先生原始文献',
                        Image: '魏銈孙.jpg',
                        ID: '1',
                    },
                    {
                        Title: '杨业治先生原始文献',
                        Image: '杨业治.jpg',
                        ID: '2',
                    },
                    {
                        Title: '胡壮麟先生原始文献',
                        Image: '胡壮麟.jpg',
                        ID: '3',
                    }
                ],
            ]
        };
	},
    methods: {
        // 人物图片按钮切换
		ImageShift: throttle(function (d) {
			let Images = document.querySelectorAll(".PeopleImage");
			let Titles = document.querySelectorAll(".PeopleTitle");

			let Len = Images.length;
			let ImageFadeTimer = setInterval(ImageFade, 7);
			let opa = 100;
			let _this = this;
			function ImageFade() {
				if (opa > 0) {
					for (let i = 0; i < Len; i++) {
						Images[i].style.opacity = String(opa / 100);
						Titles[i].style.opacity = String(opa / 100);
					}
				} else if (opa === 0) {
					_this.NowIndex =
						(_this.NowIndex + d + _this.TotalPages) %
						_this.TotalPages;
				} else if (opa > -100) {
					for (let i = 0; i < Len; i++) {
						Images[i].style.opacity = String(-opa / 100);
						Titles[i].style.opacity = String(-opa / 100);
					}
				} else {
					clearInterval(ImageFadeTimer);
				}
				opa--;
			}
		}, 2000),

        GoToPage(name){
            this.$router.push({ name });
        },
    },
};
</script>

<style scoped>
.Container{
    width: 80vw;
    height: 35vw;
    /* background-color: lightblue; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.PeopleBlock{
    position: relative;
    width: 80vw;
    height: 25vw;
    /* background-color: lightcyan; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.PeopleContainer{
    position: relative;
    width: 17vw;
    height: 25vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.PeopleImage{
    position: relative;
    width: 17vw;
    height: 20vw;
}

.PeopleTitle{
    position: relative;
    line-height: 5vw;
}


</style>