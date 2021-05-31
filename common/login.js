// 公用存储用户登录数据
var login = function(user){
	return new Promise((resolve,reject)=>{
		let db = wx.cloud.database()
		let users = db.collection('user')
		users.add({
			data:user
		})
		.then((res)=>{
			resolve(res)
		})
		.catch((err)=>{
			reject(err)
		})
	})
}

export {login}