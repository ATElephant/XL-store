
import orderList from '../store/modules/orderlist.js'

const db = wx.cloud.database()
var openId = orderList.state.openId


var getBaseData = function(col) {
	return new Promise((resolve, reject) => {
		const i = db.collection(col)
		i.get().then((res) => {
			resolve(res)
		}).catch((err) => {
			reject(err)
		})
	})
}


// var getOrderData = function(col, pageid) {
// 	return new Promise((resolve, reject) => {
// 		const i = db.collection(col).limit(4).skip(pageid * 3)
// 		i.get().then((res) => {
// 			resolve(res)
// 		}).catch((err) => {
// 			reject(err)
// 		})
// 	})
// }

// 查询订单

// 已接单
var whereOrderData = function(col, pageid) {
	return new Promise((resolve, reject) => {
		const i = db.collection(col).where({
			_openid:openId,
			status:false,
		}).limit(4).skip(pageid * 4)
		.get().then((res) => {
			resolve(res)
		}).catch((err) => {
			reject(err)
		})
	})
}

// 已完成
var whereFinishOrderData = function(col, pageid) {
	return new Promise((resolve, reject) => {
		const i = db.collection(col).where({
			_openid:openId,
			status:true,
		}).limit(4).skip(pageid * 4)
		.get().then((res) => {
			resolve(res)
		}).catch((err) => {
			reject(err)
		})
	})
}
export {
	getBaseData,
	// getOrderData,
	whereOrderData,
	whereFinishOrderData
}
