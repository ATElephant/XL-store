// 错误提示

let erring = function(name,phone,address,number){
	return new Promise((resolve,reject)=>{
		// 请填写姓名
		if(name == ''){
			console.log('请填写姓名')
			// 给予提示
			let tip = '请填写姓名'
			resolve(tip)
			return false
		}
		// 手机号码
		if(phone == ''){
			console.log('手机号码不正确')
			// 给予提示
			let tip = '请填写正确的手机号'
			resolve(tip)
			return false
		}
		if(address == ''){
			console.log('地址不能为空')
			// 给予提示
			let tip = '地址不能为空'
			resolve(tip)
			return false
		}
		if(number == 0){
			console.log('请选择商品')
			// 给予提示
			let tip = '请选择商品'
			resolve(tip)
			return false
		}
		// 提示全部正确
		let tip = 'SUCCESS'
		resolve(tip)
	})
}

export{ erring }