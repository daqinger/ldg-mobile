<template>
	<view class="content">
		<!-- 功能列表 -->
		<uni-list class="mt10" :border="false">
			<uni-list-item :title="$t('settings.userInfo')" to="/pages/ucenter/userinfo/userinfo" link="navigateTo"></uni-list-item>
		</uni-list>
		
		<!-- 退出/登录 按钮 -->
		<view class="bottom-back" @click="clickLogout">
			<text class="bottom-back-text" v-if="hasLogin">{{$t('settings.logOut')}}</text>
			<text class="bottom-back-text" v-else>{{$t('settings.login')}}</text>
		</view>
	</view>
</template>

<script>
	// import pushServer from './dc-push/push.js';
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
	
				supportMode:[],
				pushIsOn:"wait",
				currentLanguage:""
			}
		},
		computed: {
			...mapGetters({
				'userInfo': 'user/info',
				'hasLogin': 'user/hasLogin',
			}),
			// i18nEnable(){
			// 	return getApp().globalData.config.i18n.enable
			// }
		},
		onLoad() {
			// this.currentLanguage = uni.getStorageSync('CURRENT_LANG') == "en"?'English':'简体中文'
			
			// uni.setNavigationBarTitle({
			// 	title: this.$t('settings.navigationBarTitle')
			// })
			// // #ifdef APP-PLUS || MP-WEIXIN
			// uni.checkIsSupportSoterAuthentication({
			// 	success: (res) => {
			// 		console.log(res);
			// 		this.supportMode = res.supportMode
			// 	},
			// 	fail: (err) => {
			// 		console.log(err);
			// 	}
			// })
			// // #endif
		},
		onShow() {
		},
		methods: {
			...mapMutations({
				logout: 'user/logout'
			}),
			toEdit() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				});
			},
			clickLogout() {
				if (this.hasLogin) {
					uni.showModal({
						title: this.$t('settings.tips'),
						content: this.$t('settings.exitLogin'),
						cancelText: this.$t('settings.cancelText'),
						confirmText: this.$t('settings.confirmText'),
						success: res => {
							if (res.confirm) {
								this.logout();
								uni.navigateBack();
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.navigateTo({
						url: '/pages/ucenter/login-page/index/index'
					});
				}
			}
			
			
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		flex: 1;
		width: 100%;
		height: 100%;
	}

	uni-button:after {
		border: none;
		border-radius: 0;
	}
	/* #endif */
	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 750rpx;
		height: 100vh;
		/* #endif */
		flex-direction: column;
		flex: 1;
		background-color: #F9F9F9;
	}

	.bottom-back {
		margin-top: 10px;
		width: 750rpx;
		height: 44px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* #ifndef APP-NVUE */
		border: none;
		/* #endif */
		border-width: 0;
		border-radius: 0;
		background-color: #FFFFFF;
	}

	.bottom-back-text {
		font-size: 33rpx;
	}

	.mt10 {
		margin-top: 10px;
	}
	/* #ifndef APP-NVUE  || VUE3 */
	.content /deep/ .uni-list {
		background-color: #F9F9F9;
	}
	.content /deep/ .uni-list-item--disabled,.list-item {
		height: 50px;
		margin-bottom: 1px;
	}
	/* #endif */

</style>