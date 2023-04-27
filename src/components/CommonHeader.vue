<template>
	<div class="Navigation">
		<img class="NavigationLogo" src="logo.svg" @click="GoHome" />
        <div class="UnderLine Login" @click="LogInOut()">{{ LogStatus }}</div>
		<div class="UnderLine GoHome" @click="GoHome">返回首页</div>
	</div>
</template>

<script>
export default {
	name: "CommonHeader",
	data() {
		return {
            LogStatus: "",
        };
	},
	methods: {
		GoHome() {
			this.$router.push({ name: "Home" });
		},
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
        }
	},
    mounted() {
        this.$store.commit('getToken')
        const TokenValue = this.$store.state.user.token;
        if (TokenValue != undefined) {
            this.LogStatus = "登出";
        } else {
            this.LogStatus = "登录";
        }
    }
};
</script>

<style scoped>
/*导航栏蓝色背景*/
.Navigation {
	position: relative;
	width: 100%;
	height: inherit;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.NavigationLogo {
	position: relative;
	margin-left: 3vw;
	width: 38vw;
	min-width: 250px;
	cursor: pointer;
}
.GoHome {
	position: relative;
	margin-right: 3vw;
	cursor: pointer;
	font-size: 1.5vw;
	line-height: 100%;
	color: #ffffff;
}

.Login {
    position: relative;
	margin-right: 2vw;
	cursor: pointer;
	font-size: 1.5vw;
	line-height: 100%;
    left: 20vw;
	color: #ffffff;
    /* font-weight: bold; */
}
</style>
