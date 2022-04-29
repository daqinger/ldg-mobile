<template>
 <view class="tabs">
	 <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
	     <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
	         <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
	     </view>
	 </scroll-view>
	   <view class="line-h"></view>
	 <swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
	      <swiper-item class="swiper-item">
	 			<uni-list>
	 				<uni-list-item title="标题1" clickable  note="内容1" @click="toDetail"></uni-list-item>
	 				<uni-list-item title="标题2" clickable  note="内容2"></uni-list-item>
	 			</uni-list>
	      </swiper-item>
			<swiper-item class="swiper-item">
			
				<uni-list>
					<uni-list-item title="标题1" clickable  note="内容1" @click="toDetail"></uni-list-item>
					<uni-list-item title="标题2" clickable  note="内容2"></uni-list-item>
				</uni-list>
			</swiper-item>
		
			<swiper-item class="swiper-item">
				<uni-collapse>
					<uni-collapse-item titleBorder="none">
						<template v-slot:title>
							<uni-list>
								<uni-list-item title="设备名称" rightText="已完成">
								</uni-list-item>
							</uni-list>
						</template>
						<view class="content">
							<uni-list>
								<uni-list-item title="标题1" clickable  note="内容1" @click="toDetail"></uni-list-item>
								<uni-list-item title="标题2" clickable  note="内容2"></uni-list-item>
							</uni-list>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</swiper-item>
			
			<swiper-item class="swiper-item">
				界面4
			</swiper-item>
	  </swiper>
 </view>
</template>
<script>

    export default {

        data() {
            return {
                tabIndex: 0,
                tabBars: [{
                    name: '全部',
                    id: 'guanzhu'
                }, {
                    name: '已完成',
                    id: 'tuijian'
                }, {
                    name: '待完成',
                    id: 'tiyu'
                }, {
                    name: '其他',
                    id: 'redian'
                }],
                scrollInto: ""
            }
        },
        onLoad() {
           
        },
        methods: {
            ontabtap(e) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
                this.switchTab(index);
            },
            ontabchange(e) {
                let index = e.target.current || e.detail.current;
                this.switchTab(index);
            },
            switchTab(index) {
                if (this.tabIndex === index) {
                    return;
                }
                this.tabIndex = index;
                this.scrollInto = this.tabBars[index].id;
            },
			toDetail(){
				console.log("xxx")
				uni.navigateTo({
					url: './recordCard',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
        }
    }
</script>

<style>
   .swiper-item{
	   background-color: #007AFF;
   }

   page {
       width: 100%;
       min-height: 100%;
       display: flex;
   }

   
   .tabs {
       flex: 1;
       flex-direction: column;
       overflow: hidden;
       background-color: #ffffff;

       height: 100vh;
  
   }
   
   .scroll-h {
       width: 750rpx;

   	width:100%;

   	height: 80rpx;
       flex-direction: row;
    
       white-space: nowrap;
    
   }
   
   .line-h {
       height: 1rpx;
       background-color: #cccccc;
   }
   
   .uni-tab-item {

       display: inline-block;
    
       flex-wrap: nowrap;
   	width: 25%;
   	text-align: center;
   }
   
   .uni-tab-item-title {
       color: #555;
       font-size: 30rpx;
       height: 80rpx;
       line-height: 80rpx;
       flex-wrap: nowrap;
    
       white-space: nowrap;
     
   }
   
   .uni-tab-item-title-active {
       color: #007AFF;
   }
   
   .swiper-box {
       flex: 1;
   	height: 100%;
   }
   
   .swiper-item {
       flex: 1;
       flex-direction: row;
   	background-color: #ffffff;
   }
   
   .scroll-v {
       flex: 1;
  
       flex-direction: column;

       width: 750rpx;
   	width:100%;
   }
   
</style>
