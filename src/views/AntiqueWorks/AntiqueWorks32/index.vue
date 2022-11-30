<template>
	<div>
		<div class="AntiqueWorks32Container">
			<Images :ImageList="ImageList" :Title="Title" :TotalImage="TotalImage" />
			<Content :ContentInfo="ContentInfo" :Title="Title" />
		</div>
	</div>
</template>

<script>
import Images from "@/views/AntiqueWorks/AntiqueWorks32/Images";
import Content from "@/views/AntiqueWorks/AntiqueWorks32/Content";

export default {
	name: "AntiqueWorks32",
	components: {
		Images,
		Content,
	},
	data() {
		return {
			ImageList: [
                {
                    ImageUrl: "AntiqueImage1.jpg",
                    Index: 0,
                    ImageID: "0",
                },
                {
                    ImageUrl: "AntiqueImage2.jpg",
                    Index: 1,
                    ImageID: "1",
                },
                {
                    ImageUrl: "AntiqueImage3.jpg",
                    Index: 2,
                    ImageID: "2",
                },
                {
                    ImageUrl: "AntiqueImage4.jpg",
                    Index: 3,
                    ImageID: "3",
                },
                {
                    ImageUrl: "AntiqueImage1.jpg",
                    Index: 4,
                    ImageID: "4",
                },
                {
                    ImageUrl: "AntiqueImage2.jpg",
                    Index: 5,
                    ImageID: "5",
                },
                {
                    ImageUrl: "AntiqueImage3.jpg",
                    Index: 6,
                    ImageID: "6",
                },
                {
                    ImageUrl: "AntiqueImage4.jpg",
                    Index: 7,
                    ImageID: "7",
                },
            ],
			ContentInfo: [
				{
                    NameEN: "Time",
                    NameZH: "出版时间",
                    Value: "清光绪七至八年（1881-1882）"
                },
                {
                    NameEN: "People",
                    NameZH: "主要责任人",
                    Value: "李调元",
                },
                {
                    NameEN: "VersionType",
                    NameZH: "版本类别",
                    Value: "刻本",
                },
                {
                    NameEN: "ExternalForm",
                    NameZH: "外观形态",
                    Value: "线装2册",
                },
                {
                    NameEN: "古籍语种",
                    NameZH: "Language",
                    Value: "汉文",
                },
                {
                    NameEN: "Seal",
                    NameZH: "印章",
                    Value: "张礼千",
                },
                {
                    NameEN: "TypeNumber",
                    NameZH: "分类号",
                    Value: "K254.9",
                },
                {
                    NameEN: "Source",
                    NameZH: "来源",
                    Value: "张礼千赠书"
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
.AntiqueWorks32Container {
    position: relative;
	width: 100%;
	height: 80vw;
	display: flex;
    flex-direction: column;
	align-items: center;
    justify-content: space-evenly;
}
</style>