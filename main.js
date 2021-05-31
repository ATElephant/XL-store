import Vue from 'vue'
import App from './App'
import store from 'store/store.js'
import loader from './components/loading/loading.vue'
import loadLine from './components/load-line/load-line.vue'

Vue.prototype.$store=store
Vue.config.productionTip = false
Vue.component('load-list',loader)
Vue.component('home-load-list',loadLine)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
