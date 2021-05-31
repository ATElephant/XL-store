<template>
	<view class="border-bottom d-flex a-center py-2 border-light-secondary">
		<view class="flex-1 mx-2">
			<view class="d-flex a-center">
				<text class="font-md text-dark">{{title}}</text>
				<text class="font-md text-light-muted ml-auto"
				>￥{{price}}</text>
			</view>
			<view class="d-flex a-center">
				<text class="font text-light-muted">{{attrs}}</text>
				<text class="font text-light-muted ml-auto"
				>x{{number}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title:String,
			price:Number,
			attrs:String,
			number:Number
			// item: Object,
			// index:Number
		},
		methods: {

		},
	}
</script>

<style>
</style>
