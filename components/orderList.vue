<template>
	<view class="d-flex flex-row flex-nowrap j-sb mx-2 my-1 border-bottom">
		<view class="font-md ">{{name}}</view>
		<view class="font-md  "> {{number}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: String,
			number: Number
		},
		data() {
			return {

			}
		},

	}
</script>

<style>
</style>
