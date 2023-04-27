<template>
	<div class="ContentContainer">
		<div class="ItemPart">
			<div class="ItemBlock">
				<div v-for="(item, index) in Contents[NowIndex]" :key="index">
					<div
						class="LineLimit Item"
						@click="GoToPage('PkuPeople4', item)"
					>
						{{ item.Title }}
					</div>
				</div>
			</div>
			<div class="VerticalLine"></div>
			<div class="ItemBlock">
				<div
					v-for="(item, index) in Contents[NowIndex + 1]"
					:key="index"
				>
					<div
						class="LineLimit Item"
						@click="GoToPage('PkuPeople4', item)"
					>
						{{ item.Title }}
					</div>
				</div>
			</div>
		</div>
        <div class="ShiftContainer">
            <img @click="PageShift(-1)" class="ShiftLeft" src="ShiftLeft.svg" alt="" />
            <div class="ShiftPages">
                {{ NowIndex + 1 }} &emsp; / &emsp; {{ ContentTotalPages }}
            </div>
            <img @click="PageShift(1)" class="ShiftRight" src="ShiftRight.svg" alt="" />
        </div>
	</div>
</template>

<script>
export default {
	name: "Content",
	props: [
		"Contents",
		"People",
		"ContentTotalPages",
        "ParentPath",
		"TabPath",
		"TabIndex",
        "TabName", 
		"ContentStatus",
	],
	data() {
		return {
			NowIndex: 0,
		};
	},
	methods: {
		GoToPage(name, item) {
			this.$router.push({
				name: name,
				query: {
					TabIndex: this.TabIndex,
					ContentStatus: this.ContentStatus,
                    Path1: this.ParentPath,
					Path2: this.TabPath,
					Path3: item.Path,
                    PeopleName: this.People,
                    TabName: this.TabName,
                    LetterName: item.Title,
                    LetterTemplateID: item.TemplateID
				},
			});
		},
        PageShift(d) {
            this.NowIndex = (this.NowIndex + d + this.ContentTotalPages) % this.ContentTotalPages;
        }
	},
};
</script>

<style scoped>
.ContentContainer {
	position: relative;
    margin-right: 2vw;
	width: 75vw;
	height: 70vw;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
    align-items: center;
}
.ContentTitle {
	position: relative;
	width: 100%;
	height: 5vw;
	font-size: 2.5vw;
	font-weight: bold;
	line-height: 200%;
	color: #333333;
}
.ItemPart {
	position: relative;
	width: 75vw;
	height: 55vw;
	/* background-color: lightblue; */
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.ItemBlock {
	position: relative;
	width: 36vw;
	height: 55vw;
	/* background-color: lightgreen; */

	display: flex;
	flex-direction: column;
}
.VerticalLine {
	position: relative;
	width: 1px;
	height: 55vw;
	background-color: #9e9e9e;
}
.Item {
	position: relative;
	width: 100%;
	font-size: 1.5vw;
	line-height: 230%;
	cursor: pointer;

	-webkit-line-clamp: 1;
}
</style>