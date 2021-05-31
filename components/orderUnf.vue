<template>
	<view class="appointment-border m-5" @click="openOrderDetail(item._id)">
		

		<!-- 订单状态 -->
		<view class="border-bottom">
			<view class=" ml-2 appointment-green inlinlineItem" :class="checked === '已完成' ? 'appointment-red' : ''"></view>
			<text class=" ml-1 font-sm">{{checked}}</text>
			<text class="float-right  mr-2 font-sm line-h-27 text-secondary">{{item.createTime}}</text>
		</view>
		<!-- 订单详情 -->

		<view class="appointment-content">
			<view class="appointment-number">
				<text class="appointment-name">牌号：</text>
				<text class="appointment-text text-green">{{pnumber}}</text>
			</view>
			<view class="d-flex flex-row flex-nowrap j-sb">
				<view class="left">
					<text class="appointment-name">前面排队人数：</text>
					<text class="appointment-text">{{ynumber}}</text>
				</view>
				<view class="right">
					<text class="appointment-name">预约人名字：</text>
					<text class="appointment-text">{{item.name}}</text>
				</view>
			</view>
		</view>

		<button
			style="color:#BBBBBB;background-color: white;font-size: small;border: none;margin-bottom: 10rpx;">取消订单</button>

	</view>
</template>

<script>
	import orderList from "./orderList.vue"
	import divider from "./divider.vue"
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		props: {
			item: Object,
			index: Number
		},
		data(){
			return{
				pnumber:100,
				ynumber:1,
				checked:'',
				// number:obj.userId,
				// status:obj.status,
				obj:this.item
			}
		},
		
		//对父组件传过来的值进行监听，如果改变也对子组件内部的值进行改变
		watch: {
		        myObj(newVal) {
		            this.obj = newVal 
		        }
		    },
		components: {
			orderList,
			divider,
		},
		computed:{
			// con(){
			// 	console.log(item)
			// },
			math(){
				console.log(this.obj)
				this.pnumber+=this.obj.userId
				this.ynumber = this.obj.userId-1
				if(this.obj.status === false){
					this.checked = '已接单'
				}
				if(this.obj.status === true){
					this.checked = '已完成'
				}
			}
		},
		methods: {
			openOrderDetail(id) {
				console.log(id)
				// let that = this
				// var navData= JSON.stringify(that.navData)
				uni.navigateTo({
					url: '../../pages/orderDetail/orderDetail?id=' + id,

				});
			}
		}
	}
</script>

<style scoped>
	/* 订单状态 */
	.inlinlineItem {
		display: inline-block;
	}

	/* 订单详情 */
	.appointment-content {
		width: 90%;
		height: 100%;
		margin: auto auto;
	}

	.appointment-number {
		width: 25%;
		margin: 20rpx auto;
		font-size: small;
		font-weight: 400;
	}


	.appointment-name {
		font-weight: 400;
		font-size: small;
	}


	.appointment-text {
		text-align: center;
		font-size: medium;
	}

	.appointment-border {
		border: 5rpx solid #B2B2B2;
		width: 650rpx;
		height: 100%;
	}

	.appointment-green {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: #09BB07;
	}
	.appointment-red {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: red;
	}
</style>
