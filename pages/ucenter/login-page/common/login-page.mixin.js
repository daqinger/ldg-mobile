import {mapMutations} from 'vuex';
import loginSuccess from './loginSuccess.js';
let mixin = {
	methods:{
		...mapMutations({
			setUserInfo: 'user/login'
		}),
		loginSuccess(result){
			loginSuccess(result); //处理返回逻辑
			// delete result.userInfo.token
			this.setUserInfo(result); // 设置登录信息
		}
	}
}
export default mixin