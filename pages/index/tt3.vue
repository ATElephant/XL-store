<template>
	<view>
		<!-- 取货时间和日期 -->
		<view>
			<view class="uni-title uni-common-pl">时间选择器</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前选择
					</view>
					<view class="uni-list-cell-db">
						<picker mode="time" id="time" :value="time" start="09:00" end="19:00" @change="bindTimeChange">
							<view class="uni-input">{{time}}</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="uni-title uni-common-pl">日期选择器</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前选择
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" id="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			// 时间和日期
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				time: '12:01'
			}
		},
		computed: {
			
			// 时间和日期
			startDate() {
				return this.getDate('start.setTime(start.getTime() + 3600 * 1000 * 24)');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			// 时间和日期
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date(new Date().getTime()  + 86400000*2);
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				
				return `${year}-${month}-${day}`;
				
			}
		}
	}
</script>

<style scoped>

</style>
