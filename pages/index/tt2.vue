<template>
	<view>
		<form @submit="formSubmit">
			<!-- 获取下单时间 -->
			<picker-view :value="createTime"></picker-view>
			<!-- 获取下单用户信息 -->
			<template v-if="path">

				<view class="border-secondary shadow m-2">
					<view class="title  text-green ml-2">姓名：</view>
					<input class="uni-input" focus placeholder="输入您的姓名" name="name" type="text" v-model="path.name" />
				</view>
				<view class="border-secondary shadow m-2">
					<view class="title  text-green ml-2">联系方式：</view>
					<input class="uni-input" focus placeholder="输入您的联系方式" name="phone" maxlength="11" type="number"
						v-model="path.phone" />
				</view>
				<view class="border-secondary shadow m-2">
					<view class="title  text-green ml-2">收货地址：</view>
					<input class="uni-input" focus placeholder="输入您的地址" name="address" type="text"
						v-model="path.path" />
				</view>

			</template>
			<template v-else>
				<view class="border-secondary shadow m-2">
					<view class="title  text-green ml-2">姓名：</view>
					<input class="uni-input" focus placeholder="输入您的姓名" type="text" name="name" :value="name"
						@change="updateName" />
				</view>
				<view class="border-secondary shadow m-2">
					<view class="title  text-green ml-2">手机号码：</view>
					<input class="uni-input" focus placeholder="输入您的联系方式" name="phone" maxlength="11" type="number"
						:value="phone" @change="updatePhone" />
				</view>
				<view class="border-secondary shadow m-2">
					<view class="title  text-green ml-2">收货地址：</view>
					<input class="uni-input" focus placeholder="输入您的地址" name="address" type="text" :value="address"
						@change="updateAddress" />
				</view>
			</template>

			<!-- 预约的时间和日期 -->
			<view class=" border-secondary shadow m-2">

				<view name="time">
					<view class="d-flex flex-row j-sb a-cente ">
						<view class="uni-list-cell-left title  text-green">
							取货时间：
						</view>
						<view class="uni-list-cell-db">
							<picker mode="time" :value="time" start="10:00" end="19:00" @change="updateTime"
								name="time">
								<view class="uni-input">{{time}}</view>
							</picker>
						</view>
					</view>
					<view class="font-sm text-secondary text-center border-top mx-a" style="width: 90%;">
						注：选择 09:01 ~ 21:01 之间的时间, 不在区间内不能选中
					</view>
				</view>

				<view name="data">
					<view class="d-flex flex-row j-sb a-cente ">
						<view class="uni-list-cell-left title  text-green">
							取货日期：
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange"
								name="date">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
					<view class="font-sm text-secondary text-center border-top mx-a" style="width: 90%;">
						注：为了更好的提供高质量的点心，需要提前2天预定
					</view>
				</view>
			</view>

			<!-- 商品选择 -->
			<view class="uni-form-item uni-column  border-secondary shadow m-2 mr-4 ">
				<view class="title  text-green">选择商品：</view>
				<view class="d-flex flex-row flex-nowrap j-sb mx-2 " v-for="(item,index) in list" :key="index">
					<view class="size text-secondary" style="width: 20%;">{{item.title}}</view>
					<view class="text-center size text-secondary">￥{{item.price}}</view>
					<uniNumberBox class="float-right mb-1 " :value="item.number" :min="item.minnum"
						@change="chengeNumber($event,item,index)"></uniNumberBox>
				</view>
			</view>

			<!-- 合计价格 -->
			<view class="d-flex flex-row j-sb a-cente  border-secondary ">
				<view class="uni-list-cell-left title text-green ml-2">
					合计：
				</view>
				<picker :value="totalPrice" name="totalPrice">
					<view class=" text-danger mr-2">￥{{totalPrice}}</view>
				</picker>
			</view>

			<!-- 提交按钮 -->
			<view class="uni-btn-v mx-3">
				<button style="background-color: #31E749;color: white;" form-type="submit">提交</button>
			</view>
		</form>
		<!-- 提示组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage">
		</HMmessages>
	</view>

</template>

