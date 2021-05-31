<template>
	<view>
		<view class="main-bg-color text-white p-4 d-flex a-end j-sb" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-lg">卖家已接单</view>
				<view class="font">还差12小时自动确认</view>
			</view>
			<view class="iconfont icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>
		<view class="p-3 bg-white">
			<view class="text-light-muted font-md">
				<text class="font-lg text-dark mr-2">{{detaildata.name}}</text>
				{{detaildata.phone}}
			</view>
			<view class="text-light-muted font-md">
				{{detaildata.address}}
			</view>
		</view>
		<divider></divider>
		<view>
			<block v-for="(foit,foin) in detaildata.foodList" :key="index">
				<template v-if="foit.checked ==true">
					<orderListItem :title="foit.title" :price="foit.price" :number="foit.number"></orderListItem>
				</template>
			</block>
		</view>
		<divider></divider>
		<uniListItem>
			<text class="font-md text-light-muted">商品总价</text>
			<view slot="right" class="font-md text-light-muted">
				￥{{detaildata.totalPrice}}
			</view>
		</uniListItem>
		<!-- 		<uniListItem>
			<text class="font-md text-light-muted">优惠券</text>
			<view slot="right" class="font-md text-light-muted">
				-￥20.00
			</view>
		</uniListItem> -->
		<!-- <uniListItem>
			<text class="font-md main-text-color">实际付款</text>
			<view slot="right" class="font-md text-light-muted">
				<price>123.00</price>
			</view>
		</uniListItem> -->
		<divider></divider>
		<card headTitle="订单信息">
			<uniListItem title="订单编号">
				<view slot="right" class="font-md text-light-muted">
					{{detaildata.orderNumber}}
				</view>
			</uniListItem>
		</card>
		<!-- 返回按钮 -->
		<view class="uni-btn-v mx-3">
			<button style="background-color: #31E749;color: white;" form-type="submit" @click="back">返回页面</button>
		</view>
	</view>
</template>

<script>
	import divider from '../../components/divider.vue'
	import orderListItem from '../../components/order/order-list-item.vue'
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import price from '../../components/price.vue'
	import card from '@/components/car/card.vue'
	import {
		mapState,
		mapGetters
	} from 'vuex'
	// 引入数据库
	var db = wx.cloud.database()
	var listdata = db.collection('order')
	export default {
		components: {
			divider,
			price,
			card,
			orderListItem,
			uniListItem
		},
		data() {
			return {
				detaid:'',
				detaildata:{},
			}
		},
		computed: {
			...mapState({
				// pathList: state => state.path.list, //接受地址数据列表
			}),
			
			
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 请求数据库数据{图文列表，轮播图}
			detailreq(id){
				listdata.where({
				  _id:id
				})
				.get()
				.then((res)=>{
					// 赋值筛选到的数据
					this.detaildata = res.data[0]
					// .datainfo
					 console.log(this.detaildata)
							
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			
		},
		onLoad(e){
			console.log(e)
			this.detaid=e.id
			// 请求数据库数据{图文列表，轮播图}
			this.detailreq(this.detaid)
		}
	}
</script>

<style scoped>

</style>
