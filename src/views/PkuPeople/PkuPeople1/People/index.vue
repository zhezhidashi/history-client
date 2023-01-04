<template>
	<div class="Container">
		<ul
			class="infinite-list"
			v-infinite-scroll="load"
			style="overflow: auto"
		>
			<li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
		</ul>
		<!-- <div
			class="PeopleBlockList infinite-list"
			v-infinite-scroll="load"
			style="overflow: auto"
		>
			<div v-for="(list_item, NowIndex) in People" :key="NowIndex">
				<div class="PeopleBlock infinite-list-item">
					<div v-for="(item, index) in People[NowIndex]" :key="index">
						<div
							class="Card PeopleContainer"
							@click="GoToPage('PkuPeople3')"
						>
							<div
								class="BackgroundImage PeopleImage"
								:style="`background-image:url(${item.Image})`"
							></div>
							<div class="PeopleTitle">{{ item.Title }}</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
export default {
	name: "Search",
	data() {
		return {
			People: [
				[
					{
						Title: "季羡林先生原始文献",
						Image: "季羡林.jpg",
						ID: "0",
					},
					{
						Title: "魏銈孙先生原始文献",
						Image: "魏銈孙.jpg",
						ID: "1",
					},
					{
						Title: "杨业治先生原始文献",
						Image: "杨业治.jpg",
						ID: "2",
					},
					{
						Title: "胡壮麟先生原始文献",
						Image: "胡壮麟.jpg",
						ID: "3",
					},
				],
			],
		};
	},
	methods: {
		GoToPage(name) {
			this.$router.push({ name });
		},
		load() {
			this.People.push(this.People[0]);
		},
	},
};
</script>

<style scoped>
.Container {
	width: 80vw;
	height: 35vw;
	/* background-color: lightblue; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
.PeopleBlockList {
	position: relative;
	width: 80vw;
	height: auto;
	background-color: lightpink;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.PeopleBlock {
	position: relative;
	width: 80vw;
	height: 25vw;
	margin-bottom: 5vw;
	/* background-color: lightcyan; */
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.PeopleContainer {
	position: relative;
	width: 17vw;
	height: 25vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

.PeopleImage {
	position: relative;
	width: 17vw;
	height: 20vw;
}

.PeopleTitle {
	position: relative;
	line-height: 5vw;
}
</style>