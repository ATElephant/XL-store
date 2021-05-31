<template>
	<view style="background: #F5F5F5;min-height: 100%;height: auto;">
		<!-- 地址选择 -->
		<view class="main-bg-color text-white d-flex a-center px-3" style="height: 250rpx;"
			hover-class="main-bg-hover-color" @click="openPathList">
			<view>
				<!-- 默认 -->
				<template v-if="path">
					<view class="font-weight font-md d-flex a-center font-lg">
						{{path.name}} {{path.phone}}
						<view class="border border-white rounded px-1 font ml-2" v-if="path.isdefault">默认</view>
					</view>
					<view class="font">
						{{path.path}} {{path.detailPath}}
					</view>
				</template>

				<!-- 初次进入 -->
				<template v-else>
					<view class="font-weight font-md d-flex a-center font-lg">
						{{name}} {{phone}}
					</view>
					<view class="font">
						{{address}}
					</view>
				</template>
			</view>
			<view class="iconfont icon-you ml-auto"></view>
		</view>
		<view style="border-top-left-radius: 25rpx;border-top-right-radius: 25rpx;margin-top: -25rpx;overflow: hidden;">
			<view class="bg-white">
				<uni-list-item showArrow>
					<!-- 商品列表 -->
					<view class="d-flex flex-row flex-nowrap j-sb mx-2 " v-for="(item,index) in list" :key="index">
						<template v-if="item.checked ==true">
							<view class="size text-secondary" style="width: 25%;">{{item.title}}</view>
							<view class="text-center size text-secondary">{{item.number}}</view>
						</template>
					</view>
					<!-- <view slot="rightContent">共{{totalNumber}}件</view> -->
				</uni-list-item>
				<!-- <uni-list-item title="商品总价" :showArrowIcon="false">
					<view slot="rightContent">
						<price color="text-dark">{{totalPrice}}</price>
					</view>
				</uni-list-item> -->
				<uni-list-item title="运费" :showArrowIcon="false">
					<view slot="rightContent">包邮</view>
				</uni-list-item>
				<uni-list-item title="优惠券">
					<view slot="rightContent" class="text-light-muted">无可用</view>
				</uni-list-item>
				<!-- <uni-list-item :showArrowIcon="false">
					<text class="main-text-color">小计</text>
					<view slot="rightContent">
						<price color="text-danger">20.00</price>
					</view>
				</uni-list-item> -->
				<!-- <divider></divider>
				<uni-list-item title="发票" extraWidth="40%">
					<view slot="rightContent">电子发票-个人</view>
				</uni-list-item> -->

			</view>
		</view>

		<view class="position-fixed d-flex a-center j-end border bottom-0 left-0 right-0 bg-white p-2 font-md">
			合计:
			<view class="ml-2">
				<price color="text-danger">{{totalPrice}}</price>
			</view>
			<view class="ml-2 px-2 py-1 main-bg-color text-white font-md" hover-class="main-bg-hover-color"
				style="border-radius: 80rpx;" @click="openPayMethod">
				去支付
			</view>
		</view>

	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import price from "@/components/price.vue"
	import {
		mapGetters,
		mapState
	} from "vuex"

	export default {
		components: {
			uniListItem,
			price
		},
		data() {
			return {
				path: false
			}
		},
		onShow() {
			wx.hideHomeButton()
		},
		computed: { //调用引入的vuex的函数
			...mapGetters(['defaultPath']),
			...mapState({
				name: state => state.order.name,
				phone: state => state.order.phone,
				address: state => state.order.address,
				totalPrice: state => state.order.totalPrice,
				list: state => state.order.foodList,
			}),
		},
		onLoad() {
			if (this.defaultPath.length) {
				this.path = this.defaultPath[0]
			}
			// 开启监听选择收货地址事件
			uni.$on('choosePath', (res) => {
				this.path = res
				// console.log('接收参数',res)
			})
		},
		onUnload() {
			// 关闭监听选择收货地址事件
			uni.$off('choosePath', (e) => {
				console.log('关闭监听选择收货地址');
			})
		},
		methods: {
			openPayMethod() {
				uni.redirectTo({
					url: '../payMethod/payMethod',
				});
			},
			openPathList() {
				uni.navigateTo({
					url: '',
					// url: '../userAddress/userAddress?type=choose',
				});
			}
		}
	}
</script>

<style>

</style>
