<template>
	<view>
		<!-- header -->
		<!-- 已登录 -->

		<view class="position-relative d-flex a-center" style="height: 320rpx;width: 100%;" v-if="wxlogin">
			<image :src="bgi" style="height: 320rpx;width: 100%;"></image>
				<view class="position-absolute  d-flex a-center" v-for="(item,index) in user" :key="index">
					<image :src="item.avatarUrl" class="rounded-circle border-light ml-4"
						style="width: 145rpx;height: 145rpx;"></image>
					<view class="text-white font-md ml-2">
						{{item.nickName}}
					</view>
				</view>
		</view>
		<!-- 未登录 -->
		<view class="position-relative d-flex a-center" style="height: 320rpx;width: 100%;" v-if="!wxlogin">>
			<image :src="bgi" style="height: 320rpx;width: 100%;"></image>
			<view class="position-absolute  a-center">
				<button @tap="getUserProfile"> 去登录</button>
			</view>
		</view>




		<!-- body -->
		<divider></divider>
		<uniListItem showExtraIcon leftIconStyle="color:#FDBF2E;" leftIcon="icon-VIP" title="收货地址"
			@click="navigate('userAddress')"></uniListItem>
		<uni-list-item showExtraIcon leftIconStyle="color:#FCBE2D;" leftIcon="icon-huangguan" title="个人资料"
			@click="navigate('userinfo')"></uni-list-item>
		<uni-list-item showExtraIcon leftIconStyle="color:#FA6C5E;" leftIcon="icon-service" title="关于我们"
			@click="openAbout"></uni-list-item>
		<uni-list-item showExtraIcon leftIconStyle="color:#FE8B42;" leftIcon="icon-home" title="协议规则"></uni-list-item>
		<uni-list-item showExtraIcon leftIconStyle="color:#9ED45A;" leftIcon="icon-gengduo" title="隐私政策">
		</uni-list-item>
		<divider></divider>
		<uni-list-item showExtraIcon leftIconStyle="color:#808C98;" leftIcon="icon-icon_set_up" title="了解更多">
		</uni-list-item>
	</view>
</template>

<script>
	var db = wx.cloud.database()
	var user = db.collection('user')
	import divider from '../../components/divider.vue'
	import uniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue'
	import {
		getBaseData
	} from "../../common/cloundfun.js"
	import {
		login
	} from '../../common/login.js'

	export default {
		components: {

			uniListItem,
			divider,
		},
		data() {
			return {
				bgi: [],
				wxlogin: false,
				user: [],
			}
		},

		methods: {
			openAbout() {
				uni.navigateTo({
					url: '../about/aboout',
				});
			},
			navigate(path) {
				if (!path) return;
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				});
			},
			getUserProfile(event) {

				wx.getUserProfile({
					desc: '用于完善会员资料'
				}).then((res) => {
					console.log(res.userInfo)
					let user = res.userInfo
				}).catch((err) => {
					console.log(err)
				})

				login(user).then((res) => {
					this.ifUser()
				}).catch((err) => {
					console.log(err)
				})
			},
			//请求数据库查看用户是否登录
			ifUser() {
				user.get()
					.then((res) => {
						console.log(res)
						if (res.length === 0) {
							//没登录
							this.wxlogin = false
						} else {
							this.wxlogin = true
							this.user = res.data
						}
					}).catch((err) => {
						console.log(err)
					})

			}

		},
		// 判断用户是否登录
		onShow() {
			this.ifUser()
		},
		// 数据库交互

		created() {
			let settingBGI = 'settingBGI'
			Promise.all([getBaseData(settingBGI)]) //getBaseData(submitted)
				.then((res) => {
					console.log(res[0].data[0].image)
					this.bgi = res[0].data[0].image

				}).catch((err) => {
					console.log(err)
				})
		}
	}
</script>

<style>

</style>



