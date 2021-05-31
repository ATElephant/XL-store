export default {
	state: {
		// checked:false,
		// createTime: '',
		// name: '',
		// phone: '',
		// address: '',
		// time: '18:18',
		// date: '',
		// totalPrice: 0,
		foodList: [{
				id: 0,
				checked: false,
				title: "酥脆饼",
				price: 23.33,
				number: 0,
				minnum: 0,
				maxnum: 10,
			},
			{

				id: 1,
				checked: false,
				title: "粽子",
				price: 53.33,
				number: 0,
				minnum: 0,
				maxnum: 100
			},
			{
				id: 2,
				checked: false,
				title: "月饼",
				price: 63.33,
				number: 0,
				minnum: 0,
				maxnum: 100
			},
			{
				id: 3,
				checked: false,
				title: "定制点心",
				price: 99.99,
				number: 0,
				minnum: 0,
				maxnum: 100
			}
		]
	},
	getters: {
		totalPrice: (state) => {
			var total = 0
			state.foodList.forEach(v => {
				total += v.price * v.number
				console.log(v.price)
				console.log(v.number)
			})
			var realVal = parseFloat(total).toFixed(2)
			console.log(realVal)
			return realVal
		},
		judge:(state)=> {
			var status= 0
			state.foodList.forEach(v => {
				if (v.number >= 1) {
					v.checked = true
				}
				if(v.number == 0){
					v.checked = false
				}
			})
			// this.$forceUpdate();
			return status
		}

	},
	mutations: {
		updateCreateTime(state, message) {
			state.createTime = message
			console.log(state.createTime + ' ' + 'dd')

		},
		updateName(state, message) {
			state.name = message
			console.log(state.name + ' ' + 'dd')

		},
		updatePhone(state, message) {
			state.phone = message
			console.log(state.phone + ' ' + 'dd')

		},
		updateAddress(state, message) {
			state.address = message
			console.log(state.address + ' ' + 'dd')

		},
		updateTime(state, message) {
			state.time = message
			console.log(state.time + ' ' + 'dd')
		},
		updateDate(state, message) {
			state.date = message
			console.log(state.date + ' ' + 'dd')
		},
		updateTotalPrice(state, message) {
			state.totalPrice = message
			console.log(state.totalPrice + ' ' + 'dd')
		},


		// judge(state) {
		// 	var status= 0
		// 	state.foodList.forEach(v => {
		// 		if (v.number >= 1) {
		// 			v.checked = true
		// 		}
		// 	})
		// 	return status
		// }
	},
	actions: {

	}
}
