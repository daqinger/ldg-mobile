import App from './App'
import store from './store'
import i18n from './lang/i18n'
import {requestInspect,requestIFS,requestMaintPlanLine} from './util/api.js';



// #ifndef VUE3
import Vue from 'vue'

Vue.prototype.$requestInspect = requestInspect;
Vue.prototype.$requestIFS = requestIFS;
Vue.prototype.$requestMaintPlanLine = requestMaintPlanLine;
Vue.prototype.$store = store;

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
// #endif


// #ifdef VUE3
import {createSSRApp} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n)
	app.use(store)
	return {app}
}
// #endif
