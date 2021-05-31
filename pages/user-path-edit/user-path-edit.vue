<template>
	<view>

		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				收货人：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.name" />
		</view>
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				手机号码：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.phone" />
		</view>

		<divider></divider>

		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				所在地区：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.path" />
		</view>
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				详细地址：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.detailPath" />
		</view>

		<divider></divider>

		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				设为默认地址：</view>
			<switch :checked="form.isdefault" class="ml-auto" color="#FD6801" @change="form.isdefault = $event.detail.value" />
		</view>

		<view class="p-3">
			<view class="text-center w-100 main-bg-color text-white font-md rounded py-2" hover-class="main-bg-hover-color"
			 @click="submit">
				保 存
			</view>
		</view>

	</view>
</template>

<script>
	import mpvueCityPicker from "../../components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue"
	import {
		mapMutations,
		mapActions
	} from "vuex"

	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				isedit: false, //判断创建或修改  true:xiugai
				index: -1, //存放当前对象的索引
				form: {
					path: '',
					name: "",
					phone: "",
					detailPath: "",
					isdefault: false
				}
			}
		},
		onLoad(e) { //接受数据
			console.log(e.data)
			if (e.data) {

				let i = JSON.parse(e.data)

				this.form = i.item
				this.index = i.index
				this.isedit = true
				uni.setNavigationBarTitle({
					title:"修改收货地址"
				})
			}

		},
		methods: {
			...mapMutations(['createPath']),
			...mapActions(['updatePathAction','createPathAction']),
			// 提交
			submit() {

				// 修改
				if (this.isedit) {
					
					this.updatePathAction({
						index: this.index,
						item: this.form,
					})
					uni.showToast({
						title: "修改成功"
					})
					return uni.navigateBack({
						delta: 1
					});
				}
				// 验证表单
				// 创建
				this.createPathAction(this.form)
				uni.showToast({
					title: '创建成功'
				});
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style>
	page {
		background: #EEEEEE;
	}
</style>
