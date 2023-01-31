<template>
	<div class="Container">
		<div class="PeopleBlock">
			<div v-for="(item, index) in People[NowIndex]" :key="index">
				<div
					class="Card PeopleContainer"
					@click="GoToPage('PkuPeople3')"
				>
					<div
						class="BackgroundImage PeopleImage"
						:style="`background-image:url(${item.Image})`"
					></div>
					<div class="PeopleTitle">{{ item.Title }}</div>
				</div>
			</div>
		</div>
		<div class="ShiftContainer">
			<img
				@click="ImageShift(-1)"
				class="ShiftLeft"
				src="ShiftLeft.svg"
				alt=""
			/>
			<div class="ShiftPages">
				{{ NowIndex + 1 }} &emsp; / &emsp; {{ TotalPages }}
			</div>
			<img
				@click="ImageShift(1)"
				class="ShiftRight"
				src="ShiftRight.svg"
				alt=""
			/>
		</div>
	</div>
</template>

<script>
import { throttle } from "lodash";
import { postForm, getForm } from "@/api/data";
export default {
	name: "Search",
	data() {
		return {
			TotalPages: 1,
			NowIndex: 0,
			People: [
				// [
				// 	{
				// 		Title: "季羡林先生原始文献",
				// 		Image: "季羡林.jpg",
				// 		Path: "0",
				// 	},
				// ],
			],
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

		GoToPage(name) {
			this.$router.push({ name });
		},
	},
	mounted() {
        let _this = this;
		// 首先查询 archive，获得其模版；
		let DataForm = {
			path: "root/archives",
		};
		postForm("/data/node", DataForm, function (res) {
			let ParentTemplate = res.data.template_id;

			//然后根据模版查询子模板
			getForm(`/template/one?main_id=${ParentTemplate}`, function (res) {
				let ChildrenTemplateID = res.data.children_template_limit;

				//最后根据子模板查询 archive 下的数据
				for (let ChildID of ChildrenTemplateID) {
					let DataForm = {
						location_id: 99999999,
						page_index: 1,
						page_size: 15,
						sort_by: "-show_time",
						path: "root/archives",
						deep_range: 0,
						filter_rule: {},
						order_rule: {
							method: "show_time",
							order: "+",
						},
						template_id: ChildID,
					};
					postForm(`/data/list`, DataForm, function (res) {
						let List = res.data.list;
                        
                        _this.TotalPages = Math.ceil(List.length / 4);
                        _this.People = [];
                        let j = 0;
                        for (let i = 0; i < _this.TotalPages; i++) {
                            _this.People.push([]);
                            for(; j < List.length && j < (i + 1) * 4; j++) {
                                _this.People[i].push({
                                    Title: List[j].content.attr0,
                                    Image: List[j].content.attr1,
                                    Path: List[j].path,
                                });
                            }
                        }
					});
				}
			});
		});
	},
};
</script>

<style scoped>
.Container {
	width: 80vw;
	height: 35vw;
	/* background-color: lightblue; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.PeopleBlock {
	position: relative;
	width: 80vw;
	height: 25vw;
	/* background-color: lightcyan; */
	display: flex;
	flex-direction: row;
	align-items: center;
	/* justify-content: space-between; */
}

.PeopleContainer {
	position: relative;
	width: 17vw;
	height: 25vw;
    margin: 0 1.5vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

.PeopleImage {
	position: relative;
	width: 17vw;
	height: 20vw;
}

.PeopleTitle {
	position: relative;
	line-height: 5vw;
}
</style>