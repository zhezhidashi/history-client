<template>
    <div class="ImagesContainer">
        <div class="WebPath">
            <div @click="GoToPage('OralHistory1', {})" style="cursor: pointer">
                {{ WebPath[0] }}
            </div>
            &ensp;&gt;&ensp;
            <div @click="GoToPage('OralHistory2', {})" style="cursor: pointer">
                {{ WebPath[1] }}
            </div>
            &ensp;&gt;&ensp;
            <div @click="GoToPage('OralHistory3', {
                Path: Paths[0],
                TabIndex: TabIndex,
                PeopleName: WebPath[1],
                ContentStatus: ContentStatus,
            })
                " style="cursor: pointer">
                {{ WebPath[2] }}
            </div>
            &ensp;&gt;&ensp;
            <div>{{ WebPath[3] }}</div>
        </div>

        <div class="MediaContainer"
            :style="`height: ${Media.Type === 0 ? '10vw' : '40vw'}`"
        >

            <!-- 情况一：音频 -->
            <audio 
                v-if="Media.Type === 0"
                width="100%"
                controls="true"
                controlslist="nodownload"
                autoplay="false"
            >
                <source :src="Media.Url" type="audio/mp3" />
                <source :src="Media.Url" type="audio/mpeg" />
                <!-- <source src="horse.ogg" type="audio/ogg" /> -->
                Your browser does not support the audio element.
            </audio>

            <!-- 情况二：视频 -->
            <video 
                v-if="Media.Type === 1"
                width="100%"
                controls="true"
                controlslist="nodownload"
                autoplay="false"
            >
                <source :src="Media.Url" type="video/mp4" />
                <!-- <source src="movie.mp4" type="video/mp4" />
                <source src="movie.webm" type="video/webm" />
                <object data="movie.mp4" width="320" height="240">
                    <embed width="320" height="240" src="movie.swf" />
                </object> -->
                Your 
            </video>
            
            
        </div>

        <div class="DescriptionContainer">{{ Description }}</div>


        <div v-for="(item, index) in ContentInfo" :key="index">
			<div class="Item">
				<div class="ItemName">{{ item.NameZH }}：</div>
				<div class="ItemValue">{{ item.Value }}</div>
			</div>
		</div>

    </div>
</template>

<script>
export default {
    name: "Images",
    props: ["Media", "WebPath", "Description", "Paths", "TabIndex", "ContentStatus", "ContentInfo"],
    data() {
        return {

        };
    },
    methods: {
        GoToPage(name, query) {
            this.$router.push({ name, query });
        },

	},
};
</script>

<style scoped>
.ImagesContainer {
    position: relative;
    width: 80vw;
    min-height: 49vw;
    /* background-color: lightblue; */
}

.WebPath {
    position: relative;
    height: 3vw;
    font-size: 1.2vw;
    line-height: 300%;

    display: flex;
}

.MediaContainer {
    position: relative;
    width: 80vw;
    /* height: 40vw; */
    /* background-color: lightgreen; */
    display: flex;

    border-radius: 7px;
    /* border: 1px solid #9f9e9e; */
}



.DescriptionContainer {
    position: relative;
    width: 80vw;
    height: 6vw;
    font-size: 1.2vw;
    line-height: 200%;
    /* background-color: lightgreen; */
}
audio{
    margin-top: 3vw;
    width: 95%;
}

.Item{
    position: relative;
    display: flex;
    font-size: 1.2vw;
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