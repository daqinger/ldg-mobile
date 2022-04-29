<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<status-bar />
		<!-- #endif -->
		
		<image v-if="!(bannerData.length)" class="banner-image" src="/static/grid/empty.png" mode="aspectFill" :draggable="false" />
		<uni-swiper-dot v-else class="uni-swiper-dot-box" @clickItem="clickItem" :info="bannerData"
			:current="current" field="title" mode="nav">
			<swiper class="swiper-box" @change="changeSwiper" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in bannerData" :key="item.id">
					<view class="swiper-item">
						<image class="banner-image" :src="item.picurl" mode="aspectFill" :draggable="false" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<uni-notice-bar :scrollable="true" :showIcon="true" :single="true" text="这是一条通知,这是一条通知,这是一条通知,这是一条通知,这是一条通知,这是一条通知,这是一条通知,这是一条通知,这是一条通知,这是一条通知,这是一条通知"></uni-notice-bar>
		<uni-section  title="集团应用" style="margin: 0;" type="line"></uni-section>
		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item"  @click.native="tapGrid('gsgw')">
				<uni-icons class="icon" color="#007AFF" type="vip" size="26"></uni-icons>
				<text class="text">公司官网</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid('wdxt')" >
				<uni-icons class="icon" color="#007AFF" type="vip" size="26"></uni-icons>
				<text class="text">文档系统</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid('oa')">
				<uni-icons class="icon" color="#007AFF" type="vip" size="26"></uni-icons>
				<text class="text">OA系统</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid('stdc')">
				<uni-icons class="icon" color="#007AFF" type="vip" size="26"></uni-icons>
				<text class="text">食堂订餐</text>
			</uni-grid-item>
		</uni-grid>
		
		<uni-section title="信息推广" style="margin: 0;" type="line"></uni-section>
		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			
			<uni-grid-item class="item"  @click.native="tapGrid('ydyy')">
				<uni-icons class="icon" color="#007AFF" type="gift" size="26"></uni-icons>
				<text class="text">移动应用</text>
			</uni-grid-item>
			<uni-grid-item class="item" @click.native="tapGrid('cwgx')" >
				<uni-icons class="icon" color="#007AFF" type="gift" size="26"></uni-icons>
				<text class="text">财务共享</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid('dzqk')">
				<uni-icons class="icon" color="#007AFF" type="gift" size="26"></uni-icons>
				<text class="text">电子期刊</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid('dagl')">
				<uni-icons class="icon" color="#007AFF" type="gift" size="26"></uni-icons>
				<text class="text">档案管理</text>
			</uni-grid-item>
		</uni-grid>
			
		<!-- 宫格 -->
		<uni-section title="其他应用" style="margin: 0;" type="line"></uni-section>
		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item" @click.native="tapGrid('wxgd')">
				<uni-icons class="icon" color="#007AFF" type="gear" size="26"></uni-icons>
				<text class="text">维修工单</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid('ysgx')">
				<uni-icons class="icon" color="#007AFF" type="gear-filled" size="26"></uni-icons>
				<text class="text">验收工序</text>
			</uni-grid-item>
			<uni-grid-item class="item" @click.native="tapGrid(1)" >
				<uni-icons class="icon" color="#007AFF" type="shop" size="26"></uni-icons>
				<text class="text">待定应用</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid(2)" >
				<uni-icons class="icon" color="#007AFF" type="shop" size="26"></uni-icons>
				<text class="text">待定应用</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid(3)">
				<uni-icons class="icon" color="#007AFF" type="shop" size="26"></uni-icons>
				<text class="text">待定应用</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid(4)" >
				<uni-icons class="icon" color="#007AFF" type="shop" size="26"></uni-icons>
				<text class="text">待定应用</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid(5)">
				<uni-icons class="icon" color="#007AFF" type="shop" size="26"></uni-icons>
				<text class="text">待定应用</text>
			</uni-grid-item>
			<uni-grid-item class="item"  @click.native="tapGrid(6)">
				<uni-icons class="icon" color="#007AFF" type="shop" size="26"></uni-icons>
				<text class="text">待定应用</text>
			</uni-grid-item>
		</uni-grid>
		<!-- <uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-for="(item,index) in gridList" @click.native="tapGrid(index+1)" :key="index">
				<uni-icons class="icon" color="#007AFF" :type="item.icon" size="26"></uni-icons>
				<text class="text">{{item.text}}</text>
			</uni-grid-item>
		</uni-grid> -->
	</view>
