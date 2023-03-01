<template>
	<div class="Container">
		<div class="PeopleBlock">
			<div v-for="(item, index) in People[NowIndex]" :key="index">
				<div
					class="Card PeopleContainer"
					@click="GoToPage('PkuPeople3', item)"
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
import { postForm, getForm, GetType, MergeItem, MatchName } from "@/api/data";
export default {
	name: "Search",
	data() {
		return {
			TotalPages: 0,
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

		GoToPage(name, item) {
			this.$router.push({
				name: name,
				query: {
					Path: item.Path,
					TabIndex: 0,
					ContentStatus: 0,
				},
			});
		},
	},
	mounted() {
		let _this = this;
		// 首先查询 archive，获得其模版；
		let DataForm = {
			path: "root/archives",
		};
		postForm("/data/node", DataForm, _this, function (res) {
			let ArchiveTemplateID = res.data.template_id;

			//然后查询 People 模板ID
			getForm(
				`/template/one?main_id=${ArchiveTemplateID}`,
				_this,
				function (res) {
					let PeopleTemplateID = res.data.children_template_limit[0];

					// 查询 People 所在 Path
					let DataForm = {
						location_id: 99999999,
						page_index: 1,
						page_size: 99999,
						sort_by: "-show_time",
						path: "root/archives",
						deep_range: 0,
						filter_rule: {},
						order_rule: {
							method: "show_time",
							order: "+",
						},
						template_id: PeopleTemplateID,
					};

					postForm("/data/list", DataForm, _this, function (res) {
						for (
							let PeopleIndex = 0;
							PeopleIndex < res.data.list.length;
							PeopleIndex++
						) {
							let PeoplePath = res.data.list[PeopleIndex].path;

							// 查询 People 拥有的字段的模板
							getForm(
								`/template/one?main_id=${PeopleTemplateID}`,
								_this,
								function (res) {
									// filed 意为字段
									let FiledTemplateID =
										res.data.children_template_limit;

									let ItemForm = {
										Path: PeoplePath,
										Title: "",
										Image: "",
									};

									// 查询每个字段模板信息，如模板名字
									for (
										let i = 0;
										i < FiledTemplateID.length;
										i++
									) {
										let FiledID = FiledTemplateID[i];
										getForm(
											`/template/one?main_id=${FiledID}`,
											_this,
											function (res) {
												let FiledName = res.data.name;

												// 查询当前字段所在数据
												let DataForm = {
													location_id: 99999999,
													page_index: 1,
													page_size: 99999,
													sort_by: "-show_time",
													path: PeoplePath,
													deep_range: 0,
													filter_rule: {},
													order_rule: {
														method: "show_time",
														order: "+",
													},
													template_id: FiledID,
												};
												postForm(
													`/data/list`,
													DataForm,
													_this,
													function (res) {
														let item =
															res.data.list[0];
														for (let key in item.content) {
															if (
																GetType(key) !==
																"name"
															) {
																if (
																	MatchName(
																		FiledName,
																		"图片"
																	)
																) {
																	ItemForm.Image =
																		item.content[
																			key
																		];
																} else if (
																	MatchName(
																		FiledName,
																		"标题"
																	)
																) {
																	ItemForm.Title =
																		item.content[
																			key
																		];
																}
															}
														}

														if (
															i + 1 ===
															FiledTemplateID.length
														) {
															_this.TotalPages =
																MergeItem(
																	ItemForm,
																	_this.People,
																	_this.TotalPages,
																	4
																);
														}
													}
												);
											}
										);
									}
								}
							);
						}
					});
				}
			);
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