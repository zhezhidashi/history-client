<template>
	<div class="Background PkuPeople3Container">
		<TabChoices :Tabs="Tabs" :TabsTotalPages="TabsTotalPages" :TabIndex="TabIndex" @ChangeTab="ChangeTabIndex(index)" />
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
						NameZH: "信件信函",
						NameEN: "Letters",
                        Index: 0,
					},
					{
						NameZH: "书稿",
						NameEN: "Books",
                        Index: 1,
					},
					{
						NameZH: "手稿",
						NameEN: "Manuscripts",
                        Index: 2,
					},
					{
						NameZH: "日记",
                        NameEN: "Diaries",
                        Index: 3,
					},
                    {
                        NameZH: "笔记",
                        NameEN: "Notes",
                        Index: 4,
                    },
				],
                [
                    {
                        NameZH: "公文",
                        NameEN: "OfficialDocuments",
                        Index: 5,
                    },
                    {
                        NameZH: "会议资料",
                        NameEN: "MeetingMaterials",
                        Index: 6,
                    },
                    {
                        NameZH: "出版合同",
                        NameEN: "PublishingContracts",
                        Index: 7,
                    },
                    {
                        NameZH: "其他",
                        NameEN: "Others",
                        Index: 8,
                    }
                ]
			],
            TabsTotalPages: 2,
            TabIndex: 0,
            // Contents[x][y].ItemID 是在数据库中的主键
			Contents: [
                [
                    {
                        Name: "季先生之女给季先生的信件",
                        ItemID: "",
                        Index: 0,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 1,
                    },
                    {
                        Name: "信件名字",
                        ItemID: "",
                        Index: 2,
                    },
                    {
                        Name: "信件名字",
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