<template>
	<view>
		<divider></divider>
		<uni-list-item title="头像">
			<block slot="right">
				<image src="../../static/images/demo/demo6.jpg"
				style="height: 90rpx;width: 90rpx;"
				class="rounded-circle border border-light"></image>
			</block>
		</uni-list-item>
		<uni-list-item title="姓名">
			<block slot="right">
				summer
			</block>
		</uni-list-item>
		<uni-list-item title="性别"></uni-list-item>
		<uni-list-item title="生日"></uni-list-item>
		<divider></divider>
	</view>
</template>

<script>
	import divider from '../../components/divider.vue'
	import uniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue'
	
	export default {
		components: {
			uniListItem,
			divider,
		},
		data() {
			return {
	
			}
		},
		methods: {

	
		}
	}
</script>

<style>
</style>
