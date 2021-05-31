<template>
	<view>
		<!-- header -->
		<!-- 已登录 -->
		<view class="position-relative d-flex a-center" style="height: 320rpx;width: 100%;" v-if="wxlogin">
			<image :src="bgi" style="height: 320rpx;width: 100%;"></image>
			<view class="position-absolute  d-flex a-center" v-for="(item,index) in userInfoList" :key="index">
				
				<image :src="item.avatarUrl" class="rounded-circle border-light ml-4"
					style="width: 130rpx;height: 130rpx;"></image>
				<view class="text-white font-md ml-2">
					{{item.nickName}}
				</view>
			</view>
		</view>
		
		<!-- 未登录 -->
		<view class=" position-relative" style="height: 320rpx;width: 100%;" v-if="!wxlogin">
			<image :src="bgi" style="height: 320rpx;width: 100%;"></image>
			<button class="position-absolute login-button" style="width: 60%; margin-top: -25%;margin-left: 20%;" @tap="getUserProfile"> 登录</button>
		</view>
		
		<!-- homeloading -->
		<home-load-list loadType="ball"	loadPercent="50"  v-if="homelist"></home-load-list>
		
		
		<!-- body -->
		<divider></divider>
		<!-- <uniListItem showExtraIcon leftIconStyle="color:#FDBF2E;" leftIcon="icon-VIP" title="收货地址"
			@click="navigate('userAddress')"></uniListItem> -->
		<!-- 		<uni-list-item showExtraIcon leftIconStyle="color:#FCBE2D;" leftIcon="icon-huangguan" title="个人资料"
			@click="navigate('userinfo')"></uni-list-item> -->
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
	import divider from '../../components/divider.vue'
	import uniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue'

	import {
		getBaseData
	} from "../../common/cloundfun.js"
	import {
		login
	} from '../../common/login.js'


	var db = wx.cloud.database()
	var user = db.collection('user')

	export default {
		components: {
			uniListItem,
			divider,
		},
		data() {
			return {
				homelist:true,
				bgi: [],
				wxlogin: false,
				userInfoList: [],
			}
		},
		// 判断用户是否登录
		onShow() {
			//请求数据库查看用户是否登录
			this.ifUser()
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
			
			// 获取用户授权
			getUserProfile(e) {
				wx.getUserProfile({
						desc: '登录'
					})
					.then(res => {
						// console.log(res.userInfo)
						this.wxLogin(res.userInfo)
					})
					.catch(err => {
						console.log('拒绝登录或登录失败')
					})
			},
			// 请求集合
			wxLogin(user) {
				login(user)
					.then((res) => {
						this.ifUser()
					})
					.catch((err) => {
						console.log(err)
					})
			},
			//请求数据库查看用户是否登录
			ifUser() {
				user.get()
					.then((res) => {
						// console.log(res)
						if (res.data.length === 0) {
							//没登录
							this.wxlogin = false
						} else {
							this.wxlogin = true
							this.userInfoList = res.data
						}
					}).catch((err) => {
						console.log(err)
					})

			}
		},
		created() {
			let settingBGI = 'settingBGI'
			Promise.all([getBaseData(settingBGI)]) //getBaseData(submitted)
				.then((res) => {
					this.bgi = res[0].data[0].image
					
					this.homelist = false
				}).catch((err) => {
					console.log(err)
				})
		}
	}
</script>

<style scoped>
	/* 登录 */
	.login-button {
		border: none;
		width: 100%;
		font-size: 30rpx;
		background: linear-gradient(to right, #34f54a 10%, #31E749 80%);
		border-radius: 50rpx;
		color: #FFFFFF;
	}
</style>
