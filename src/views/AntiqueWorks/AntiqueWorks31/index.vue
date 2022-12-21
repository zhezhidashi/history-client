<template>
	<div>
		<div class="AntiqueWorks31Container">
			<Images :ImageList="ImageList" :Title="Title" :TotalImage="TotalImage" />
			<Content :ContentInfo="ContentInfo" :Title="Title" />
		</div>
	</div>
</template>

<script>
import Images from "@/views/AntiqueWorks/AntiqueWorks31/Images";
import Content from "@/views/AntiqueWorks/AntiqueWorks31/Content";

export default {
	name: "AntiqueWorks31",
	components: {
		Images,
		Content,
	},
	data() {
		return {
			ImageList: [
                {
                    ImageUrl: "古籍详情01.jpg",
                    Index: 0,
                    ImageID: "0",
                },
                {
                    ImageUrl: "古籍详情02.jpg",
                    Index: 1,
                    ImageID: "1",
                },
                {
                    ImageUrl: "古籍详情03.jpg",
                    Index: 2,
                    ImageID: "2",
                },
                {
                    ImageUrl: "古籍详情04.jpg",
                    Index: 3,
                    ImageID: "3",
                },
            ],
			ContentInfo: [
				{
					NameZH: "主要责任人",
					NameEN: "People",
                    Value: "（清）冯鲁严撰"
				},
                {
					NameZH: "出版",
					NameEN: "Publish",
                    Value: "",
				},
				{
					NameZH: "版本类别",
					NameEN: "VersionType",
                    Value: "",
				},
				{
					NameZH: "外观形态",
					NameEN: "ExternalForm",
                    Value: "线装，外加硬皮重新装订，1册，26.8 x 15cm",
				},
                {
                    NameZH: "一般附注",
                    NameEN: "GeneralNote",
                    Value: "内夹页题：清嘉庆刊本",
                },
                {
                    NameZH: "主题词",
                    NameEN: "Subject",
                    Value: "笔记，史料，中国，清代",
                },
                {
                    NameZH: "四库类名",
                    NameEN: "FourLibrary",
                    Value: "史部，政书类，军政之属，边政",
                },
				{
					NameZH: "古籍语种",
					NameEN: "Language",
                    Value: "汉文",
				},
				{
					NameZH: "印章",
					NameEN: "Seal",
                    Value: "张礼千",
				},
				{
					NameZH: "分类号",
					NameEN: "TypeNumber",
                    Value: "",
				},
            ],
            Title: "粵東皇華集：第一卷",
            TotalImage: 8,

		};
	},
	methods: {},
};
</script>

<style scoped>
.AntiqueWorks31Container {
    position: relative;
	width: 100%;
	height: 80vw;
	display: flex;
    flex-direction: column;
	align-items: center;
    justify-content: space-evenly;
}
</style>