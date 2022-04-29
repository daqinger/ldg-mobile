<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar :statusBar="true" :title="title" :border="false" left-icon="left" right-icon="cart"></uni-nav-bar>
		<uni-nav-bar left-text="返回" right-text="设置" title="标题" />
		<!-- #endif -->
		<uni-fab ref="fab" :content="content" horizontal="right" vertical="bottom"
			 @trigger="trigger"/>
		<web-view v-if="url" :src="url"></web-view>
	
	</view>
</template>

<script>
	export default {
		onLoad({url,title}) {
			if(url.substring(0, 4) != 'http'){
				uni.showModal({
					title:"错误",
					content: '不是一个有效的网站链接,'+'"'+url+'"',
					showCancel: false,
					confirmText:"知道了",
					complete: () => {
						uni.navigateBack()
					}
				});
				title = "页面路径错误"
			}else{
				

				console.log(url,title);
				this.url = url;
			}
			if(title){
				uni.setNavigationBarTitle({title});
				this.title = title;
			}
		},
		data() {
			return {
				url:null,
				title:"",
				content: [
				{
					text: '返回主页',
					active: false,
					iconPath: '/static/webview/home.png'
				},
				{
					text: '分享',
					active: false,
					iconPath: '/static/webview/share.png'
				}],
			};
		},
		methods:{
			trigger(e) {
			
				var that = this;
				if(e.index==0){
					uni.switchTab({
						url: '/pages/grid/grid'
					});
					
				}else{
					console.log("一件填入");
					
				}
			},
		},
		onBackPress(options) {
			console.log("被点击...")
		
		
		}
	}
</script>

<style lang="scss">
	.uni-fab{
		z-index: 999;
	}
	

</style>
