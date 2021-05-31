import Vue from 'vue'
import Vuex from 'vuex'

import path from '@/store/modules/path.js'
import order from '@/store/modules/order.js'
import orderlist from '@/store/modules/orderlist.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		path,
		order,
		orderlist
	},
	state: {
	
	},
	mutations: {
		
	},
	getters: {

	},
	actions: {
		
	}
})


