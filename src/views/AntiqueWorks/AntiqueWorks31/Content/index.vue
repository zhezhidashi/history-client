<template>
	<div class="ContentContainer">
		<div class="Title">{{ Title }}</div>
		<div v-for="(item, index) in ContentInfo" :key="index">
			<div class="Item">
				<div class="ItemName">{{ item.NameZH }}：</div>
				<div class="ItemValue">{{ item.Value }}</div>
			</div>
		</div>
        <el-button @click="downloadPDF">下载PDF</el-button>
	</div>
</template>

<script>
import { getMediaUrl } from "@/api/data"
export default {
	name: "Content",
	props: ["ContentInfo", "Title", "PDFUrl"],
	data() {
		return {};
	},
	methods: {
        // 下载PDF
        downloadPDF() {
            if(this.PDFUrl == null || this.PDFUrl == "" || this.PDFUrl == undefined){
                this.$message({
                    message: "暂无PDF",
                    type: "warning",
                });
            }
            else {
                window.open(getMediaUrl(this.PDFUrl))
            }
        },
    },
};
</script>

<style scoped>
.ContentContainer {
	position: relative;
	width: 80vw;
	height: 35vw;
	/* background-color: lightcoral; */
}
.Title{
    position: relative;
    font-size: 1.8vw;
    font-weight: bold;
    height: 5.4vw;
    line-height: 300%;
}
.Item{
    position: relative;
    display: flex;
    font-size: 1vw;
    height: 2vw;
    line-height: 200%;
}
.ItemName{
    position: relative;
    color: rgb(0, 0, 0, 0.6);
}
.ItemValue{
    position: relative;
}
</style>