</template>

<script>
	import {
		mapGetters,
	} from 'vuex';
	import statusBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar";
	export default {
		components: {
			statusBar
		},
		data() {
			return {
				bannerData:"",
				gridList: [{
						"text": "应用1",
						"icon": "chat"
					},
					{
						"text": "应用2",
						"icon": "cloud-upload"
					},
					{
						"text": "应用3",
						"icon": "contact"
					},
					{
						"text": "应用4",
						"icon": "download"
					}
				],
				current: 0,
				swiperDotIndex: 0
			}
		},
		computed: {
			...mapGetters({
				hasLogin: 'user/hasLogin',
				info:'user/info'
			})
		},
		onLoad() {
			// 获取网站图片信息
			
			  uni.request({
			  	url: "http://118.118.118.21:8001/api/webinfo/infoimg/getbannerpic",
			  	method: 'GET',
			  	data: {},
			  	success: res => {
			  		console.log(res.data.data);
					this.bannerData = res.data.data;
			  	},
			  	fail: (err) => {
			  		console.log("网络异常...");
			  	},
			  });
		},
		methods: {
			tapGrid(index) {
				if(index == 'wxgd'){
					// 维修工单
					uni.navigateTo({	// 维修工单
						url: '../application/repair/index',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else if(index == 'ysgx'){	//验收工序
					uni.navigateTo({
						url: '../application/check/index',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else if(index == 'gsgw'){	//公司官网
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=http://118.118.118.21&title=公司官网',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else if(index == 'ydyy'){	//移动应用
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=http://192.168.7.44:50081&title=移动应用',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else if(index == 'cwgx'){	//财务共享
					var user = 'LX012';
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=http://www.jlepc.com.cn:30010/home?sno='+user+'&title=财务共享',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else if(index == 'wdxt'){	// 文档系统
				
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=http://118.118.118.114/hola&title=文档管理系统',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else if(index == 'oa'){		
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=http://118.118.118.31:8080&title=OA系统',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else if(index == 'stdc'){		// 食堂订餐
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=http://118.118.118.67/yuding/index.html#/login/userLogin&title=食堂订餐',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else if(index == 'dagl'){		// 档案管理
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=http://118.118.118.113:8080/Lams/login.do&title=档案管理',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else if(index == 'dzqk'){		// 电子期刊
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=http://118.118.118.21/news_list.php?cid=108&title=电子期刊',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				
				
				else{
					uni.showToast({
						title: "你点击了第 " + index +"个",
						icon: 'none'
					});
					
				}
			},
			/**
			 * banner加载后触发的回调
			 */
			onqueryload(data) {
			},
			changeSwiper(e) {
				this.current = e.detail.current
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			/**
			 * 点击banner的处理
			 */
			clickBannerItem(item) {
				// 有外部链接-跳转url
				if (item.open_url) {
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=' + item.open_url + '&title=' + item.title,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				// 其余业务处理
			}
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}
	view {
		font-size: 14px;
		line-height: inherit;
	}
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	/* #endif */

	/* #ifdef APP-NVUE */
	.warp {
		background-color: #fff;
	}
	/* #endif */

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.image {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		text-align: center;
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid {
		background-color: #FFFFFF;
		margin-bottom: 6px;
	}
	
	.uni-grid .text {
		font-size: 30rpx;
		height: 25px;
		line-height: 25px;
		color: #817f82;
	}
	
	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}
	
	.banner-image {
		width: 750rpx;
		height: 400rpx;
	}

	.swiper-box {
		height: 400rpx;
	}

	.search-icons {
		padding: 16rpx;
	}

	.search-container-bar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}

	/* #ifndef APP-NVUE || VUE3*/
	/deep/
	/* #endif */
	.uni-searchbar__box {
		border-width: 0;
	}

	/* #ifndef APP-NVUE || VUE3 */
	/deep/
	/* #endif */
	.uni-input-placeholder {
		font-size: 28rpx;
	}
</style>
