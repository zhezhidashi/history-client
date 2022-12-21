<template>
	<div class="Background Container">
		<div class="WebPath">
			<div @click="GoToPage('OralHistory2')" style="cursor: pointer">
				口述档案
			</div>
			&ensp;>&ensp;
			<div>李明滨口述史</div>
		</div>
		<div class="VideoBlock">
			<div v-for="(item, index) in Videos" :key="index">
				<div class="ItemContainer">
					<video
                        class="VideoItem"
						controls="true"
						controlslist="nodownload"
					>
						<source :src="item.Content" :type="item.Type" />
					</video>

					<div class="InfoContainer">
						<div class="TimeLocation">
							访谈时间：{{ item.Time }} &emsp; 访谈地点：{{
								item.Location
							}}
						</div>
					</div>
					<div class="IntroContainer">
                        简介：
						<div
							v-for="(line, index) in item.Description"
							:key="index"
						>
							&emsp;&emsp;{{ line }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "OralHistory3",
	data() {
		return {
			Videos: [
				{
					Time: "2010年11月18日14:00",
					Location: "北京大学民主楼法语系会议室",
					Description: [
						"李明滨，1933年出生，侨眷，台湾台北人，北京大学俄罗斯学研究所所长、教授、博士生导师。1957年毕业于北京大学俄罗斯语言文学系，留校任教，先后晋升为副教授、教授、博士生导师。曾任副系主任、系主任兼研究所所长，师承著名文学翻译家曹靖华，曹主编《俄苏文学史》三卷本(1989年)时，其作为副主编，协助组织编撰和统稿。该书经国家教委审定为高校通用教材，其中第一卷《俄国文学史》1992年获国家级优秀教材特等奖(最高奖)。三卷共获全国高校外国文学优秀奖。",
						"主编《苏联当代文学概观》、合著《欧洲文学史》、《外国文学史》、《外国文学简编》、《20世纪欧美文学史》、《中外文学书目答问》等，前三种均获部级(国家教委)优秀教材奖。发表论俄苏文学文章120篇，翻译《陀思妥耶夫斯基夫人回忆录》、《回忆普希金》、《回忆契诃夫》、合译《诺贝尔文学奖获奖作家短篇小说选》三卷等。长期从事俄苏文学史教学，效果优良而获北大优秀教学奖，并从事中俄比较文学和苏联国情学的研究与教学，已出版专著《中国文学在俄苏》、《中国文化在俄罗斯》、《中俄文化交流志》，并主编专业教材《苏联概况》。",
						"其成就得到同行肯定，被推选为中俄(苏)比较文学研究会会长，普希金研究会会长。连续被国家教委聘任为高校外语专业教材编审委员会委员和教学指导委员会委员，以突出贡献获国务院“政府特殊津贴”和荣誉证书。曾赴莫斯科大学留学深造，多次应邀赴俄、乌、日等国家讲学访问，多篇论文被莫斯科大学报、日、加、西等国论文集收录，被誉为“中国最有声望的苏联学学者之一”(苏《新时代》杂志，1989)，于1995年获俄罗斯科学院远东研究所授予“荣誉博士”。其事迹被英国剑桥国际传记中心《世界名人录》(1989年)收录。",
					],
					Content: "李明滨访谈录音.mp3",
					Type: "audio/mpeg",
				},
			],
		};
	},
	methods: {
		GoToPage(name) {
			this.$router.push({ name });
		},
	},
};
</script>

<style scoped>
.Container {
	position: relative;
	height: 70vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* background: lightgreen; */
}
.WebPath {
	position: relative;
	font-size: 1.2vw;
	width: 50vw;
	line-height: 400%;
	display: flex;
}
.VideoBlock {
	position: relative;
	height: auto;
	width: 80vw;
	display: flex;
	flex-direction: column;
	/* justify-content: space-evenly; */
	align-items: center;
}
.VideoItem{
    position: relative;
    width: 50vw;
    height: 4.5vw;
    /* background: red; */
}
.ItemContainer {
	position: relative;
	width: 50vw;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	/* background: lightblue; */
}
.InfoContainer {
	position: relative;
	width: 100%;
    height: auto;
	display: flex;

	align-items: center;
	justify-content: flex-end;
}
.TimeLocation {
	position: relative;
	font-size: 1.2vw;
	line-height: 200%;
    
}
.IntroContainer {
	position: relative;
	width: 100%;
	height: auto;
	font-size: 1.2vw;
	line-height: 200%;
	/* background: lightgreen; */
}
</style>