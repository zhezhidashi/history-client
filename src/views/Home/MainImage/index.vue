<template>
    <div>
        <div class="ImageContainer">
            <img class="MainImage" src="HomeMainImage.jpg" alt="MainImage" />
            <img class="Logo" src="HomeLogo.svg" alt="HomeLogo" />
            <div class="Title">北京大学外国语言文学学科史电子资源库</div>
            <div class="RedButton Login" @click="LogInOut()">{{ LogStatus }}</div>
            <div class="SearchContainer">
                <input class="SearchContentStyle SearchContentContainer" type="search" v-model="Keywords"
                    placeholder="搜索档案" />
                <div @click="GoToPage('MainSearch')" class="SearchLogoContainer" style="position: absolute;">
                    <img class="SearchLogo" src="SearchLogo.svg" alt="" />
                </div>
            </div>
            <!-- <div @click="GoToPage('Login')" class="UnderLine Login">登录</div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "MainImage",
    data() {
        return {
            Keywords: "",
            LogStatus: "",
        };
    },
    methods: {
        GoToPage(name) {
            this.$router.push({
                name,
                query: {
                    Keywords: this.Keywords
                }
            });
        },
        LogInOut() {
            if (this.LogStatus == "登录") {
                this.GoToPage('Login');
            } else {
                this.$store.commit('clearToken');
                this.LogStatus = "登出";
                location.reload();
            }
        },
    },
    mounted() {
        this.$store.commit('getToken')
        const TokenValue = this.$store.state.user.myToken;
        if (TokenValue != undefined) {
            this.LogStatus = "登出";
        } else {
            this.LogStatus = "登录";
        }
    },
};
</script>

<style scoped>
.ImageContainer {
    position: relative;
    width: 100vw;
    height: 45vw;
}

.MainImage {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
}

.Logo {
    position: absolute;
    z-index: 10;
    top: 1.5vw;
    left: 3vw;
    width: 7vw;
}

.Title {
    position: absolute;
    z-index: 10;
    top: 4vw;
    right: 5vw;
    font-weight: bold;
    font-size: 2.5vw;
    line-height: 100%;
    color: #ffffff;
}

.SearchContainer {
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 80vw;
    height: 4.5vw;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
}

.SearchContentContainer {
    position: absolute;
    width: 70vw;
    left: 2vw;
    top: 0;
    bottom: 0;
    margin: auto;
    color: white;
    opacity: 1;
    background: transparent;
}

::-webkit-input-placeholder {
    color: white;
}

.Login {
    position: absolute;
    z-index: 10;
    width: 10vw;
    height: 3vw;
    top: 8vw;
    right: 5vw;
}
</style>