<template>
	<div class="Background FruitShareContainer">
		<div class="Heading" style="font-size: 2.5vw">成果分享</div>
		<div class="Text">
			<div class="Description">
				依托北京大学外国语言文学学科资源与平台，本栏目将集中展示北大外语人在学科史研究领域的学术成果。
			</div>
			<div v-for="(item, index) in Paragraphs" :key="index">
				<div style="display: flex">
					<div class="Paragraph" style="width: 0.5vw;">[</div>
                    <div class="Paragraph" style="width: 1.5vw; text-align: center;">{{ index + 1 }}</div>
                    <div class="Paragraph" style="width: 1vw;">]</div>
					<div class="Paragraph" id="Reference" @click="OpenNewPage(item.Url)">{{ item.Title }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "FruitShare",
	data() {
		return {
			Paragraphs: [
                {
                    Title: "陈明.中国东方语文学会旧史钩沈[J].中国文化，2022(55)173-189.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2022&filename=ZGWH202201017&uniplatform=NZKPT&v=OmdkxDINd0pw6IisScaBNHk4qEuF0CuFZsqfBqoSbeyMs-HoL_oiqi8JIm0W3L5g",
                },
                {
                    Title: "陈明.海维谅：北大东方语文学系一位从未到岗的波斯语教授[J].国际汉学研究通讯.2022(23-24):237-262.",
                    Url: "",
                },
                {
                    Title: "陈明.藏学家于道泉与王森入聘北京大学始末[J].中央民族大学学报(哲学社会科学版),2021,48(06):16-29.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2021&filename=ZYMD202106002&uniplatform=NZKPT&v=tB7UO03xq00ini51nqEktNZHO5bkJLMj5J_hGAdjnNC-IRJL3Pxgwry-97HzJjgx",
                },
                {
                    Title: "陈明.中国早期东方学学术史中的佚闻建构与事实还原——以陈寅恪“卖书买煤”为例[J].清华大学学报(哲学社会科学版),2021,36(01):15-29+202.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2021&filename=QHDZ202101003&uniplatform=NZKPT&v=NrO6oqe8LSC0fFDUp5AGUi16EBR7AlydYti_MjCE-Wu3UPINqr9OVdWgn34aTsz9",
                },
				{
                    Title: "陈明.北京大学东方语文学系初创期的人事问题[J].中国文化,2021(54):192-208.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2021&filename=ZGWH202102018&uniplatform=NZKPT&v=9VFyihJkVFV-5XybIuukpO7GEaC1EKvSHjKAm4FAAJNk7VM0ACkOWdBjVHjg_zZT",
                },
				{
                    Title: "王邦维.北京大学档案与聘请季羡林任教的时间问题[J].北京大学学报(哲学社会科学版),2018,55(06):116-119.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2019&filename=BDZK201806014&uniplatform=NZKPT&v=TRZjwlc4J1LK6NZJOqe9QQs0BGxMOpXdka02LQztNtkkUgeTYIuL1CiDROrccQCZ",
                },
                {
                    Title: "王邦维.怀念赵朴老兼谈朴老与佛教文化的研究[J].佛学研究,2017(02):50-55.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2018&filename=FXYJ201702007&uniplatform=NZKPT&v=YuKjiNsj2nepXAmR_FDI5SBgQ3MyiU4Y3Cos5yxlIqfwGxIlZqM8Knzf0HDYCZTe",
                },
				{
                    Title: "王邦维.梵学、印度学、东方学与中国文化研究——季羡林先生的治学范围和路径[J].中国文化研究,2010(01):18-24.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFD2010&filename=ZWHY201001004&uniplatform=NZKPT&v=MYl5abGvs8hv9Np8f1hsLAohLgMDN7laaMTj8i2XD-1SN1Q1YO7RRwm94caCNbmx",
                },
                {
                    Title: "王邦维.我们怎么研究东方文学——缅怀季羡林先生时的感想[J].国外文学,2009,29(04):6-10.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFD2009&filename=WAIX200904002&uniplatform=NZKPT&v=57rxCLf5nmt-tTrOOk6FbCbkv2fbzssDvu5-OeHyUL8PlZf2ymBZGcHNbJYEVN0I",
                },
                {
                    Title: "王邦维.季羡林的学术成就与中国的东方研究[J].作家,2009(18):1-2.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFDN0911&filename=ZUOJ200918001&uniplatform=NZKPT&v=swQzOEFsTUc1rwGruNM3OyjbxDV_krev2dcHjPLQg2Kzk07UXZN8Gf_61wCNmVgJ",
                },
                {
                    Title: "王邦维.季羡林先生与中华书局和《文史知识》[J].文史知识,2009(09):88-92.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFDN0911&filename=WSZS200909016&uniplatform=NZKPT&v=TCD91ocgL0moWlWc81xo9FMdiCOtTUAo6W47dZzETYkgyZrq8XHQb7L1n8T5LSPn",
                },
				{
                    Title: "王邦维.北京大学的印度学研究:八十年的回顾[J].北京大学学报(哲学社会科学版),1998(02):100-106.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFD9899&filename=BDZK802.010&uniplatform=NZKPT&v=PZ17HbKDCbYFRj821ByodUq77nRALArHS_fsf2ud3WjGVlL9JofGeER9qIBtprFP",
                },
                {
                    Title: "王邦维.学问在中西之间──季羡林先生对中印文化的研究[J].东方论坛.青岛大学学报,1994(02):7-12.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFD9495&filename=DFLT402.001&uniplatform=NZKPT&v=v9VJV7fOOyP-O1S5UErEsslIeEybIF0Cx9HrjNp88s7STpnWVmBNDfRd6NEb2en6",
                },
                {
                    Title: "王邦维.“预流”和“拿来”——季羡林教授谈治学和中外文化交流[J].群言,1992(08):18-22.",
                    Url: "https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CJFD&dbname=CJFD9093&filename=QYYT199208010&uniplatform=NZKPT&v=h5fMdOmgTaDVtR-DsJyIntzftcPeg61UyiSw61Ne7Xdc2fh45yh0h0LtzbF_-Njb",
                },

			],
		};
	},
    methods: {
        OpenNewPage(url){
            window.open(url, "_blank");
        },
    },
};
</script>

<style scoped>
.FruitShareContainer {
	position: relative;
	height: 80vw;
	display: block;
}
.Text {
	position: relative;
	width: 80vw;
	top: 15vw;
	left: 0;
	right: 0;
	margin: auto;
	display: flex;
	flex-direction: column;
}
.Description {
	font-size: 1.6vw;
	line-height: 300%;
}
.Paragraph {
	position: relative;
	font-size: 1.5vw;
	line-height: 200%;
}
/* 引用文献 */
#Reference {
    width: 77vw;
    cursor: pointer;
}
#Reference:hover {
    color: #337ab7;
}
</style>