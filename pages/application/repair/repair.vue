<!-- 检修项目 -->
<template>
    <view class="tabs" >
       <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="true" :scroll-into-view="scrollInto">
            <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
                <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
            </view>
        </scroll-view>
        <view class="line-h"></view>
		<!-- <view class="warp"> -->
			<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
			     <swiper-item class="swiper-item">
					 <uni-section  title="全部检修项目" style="margin: 0;" type="line"></uni-section>
					<scroll-view scroll-y="true" class="scroll-Y">
						<uni-list v-for="(item,index) in allData">
					<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
							<uni-list-item :title="item.projectNo+' '+item.projectName" :note="item.executePersondesc" clickable  :rightText="item.state" @click="toDetail(item.planNo,item.lineNo,item.projectId)"></uni-list-item>
							</view>
						</uni-list>
					 </scroll-view>		
			     </swiper-item>
				<swiper-item class="swiper-item">		
				<uni-section  title="待完成的检修项目" style="margin: 0;" type="line"></uni-section>
					<scroll-view scroll-y="true" class="scroll-Y">
						
						<uni-list v-if="waitData!=''" v-for="(item,index) in waitData">
						<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
							<uni-list-item :title="item.projectNo+' '+item.projectName" :note="item.executePersondesc" clickable  :rightText="item.state" @click="toDetail(item.planNo,item.lineNo,item.projectId)"></uni-list-item>
							</view>
						</uni-list>
						<image v-if="waitData==''" src="../../../static/application/repair/wait_holder.png" mode="aspectFit"></image>
						
					</scroll-view>		
				</swiper-item>
			
				<swiper-item class="swiper-item">
					<uni-section  title="已完成的检修项目" style="margin: 0;" type="line"></uni-section>
					<scroll-view scroll-y="true" class="scroll-Y">
						
						<uni-list v-if="finishData!=''" v-for="(item,index) in finishData">
				<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
							<uni-list-item :title="item.projectNo+' '+item.projectName" :note="item.executePersondesc" clickable  :rightText="item.state" @click="toDetail(item.planNo,item.lineNo,item.projectId)"></uni-list-item>
							</view>
						</uni-list>
						<image v-if="finishData==''" src="../../../static/application/repair/finish_holder.png" mode="aspectFit"></image>
					
					</scroll-view>
				</swiper-item>
				
				<swiper-item class="swiper-item">
					<uni-section  title="我的待完成检修项目" style="margin: 0;" type="line"></uni-section>
					<scroll-view scroll-y="true" class="scroll-Y">
						
						<uni-list v-if="myData!=''" v-for="(item,index) in myData">
				<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
							<uni-list-item :title="item.projectNo+' '+item.projectName" :note="item.executePersondesc" clickable  :rightText="item.state" @click="toDetail(item.planNo,item.lineNo,item.projectId)"></uni-list-item>
							</view>
						</uni-list>
						<image v-if="myData==''" src="../../../static/application/repair/finish_holder.png" mode="aspectFit"></image>
					
					</scroll-view>
				</swiper-item>
			 </swiper>
		<!-- </view> -->
    </view>
</template>
<script>
	import {
		mapMutations,mapGetters
	} from 'vuex';

    export default {
		computed: {
			...mapGetters({
				userInfo: 'user/info'
			})
		},
        data() {
            return {
                tabIndex: 0,
				ifLongtap: true,
                tabBars: [{
                    name: '全部',
                    id: 'all'
                }, {
                    name: '待完成',
                    id: 'ready'
                }, {
                    name: '已完成',
                    id: 'already'
                }, {
                    name: '我的',
                    id: 'mine'
                }],
                scrollInto: "",
				allData:[],
				finishData:[],
				waitData:[],
				myData:[],
				param:{
					woNo:''
				}
            }
        },
		onLoad(e) {
		
		// 获取上个页面传过来的参数
		this.param.woNo = e.woNo;
		this.getData(true);
		
	   
	   },
        methods: {
			touchEnd() {
				this.ifLongtap = true;
			},
			touchMove(e) {
				// 手指触摸后的移动事件
				this.ifLongtap = false;
			},
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
			toDetail(planNo,lineNo,projectId){
				console.log("xxx")
				uni.navigateTo({
					url: './repairStep?planNo=' + planNo+'&lineNo='+lineNo+'&projectId='+projectId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			longtap(item){
				if (this.ifLongtap) {
					var userNum = this.userInfo.username;
					var that = this;
					console.log("被长按....",item);
					uni.showModal({
						title: '提示',
						content: '是否保存项目执行人',
						success: function (res) {
							if (res.confirm) {
								item.executePerson = userNum;
								console.log("上传的参数为",item);
								
								that.saveData(item)
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			
			},
			async saveData(data){
				//保存项目执行人
				await this.$requestMaintPlanLine({
							url:'/savemaintproject',
							data:data,
							method:'POST',
							info:true
						});
						
				this.getData(false);
			},
			async getData(loading){
				var woNo = this.param.woNo;
				var userNum = this.userInfo.username;
				// 从服务器获取全部的检修项目
				var inspectItems =await this.$requestMaintPlanLine({
							url:'/getmaintproject/'+woNo,
							loading:loading
						});
						
				console.log("所有的检修项目：",inspectItems);
				//将数据拆成已完成和未完成
				this.allData = inspectItems;
				this.finishData = [];
				this.waitData = [];
				for(var i in inspectItems){
					if(inspectItems[i].state == "新建"||inspectItems[i].state ==""||inspectItems[i].state=="下达"){
						this.waitData.push(inspectItems[i])
					}else{
						this.finishData.push(inspectItems[i])
					}
				}
				
				// 获取自己的待完成的检修项目
				var userNum = this.userInfo.username;
				var myData =await this.$requestMaintPlanLine({
							url:'/getmainprojectbywonoandperson/'+woNo+'/'+userNum
						});
				console.log("mudata",myData);
				this.myData = myData;		
						
				this.loading='';
			}
        }
    }
</script>

<style>
	
	.swiper-item{
		 
	}
	
	page {
	    width: 100%;
	    min-height: 100%;
	    display: flex;
	}

	.scroll-Y{
		height: 82vh;
		padding-bottom: 50rpx;
		width: 100%;
	
	}
	
	.tabs {
	    flex: 1;
	    flex-direction: column;
	    overflow: hidden;
	    background-color: #ffffff;
	
	    height: 95vh;
	  
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
		overflow-y: auto!important;
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
	
	image{
		
		display: flex;
		width: 20vh;
		margin: 0 auto;
		margin-top: 300rpx;
	}
   
</style>
