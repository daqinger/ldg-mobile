<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">用户名密码登录</text>
		<input class="input-box" :inputBorder="false" v-model="username" placeholder="请输入工号"/>
		<input type="password" class="input-box" :inputBorder="false" v-model="password" placeholder="请输入密码"/>
<!-- 		<view class="captcha-box" v-if="captchaBase64">
			<image class="captcha-img" @click="createCaptcha" :src="captchaBase64" mode="widthFix"></image>
			<input type="text" class="input-box captcha" :inputBorder="false" v-model="captcha" :placeholder="请输入密码"/>
		</view> -->
		<!-- <uni-agreements @setAgree="agree = $event"></uni-agreements> -->
		<button class="send-btn" :disabled="!canLogin" :type="canLogin?'primary':'default'"
			@click="pwdLogin">登录</button>
		<!-- 忘记密码 -->
	<!-- 	<view class="auth-box">
			<text class="link" @click="toRetrievePwd">{{$t('pwdLogin.forgetPassword')}}</text>
			<text class="link" @click="toRegister">{{$t('pwdLogin.register')}}</text>
		</view>
		<uni-quick-login :agree="agree" ref="uniQuickLogin"></uni-quick-login> -->
	</view>
</template>

<script>
	import mixin from '../common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				password: "",
				username: "",
				"agree": false,
			}
		},
		computed: {
			canLogin() {
				return this.username.length && this.isPwd;
			},
			isPwd() {
				return /^.{5,20}$/.test(this.password);
			}
		},
		methods: {
			// 页面跳转，找回密码
			// toRetrievePwd() {
			// 	uni.navigateTo({
			// 		url: '../pwd-retrieve/pwd-retrieve?phoneNumber=' + (this.isPhone ? this.username : '') +
			// 			'&phoneArea=' + this.currenPhoneArea
			// 	})
			// },
			/**
			 * 密码登录
			 */
			pwdLogin() {
				// if (!this.agree) {
				// 	return uni.showToast({
				// 		title: this.$t('common').noAgree,
				// 		icon: 'none'
				// 	});
				// }
				
				uni.showLoading({
				    title: '登录中'
				});
				//换成自己的登录逻辑
				uni.request({
					url: 'http://118.118.117.50:50080/login',
					method:'POST',
					data: {
						userid:this.username,
						password:this.password
					},
					success: res => {
						if(res == ""){
							return uni.showToast({
								title: '数据获取失败'
							});
						}
						console.log("调用IFS登录接口返回的数据：",res.data.body);
						/**
						 * 	data:"刘彭青"
							time:"2022-03-07 11:33:05"
							token:"8izLIhctZ0of19mMh5M1qt0GZwj4HI928AEKhcpZvjE3zXNyEtZQhg=="
						 */
						// debugger
						var result = res.data.body;
						
						if(res.data.body.data == ""){
							// 登陆失败
							uni.showToast({
								title: '用户名或密码错误！',
								icon:'error'
							});
						}else{
							result.username = this.username.toUpperCase();	//统一转大写
							result.password = this.password.toUpperCase();
							this.loginSuccess(result);
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '请求接口失败',
							icon:'error'
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
				
				
				// // 下边是可以登录
				// uniCloud.callFunction({
				// 	name:'uni-id-cf',
				// 	data:{
				// 		action:'login',
				// 		params:{
				// 			"username": this.username,
				// 			"password": this.password,
				// 			"captcha":this.captcha
				// 		},
				// 	},
				// 	success: ({result}) => {
				// 		console.log("登录方法返回的结果是:",result);
				// 		if (result.code === 0) {
				// 			this.loginSuccess(result)
				// 		} else {
				// 			if (result.needCaptcha) {
				// 				uni.showToast({
				// 					title: result.msg||'完成',
				// 					icon: 'none'
				// 				});
				// 				this.createCaptcha()
				// 			}else{
				// 				uni.showModal({
				// 					title: this.$t('common').error,
				// 					content: result.msg,
				// 					showCancel: false,
				// 					confirmText: this.$t('common').gotIt
				// 				});
				// 			}
				// 		}
				// 	}
				// })
			},
			// createCaptcha(){
			// 	uniCloud.callFunction({
			// 		name:'uni-id-cf',
			// 		data:{
			// 			action:'createCaptcha',
			// 			params:{
			// 				scene: "login"
			// 			},
			// 		},
			// 		success: ({result}) => {
			// 			if (result.code === 0) {
			// 				this.captchaBase64 = result.captchaBase64
			// 			}else{
			// 				uni.showModal({
			// 					content: result.msg,
			// 					showCancel: false
			// 				});
			// 			}
			// 		}
			// 	})
			// },
			// /* 前往注册 */
			// toRegister(e) {
			// 	console.log(e);
			// 	uni.navigateTo({
			// 		url: '/pages/ucenter/login-page/register/register'
			// 	})
			// }
		}
	}
</script>

<style>
	@import url("../common/login-page.css");

	.auth-box {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}

	.auth-box .link {
		font-size: 26rpx;
	}

	.login-text-sub {
		color: #8a8f8b;
	}

	.toRegister {
		margin-top: 80px;
		width: 600rpx;
	}
	.captcha-box{
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
	.captcha-img{
		margin:15px 15px 0 0;
		width: 250rpx;
	}
	.captcha{
		width: 350rpx;
	}
</style>
