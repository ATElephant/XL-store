<template>
	<view>
		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom">
			<view class="flex-1 d-flex a-center j-center py-2" v-for="(item,index) in tabBars" :key="index" 
			:class="tabIndex === index ? 'tabactive' : ''" @tap="changeTab(index,item.nav)">
				{{item.name}}
			</view>
		</view>
		
		<!-- homeloading -->
		<home-load-list loadType="ball" loadPercent="50" v-if="homelist"></home-load-list>
		
		
		<!-- 加载子页 -->
		<load-list v-if="loadingChecked"></load-list>
		
		
         <!-- 订单列表 -->
		<view class="position-relative" style="min-height: 440rpx;" v-if="!loadingChecked">
			<!-- v-show="index === tabIndex" -->
			<template v-if="submitted.length >= 1">
				<!-- 已有单子 -->
				<block v-for="(item,index) in submitted" :key="index">
					<orderUnf :item="item" :index="index"></orderUnf>
				</block>
			</template>

			<template v-else>
				<no-thing icon="no_pay" msg="你还没有订单"></no-thing>
			</template>

		</view>
	</view>
</template>

<script>
	import noThing from "@/components/no-thing.vue"
	import orderUnf from "../../components/orderUnf.vue"
	import {
		getBaseData,
		getOrderData
	} from "../../common/cloundfun.js"
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			noThing,
			orderUnf
		},

		data() {
			return {
				homelist: true,
				loadingChecked: false,
				loader: true,
				load: false,
				tabBars: [],
				submitted: [],
				tabIndex: 0,
				pageid: 0,
			}
		},
		//上拉加载
		onReachBottom() {
			console.log('END')
			this.pageid++
			console.log(this.pageid)
			this.pullon()
		},
		methods: {
			// 切换选项卡
			changeTab(index, nav) {
				this.tabIndex = index
				//切换loading状态
				this.$store.commit('navMuta', this.loader)
				// dataBase
				getOrderData(nav)
					.then((res) => {
						console.log(res)
						//vuex
						this.$store.commit('updataMutations', res.data)
						this.$store.commit('navMuta', this.load)
					}).catch((err) => {
						console.log(err)
					})
			},
			//上拉加载
			pullon() {
				let submitted = 'submitted'
				getOrderData(submitted, this.pageid)
					.then((res) => {
						// this.submitted = res.data
						this.submitted = [...this.submitted, ...res.data]
						console.log(res)
					}).catch((err) => {
						console.log(err)
					})
			}
		},
		computed: {
			// ...mapState([ 'loading']),
			...mapState({
				orderList: state => state.orderlist.orderList,
				loading: state => state.orderlist.loading
			}),
			count() {
				this.submitted = this.orderList
			},
			//tab切换loading  
			countLoading() {
				this.loadingChecked = this.loading
			}

		},
		// 数据库交互
		created() {
			let tabBars = 'tabBars'
			let submitted = 'submitted'
			Promise.all([getBaseData(tabBars), getOrderData(submitted, this.pageid)]) //getBaseData(submitted)
				.then((res) => {
					this.tabBars = res[0].data
					this.submitted = res[1].data
					this.homelist = false
					console.log(res)
				}).catch((err) => {
					console.log(err)
				})
		}
	}
</script>

<style scoped>
	/* 顶部选项卡 选中颜色 */
	.tabactive {
		border-bottom: 5rpx solid #31E749;
		color: #31E749;
		margin-bottom: -5rpx;
	}


	.appointment-red {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: red;
	}
</style>
