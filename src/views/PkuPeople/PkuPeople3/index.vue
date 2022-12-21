<template>
	<div class="Background PkuPeople3Container">
		<TabChoices :Tabs="Tabs" :TabsTotalPages="TabsTotalPages" :TabIndex="TabIndex" :ContentStatus="ContentStatus" @ChangeTabIndex="ChangeTabIndex" @ChangeContentStatus="ChangeContentStatus"/>
		<Content :Contents="Contents" :People="People" :ContentTotalPages="ContentTotalPages" />
	</div>
</template>

<script>
import TabChoices from "./TabChoices";
import Content from "./Content";
export default {
	name: "PkuPeople3",
	components: {
		TabChoices,
		Content,
	},
	data() {
		return {
			Tabs: [
				[
					{
						Title: "信件信函",
					},
					{
						Title: "书稿",
					},
					{
						Title: "手稿",
					},
					{
						Title: "日记",
					},
					{
						Title: "笔记",
					},
					{
						Title: "公文",
					},
				],
				[
					{
						Title: "日记",
					},
					{
						Title: "笔记",
					},
					{
						Title: "公文",
					},
					{
						Title: "会议资料",
					},
					{
						Title: "出版合同",
					},
                    {
                        Title: "其他",
                    },
				],
			],
            // 页码
            TabIndex: 0,
            // 记录点击某个Tab后的状态
            ContentStatus: 0,

            // Contents[x][y].ItemID 是在数据库中的主键
			Contents: [
                [
                    {
                        Name: "季先生之女给季先生的信件",
                        ItemID: "",
                        Index: 0,
                    },
                    {
                        Name: "田宜超关于《大唐西域记校注》中两条注释的请教",
                        ItemID: "",
                        Index: 1,
                    },
                    {
                        Name: "蒙古专业学生隆纳北大学习成绩单办理事宜",
                        ItemID: "",
                        Index: 2,
                    },
                    {
                        Name: "中国青年艺术剧院谢白的致谢信",
                        ItemID: "",
                        Index: 3,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 4,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 5,
                    },
                    {
                        Name: "季先生之女给季先生的信件",
                        ItemID: "",
                        Index: 6,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 7,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 8,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 9,
                    },
                     {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 10,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 11,
                    },
                    {
                        Name: "季先生之女给季先生的信件",
                        ItemID: "",
                        Index: 12,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 13,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 14,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 15,
                    },
                ],
                [
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 16,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 17,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 18,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 19,
                    },
                ]
            ],
			People: "季羡林",
			ContentTotalPages: 2,
            
		};
	},
	methods: {
        ChangeTabIndex(index) {
            this.TabIndex = index;
        },
        ChangeContentStatus(index) {
            this.ContentStatus = index;
        },
    },
};
</script>

<style scoped>
.PkuPeople3Container {
	position: relative;
	width: 100vw;
	height: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>