export default {
	state:{
		orderList:[],
        loading:'',
		openId:''
	},
	getters:{

	},
	mutations:{
		updataMutations(state, message){
			state.orderList = message
		},
		navMuta(state,message){
			state.loading = message

		},
		addUserId(state,message){
			state.openId = message
		
		}

	},
	actions:{
		updataAction(state, message){
			state.commit('updataMutations', message)
		}

	}
}