<script>
	var db = wx.cloud.database()
	var user = db.collection('user')

	// 引入提示组件
	import HMmessages from "../../components/HM-messages/HM-messages.vue"
	// 引进错误提示
	import {
		erring
	} from '../../common/erring.js'

	import uniNumberBox from '../../components/uni-ui/uni-number-box/uni-number-box.vue'
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			uniNumberBox,
			HMmessages
		},
		data() {
			// const userId =0
			// const orderNumber = 18586800
			const date = new Date()
			const timeData = date.toLocaleString();
			//接收当前时间
			const currentDate = this.getDate({
				format: true
			})

			return {
				orderList: [],
				timeData,
				createTime: timeData,
				status: false,

				path: false,
				focus: false,

				// 日期
				index: 0,
				date: currentDate,
				//初始化用户id
				userId: 0,
				orderNumber: 18586800
			}
		},
		computed: {
			startDate() {
				return this.getDate('start.setTime(start.getTime() + 3600 * 1000 * 24)');
			},
			endDate() {
				return this.getDate('end');
			},
			updateTotalPrice() {
				this.$store.commit('updateTotalPrice', this.totalPrice)
			},
			updateCreateTime() {
				this.$store.commit('updateCreateTime', this.createTime);
			},
			...mapState({
				list: state => state.order.foodList,
				//pathList: state => state.path.list, //接受地址数据列表
				totalPrice: state => state.order.totalPrice,
				time: state => state.order.time,
				name: state => state.order.name,
				phone: state => state.order.phone,
				address: state => state.order.address,
			}),
			...mapGetters([
				'totalPrice',
				//'defaultPath'
			]),
		},
		// 判断用户是否登录
		onShow() {
			//请求数据库查看用户是否登录
			this.ifUser()
		},
		// onLoad() {
		// 	if (this.defaultPath.length) {
		//           console.log(this.defaultPath)
		// 		this.path = this.defaultPath[0]
		// 		// console.log(this.path)
		// 	}
		// },

		methods: {
			//请求数据库查看用户是否登录
			ifUser() {
				user.get()
					.then((res) => {
						if (res.data.length === 0) {
							//没登录
							uni.showModal({
								title: '点击登录',
								content: '',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.switchTab({
											url: '../setting/setting'
										})
									}
								}
							});
							// chakan  shipin liaojie
							this.wxlogin = false
						} else {
							this.wxlogin = true
							this.userInfoList = res.data
						}
					}).catch((err) => {
						console.log(err)
					})

			},
			// form
			formSubmit(e) {
				// 判断并赋值
				this.$store.commit('judge')

				this.userId += 1
				this.orderNumber += this.userId
				// this.$forceUpdate();
				// 表单验证

				erring(this.name, this.phone, this.address, this.totalPrice)
					.then((res) => {
						if (res == 'SUCCESS') {
							this.orderList = e.detail.value
							let orderNumber = this.orderNumber
							let userId = this.userId
							let status = this.status
							let createTime = this.createTime
							let foodList = this.list
							let orderList = this.orderList
							console.log(foodList)
							orderList = {
								...orderList,
								foodList,
								createTime,
								status,
								userId,
								orderNumber
							}
							let db = wx.cloud.database()
							let users = db.collection('order')
							users.add({
									data: orderList
								})
								.then((res) => {
									uni.showToast({
										title: '正在下单',
										icon: 'loading',
									});

									this.orderConfirm()

								})
								.catch((err) => {
									uni.showToast({
										title: '下单失败'
									});
								})
						} else {
							let icon = 'danger'
							this.tips(res, icon)
						}
					})
					.catch((err) => {
						console.log(err)
					})
			},
			//commit 
			updateName(e) {
				this.$store.commit('updateName', e.target.value)
			},
			updatePhone(e) {
				this.$store.commit('updatePhone', e.target.value)
			},
			updateAddress(e) {
				this.$store.commit('updateAddress', e.target.value)
			},
			updateTime(e) {
				this.$store.commit('updateTime', e.target.value)
			},
			bindDateChange: function(e) {
				this.date = e.target.value
				this.$store.commit('updateDate', e.target.value)
			},
			// 时间日期
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate(); //以后或以前某一天

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},

			// 合计
			chengeNumber(e, item, index) {
				item.number = e
			},

			// 跳转到订单确认页
			orderConfirm() {
				uni.reLaunch({
					url: '../orderConfirm/orderConfirm',
				})
			},
			// 提示框
			tips(tip, icon) {
				this.HMmessages.show(tip, {
					icon: icon,
					iconColor: "#ffffff",
					fontColor: "#ffffff",
					background: "rgba(102, 0, 51,.8)"
				})
			}
		}
	}
</script>

<style scoped>
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
	}
</style>
