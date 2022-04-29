import user from '@/store/modules/user.js'

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 使用了vuex 的  Store  https://vuex.vuejs.org/zh/guide/
const store = new Vuex.Store({
	// 模块化，导入usr
	modules: {
		user
	},
	strict: true
})
// #endif

// #ifdef VUE3
import {createStore} from 'vuex'
const store = createStore({
	modules: {
		user
	}
})
// #endif

export default store



// 结构化目录

// ├── index.html
// ├── main.js
// ├── api
// │   └── ... # 抽取出API请求
// ├── components
// │   ├── App.vue
// │   └── ...
// └── store
//     ├── index.js          # 我们组装模块并导出 store 的地方		---本文件所在的 地方
//     ├── actions.js        # 根级别的 action
//     ├── mutations.js      # 根级别的 mutation
//     └── modules
//         ├── cart.js       # 购物车模块
//         └── products.js   # 产品模块