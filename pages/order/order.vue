<template>
	<view>
		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom">
			<view class="flex-1 d-flex a-center j-center py-2" v-for="(item,index) in tabBars" :key="index"
				:class="tabIndex === index ? 'tabactive' : ''" @tap="changeTab(index,item.nav)">
				{{item.name}}
			</view>
		</view>

		<!-- homeLoading -->
		<home-load-list loadType="ball" loadPercent="50" v-if="homelist"></home-load-list>

		<!-- 子页加载 图标 -->
		<load-list v-if="loadingChecked"></load-list>

		<!-- list -->
		<view class="position-relative" style="min-height: 440rpx;" v-if="!loadingChecked">
			<!-- 已有单子 -->
			<template v-if="order.length >= 1">
				<block v-for="(item,index) in order" :key="index">
					<orderUnf :item="item" :index="index"></orderUnf>
				</block>
			</template>
			<!-- 没有单子 -->
			<template v-else>
				<no-thing icon="no_pay" msg="你还没有订单"></no-thing>
			</template>
		</view>

	</view>
</template>

<script>
	import noThing from "@/components/no-thing.vue"
	import orderUnf from "../../components/orderUnf.vue"
	import {getBaseData,whereOrderData,whereFinishOrderData} from "../../common/cloundfun.js"
	import {mapState} from 'vuex'
	
	// 判断是否登录
	var db = wx.cloud.database()
	var user = db.collection('user')
	
	export default {
		components: {
			noThing,
			orderUnf
		},
		data() {
			return {
				loader: true,
				load: false,
				// 页面加载
				homelist: true,
				// 选项卡
				tabBars: [],
				tabIndex: 0,
				// list
				order: [],
				loadingChecked: false,
				pageid: 0,
				openId:''

			}
		},
		computed: {
			...mapState({
				orderList: state => state.orderlist.orderList,
				loading: state => state.orderlist.loading,
			}),
			count() {
				this.order = this.orderList
			},
			//tab切换loading
			countLoading() {
				this.loadingChecked = this.loading
			}
		},
		// 判断用户是否登录
		onShow() {
			//请求数据库查看用户是否登录
			this.ifUser()
			
			
		},
		methods: {
			//页面跳转自动刷新
			refresh(){
				let order = 'order'
				 whereOrderData(order)
				 .then((res) => {
				 	this.order = res.data
				 	this.homelist = false
				 	console.log(res)
				 }).catch((err) => {
				 	console.log(err)
				 })
			},
			
			
			//请求数据库查看用户是否登录
			ifUser() {
				user.get()
					.then((res) => {
						if (res.data.length === 0) {
							this.order=''
							//没登录
							uni.showModal({
								title: '点击登录',
								content: '',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										uni.switchTab({
											url: '../setting/setting'
										})
									}
								}
							});
						} else {
							this.openId = res.data[0]._openid
							this.$store.commit('addUserId', this.openId)
							this.refresh()
							this.homelist = false
						}
					}).catch((err) => {
						console.log(err)
					})

			},
			// 切换选项卡
			changeTab(index, nav) {
				this.tabIndex = index

				//切换loading状态
				this.$store.commit('navMuta', this.loader)

				if (nav === "finish") {
					// 切换到已完成
					whereFinishOrderData('order')
						.then((res) => {
							console.log(res.data)
							this.pageid = 0
							//vuex
							this.order = res.data
							// 重置子页加载为false
							this.$store.commit('navMuta', this.load)
						}).catch((err) => {
							console.log(err)
						})
				}
				if (nav === "submitted") {
					// 切换到已接单
					whereOrderData('order')
						.then((res) => {
							this.pageid = 0
							console.log(res.data)
							//vuex
							this.order = res.data
							// 重置子页加载为false
							this.$store.commit('navMuta', this.load)
						}).catch((err) => {
							console.log(err)
						})
				}
			},
			//上拉加载
			pullon() {
				let order = 'order'
				whereOrderData(order, this.pageid)
					.then((res) => {
						this.order = [...this.order, ...res.data]
						console.log(res)
					}).catch((err) => {
						console.log(err)
					})
			}
		},
		//上拉加载
		onReachBottom() {
			console.log('END')
			this.pageid++
			console.log(this.pageid)
			this.pullon()
		},
		// 数据库交互
		created() {
			let tabBars = 'tabBars'
			
			Promise.all([getBaseData(tabBars)])
				.then((res) => {
					this.tabBars = res[0].data
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
