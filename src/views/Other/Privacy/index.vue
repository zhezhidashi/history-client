<template>
	<div class="Background Container">
		<div class="Heading">网站隐私保护声明</div>
		<div class="Text">
			<div v-for="(item, index) in Paragraphs" :key="index">
				<div class="Paragraph">&emsp;&emsp;{{ item }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Privacy",
	data() {
		return {
			Paragraphs: [
				"本隐私保护声明适用于使用“北京大学外国语言文学学科史电子资源库”网站提供的各种服务的用户。我们尊重、保护用户的个人隐私，并郑重承诺，除非有法律或程序要求，否则未经用户授权我们不会公布与用户个人有关的资料。我们将定期检查隐私保护措施，切实保证用户个人资料隐私保护。",
				"用户使用本网站的“联系我们”栏目时，平台会需要用户提供姓名、联系方式等个人资料，这些资料均属于隐私保护范围，我们将对这些资料内容进行隐私保护。",
                "在以下几个例外情形下，将无法保证前述的承诺，而披露用户的相关信息。这些情形包括但不限于：",
                "1. 当用户在网站的行为违反了《计算机信息网络国际联网安全保护管理办法》《互联网信息服务管理办法》，或可能损害或妨碍其他网友的权益或导致他人遭受损害，披露用户的个人资料是为了辨识、联络或采取法律行动所必要的行动时。",
                "2. 法律法规所规定的必须披露或公开的个人信息。",
                "3. 当司法机关或其它授权机关依法执行公务，要求网站公开特定个人资料时。",
                "本网站具有全面的技术保护措施和安全维护机制来保证用户信息的内容，但由于不可抗力或者因计算机病毒感染、黑客攻击等特殊外力侵扰，导致用户信息破坏、泄密并受到损失的，本网站不承担任何法律责任。",
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