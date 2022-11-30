<template>
	<div class="Background Container">
		<div class="Heading">版权说明</div>
		<div class="Text">
			<div v-for="(item, index) in Paragraphs" :key="index">
				<div class="Paragraph">&emsp;&emsp;{{ item }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Copyright",
	data() {
		return {
			Paragraphs: [
                "1. 本网站所有资料，凡未经特殊注明的，版权均属北京大学外国语学院所有。转载或引用本网站内容必须是以教学、科学研究为使用目的的合理、善意引用，不得对本网站内容原意进行曲解、修改。引用时应注明“来源：北京大学外国语言文学学科史电子资源库”。",
                "2. 本网站仅限校内用户访问和使用。校内用户利用网站查询系统获得的条目和全文信息仅供本单位和个人教学、科研使用，未经北京大学外国语学院允许，不得擅自在校内外传播，违者责任自负。",
                "3. 本网站对于发布的所有自建的或与他人共同开发的信息内容和服务拥有全部知识产权；未经正式书面授权，任何单位和个人不得复制、仿造或镜像网站内容。任何未经授权的使用，无论是电子版或非电子版，无论全部或部分，均构成侵权。网站将依法追究其法律责任。",
                "4. 严禁任何个人或机构连续、系统、集中、批量地进行下载网站资源，更不能使用软件工具批量下载。",
                "5. 著作权人或相关权利人如有异议，请与我们接洽。"
            ],
		};
	},
};
</script>

<style scoped>
.Container {
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
.Paragraph {
	position: relative;
	font-size: 1.5vw;
	line-height: 200%;
}
</style>