<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<uni-swipe-action :options="options" @click="bindClick($event,index)">
			<uni-list-item  @click="choose(item)">
				<view class="text-secondary">
					<view class="d-flex a-center">
						<text class="main-text-color">{{item.name}}</text>
						{{item.phone}}
						<text class="main-text-color" v-if="item.isdefault">[默认]</text>
					</view>
					<view>{{item.path}}</view>
					<view>{{item.detailPath}}</view>
				</view>
			</uni-list-item>
			</uni-swipe-action>
		</block>

		<button class=" rounded-circle bg-light-secondary mb- 2" style="width: 85rpx;height: 85rpx;" @click="onButtonTap">
			<i class="iconfont icon-jia" style="font-size: 60rpx;"></i></button>
	</view>
</template>

<script>
		import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
		import uniSwipeAction from "@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue"
		import {mapState,mapMutations} from "vuex"
	export default {
		components: {
			uniListItem,
			uniSwipeAction
		},
		computed: {
			...mapState({
				list: state => state.path.list
			}),
		},
onLoad(e){   //接收uni.navgateto 数据
	console.log(e)
	if(e.type === 'choose'){
		this.isChoose = true
	}
},
		data() {
			return {
				isChoose:false,
				options: [{
					text: '修改',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
			}
		},
		methods: {
			
			...mapMutations(['delPath']),
					bindClick(value,index) {
						switch (value.index){
							case 0: // 修改
							let obj =JSON.stringify({
								index:index,
								item:this.list[index]
							});
							uni.navigateTo({
								url: '../user-path-edit/user-path-edit?data='+obj,
							});
								break;
							case 1: // 删除
							uni.showModal({
								content: '确认删除该地址 ？',
								success:  (res)=> {
									if (res.confirm) {
										this.delPath(index);
										uni.showToast({
											title:"删除成功"
										})
									} 
								}
							});
								break;
						}
					},
					// 监听导航栏按钮点击
					onButtonTap() {
						uni.navigateTo({
							url: '../user-path-edit/user-path-edit'
						});
					},
					// 选择收货地址
					choose(item){
						if(this.isChoose){
						uni.$emit('choosePath',item)
						
						uni.navigateBack({
							delta: 1
						});
						}
					}
				}
		}
</script>

<style>

</style>
