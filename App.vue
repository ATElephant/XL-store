<script>
	export default {
		onLaunch: function() {
			 if (!wx.cloud) {
			      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
			    } else {
			      wx.cloud.init({
			        env: 'xl-8gogrb0n05b9fb12',
			        traceUser: true,
			      })
			    }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/common/uni.css";
	@import "/common/icon.css";
	@import "/common/iconTree.css";
	@import "/common/common.css";
	@import "/common/iconTwo.css";
	@import "/common/zcm-main.css";
</style>
