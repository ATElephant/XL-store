<template>
	<view>

		<view class="d-flex flex-column a-center j-center py-5 my-3">
			<text class="iconfont icon-iconfontxuanzhong4 main-text-color line-h" style="font-size: 180rpx;"></text>
			<text class="text-dark font-lg line-h-sm">支付成功</text>
		</view>
		<view class="px-5 mt-5">
			<view class="rounded main-bg-color text-white font-md w-100 py-2 mt-3 text-center" 
			hover-class="main-bg-hover-color" @click="openIndex">
				返回首页
			</view>
			
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: 0,
			}
		},
		methods: {
			openIndex() {
				uni.switchTab({
					url:'../index/index'
				})
			},
			/* countDown() {
				let THIS=this;
				      THIS.time--;
			} */
		},
		onShow() {
			wx.hideHomeButton()
		},
		// mounted() {
		// 	let THIS=this;
		// 	    THIS.time=5;
		// 	setInterval(THIS.countDown, 1000);
		// },
		// watch: {
		// 	'time': function(newVal, oldVal) {
		// 		if (newVal == 0) {
		// 			this.$router.push('../index/index');
		// 		}
		// 	}
		// },
		}
</script>

<style>

</style>
