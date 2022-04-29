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
					 <uni-section  title="全部检修工序" style="margin: 0;" type="line"></uni-section>
					 <uni-notice-bar :scrollable="true" :showIcon="true" :single="true" text="带有颜色图标的检修工序有记录卡,灰色图标的检修工序没有记录卡"></uni-notice-bar>
					<scroll-view scroll-y="true" class="scroll-Y">
						<uni-list v-for="(item,index) in allData">
						<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
							<uni-list-item 
							:thumb="item.cardFlag=='TRUE'?'/static/application/repair/record_true.png':'/static/application/repair/record_false.png'"
							thumbSize="lg"
							:title="item.dpmCheckPoint?'工序编号:'+item.stageNo+' - '+item.dpmCheckPoint+'点检验点':'工序编号:'+item.stageNo" 
							clickable :note="item.stageName" 
							:rightText="item.rowstate==''||item.rowstate==null?'无状态':item.rowstate" 
							@click="toDetail(item)"></uni-list-item>
							</view>
						</uni-list>
					 </scroll-view>		
			     </swiper-item>
				<swiper-item class="swiper-item">		
				<uni-section  title="待完成的检修工序" style="margin: 0;" type="line"></uni-section>
				<uni-notice-bar :scrollable="true" :showIcon="true" :single="true" text="带有颜色图标的检修工序有记录卡,灰色图标的检修工序没有记录卡"></uni-notice-bar>
					<scroll-view scroll-y="true" class="scroll-Y">
						
						<uni-list v-if="waitData!=''" v-for="(item,index) in waitData">
					<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
							<uni-list-item 
							:thumb="item.cardFlag=='TRUE'?'/static/application/repair/record_true.png':'/static/application/repair/record_false.png'"
							thumbSize="lg"
							:title="item.dpmCheckPoint?'工序编号:'+item.stageNo+' - '+item.dpmCheckPoint+'点检验点':'工序编号:'+item.stageNo" 
							clickable :note="item.stageName" 
							:rightText="item.rowstate==''||item.rowstate==null?'无状态':item.rowstate" 
							@click="toDetail(item)"></uni-list-item>
							</view>				
						</uni-list>
						<image class="holder_img" v-if="waitData==''" src="../../../static/application/repair/wait_holder.png" mode="aspectFit"></image>
						
					</scroll-view>		
				</swiper-item>
			
				<swiper-item class="swiper-item">
					<uni-section  title="已完成的检修工序" style="margin: 0;" type="line"></uni-section>
					<uni-notice-bar :scrollable="true" :showIcon="true" :single="true" text="带有颜色图标的检修工序有记录卡,灰色图标的检修工序没有记录卡"></uni-notice-bar>
						<scroll-view scroll-y="true" class="scroll-Y">
							
							<uni-list v-if="finishData!=''" v-for="(item,index) in finishData">
						<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
								<uni-list-item 
								:thumb="item.cardFlag=='TRUE'?'/static/application/repair/record_true.png':'/static/application/repair/record_false.png'"
								thumbSize="lg"
								:title="item.dpmCheckPoint?'工序编号:'+item.stageNo+' - '+item.dpmCheckPoint+'点检验点':'工序编号:'+item.stageNo" 
								clickable :note="item.stageName" 
								:rightText="item.rowstate==''||item.rowstate==null?'无状态':item.rowstate" 
								@click="toDetail(item)"></uni-list-item>
								</view>
							</uni-list>
							<image class="holder_img" v-if="finishData==''" src="../../../static/application/repair/finish_holder.png" mode="aspectFit"></image>
							
						</scroll-view>		
				</swiper-item>
				
				<swiper-item class="swiper-item">
					<uni-section  title="待验收工序" style="margin: 0;" type="line"></uni-section>
					<scroll-view scroll-y="true" class="scroll-Y">
						<uni-list v-if="checkData!=''" v-for="(item,index) in checkData">
					<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
							<uni-list-item 
							:thumb="item.cardFlag=='TRUE'?'/static/application/repair/record_true.png':'/static/application/repair/record_false.png'"
							thumbSize="lg"
							:title="item.dpmCheckPoint?'工序编号:'+item.stageNo+' - '+item.dpmCheckPoint+'点检验点':'工序编号:'+item.stageNo" 
							clickable :note="item.stageName" 
							:rightText="item.rowstate==''||item.rowstate==null?'无状态':item.rowstate" 
							@click="toDetail(item)"></uni-list-item>
							</view>
						</uni-list>
						<image class="holder_img" v-if="checkData==''" src="../../../static/application/repair/finish_holder.png" mode="aspectFit"></image>
				<!-- 		<view v-for="(item,index) in detailData">
						  <uni-card :title="item.projectName">
							  <uni-list>
								<uni-list-item title="计划号" :note="item.planNo"></uni-list-item>
								<uni-list-item title="行号" :note="item.lineNo"></uni-list-item>
								<uni-list-item title="检修项目编号" :note="item.projectNo"></uni-list-item>
								<uni-list-item title="执行人工号" :note="item.executePerson==''?'空':item.executePerson"></uni-list-item>
								<uni-list-item title="执行人姓名" :note="item.executeName==''?'空':item.executeName"></uni-list-item>
							  </uni-list>
						</uni-card>
						</view> -->
						
					</scroll-view>
				</swiper-item>
			 </swiper>
		<!-- </view> -->
    </view>
</template>
<script>

    export default {

        data() {
            return {
                tabIndex: 0,
				ifLongtap: true,
                tabBars: [{
                    name: '全部',
                    id: 'guanzhu'
                }, {
                    name: '待完成',
                    id: 'tuijian'
                }, {
                    name: '已完成',
                    id: 'tiyu'
                }, {
                    name: '检验点',
                    id: 'redian'
                }],
                scrollInto: "",
				allData:[],
				finishData:[],
				waitData:[],
				checkData:[],
				param:{
					planNo:'',
					lineNo:'',
					projectId:''
				}
            }
        },
		onLoad(e) {
			this.param.planNo = e.planNo;
			this.param.lineNo = e.lineNo;
			this.param.projectId = e.projectId;
			
			this.getData(true)  
		},
        methods: {
			touchEnd() {
				this.ifLongtap = true;
			},
			touchMove(e) {
				// 手指触摸后的移动事件
				this.ifLongtap = false;
			},
			async saveData(data){
				// 非设备清单 - 工序确认
				await this.$requestMaintPlanLine({
							url:'/savestageexecuteperson',
							data:data,
							method:'POST',
							info:true
						});
						
				this.getData(false);
			},
			async getData(loading){
				var planNo = this.param.planNo;
				var lineNo = this.param.lineNo;
				var projectId = this.param.projectId;
				// var userNum = this.userInfo.username;
				
				// 从服务器获取全部的检修项目
				var inspectItems =await this.$requestMaintPlanLine({
							url:'/getmaintstage/'+planNo+'/'+lineNo+'/'+projectId,
							loading:loading
						});
						
				console.log(inspectItems);
				//将数据拆成已完成和未完成
				this.allData = inspectItems;
				this.finishData = [];
				this.waitData = [];
				for(var i in inspectItems){
					if(inspectItems[i].rowstate != "已确定"){
						this.waitData.push(inspectItems[i]);
						
					}else{
						this.finishData.push(inspectItems[i]);
					}
					
					// 有检验点的工序
					if(inspectItems[i].dpmCheckPoint!=null){
						this.checkData.push(inspectItems[i]);
					}
				
				}
		
				this.loading='';
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
			finishRepairStep(stageId){
				this.waitData.some((item, i) => {
					// debugger
				  if (item.stageId == stageId) {
					  item.rowstate = "完成";
					this.finishData.push(item);
				    this.waitData.splice(i, 1)
				    return true //当内部return true时跳出整个循环
				  }
				})
			},
			
			longtap(item){
				if (this.ifLongtap) {
					console.log("被长按....",item);
					var that = this;
					uni.showModal({
						title: '是否确认工序',
						content: '',
						editable:true,
						placeholderText:"备注",
						success: function (res) {
							if (res.confirm) {
								item.outState = "Confirm";	// 或者是  Confirmed
								item.remark = res.content;
								console.log("上传的参数为",item);
								
								that.saveData(item);
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
	
			toDetail(item){
				var that = this;
				
				// 先判断状态
				if(item.rowstate == "已确定"){
					// 当是已确定的时候，不能修改 且是记录卡 打开记录卡
					if(item.cardFlag=='FALSE'){
						// 什么都不做
						return;
					}else{
						that.openCard(item,'N');
					}
				}else{
					// 还没完成状态
					if(item.cardFlag=='FALSE'){
						// 没有记录卡，查看是不是检查点
						if(item.dpmCheckPoint != null &&item.dpmCheckPoint != ""){
							//是检验点
							// 弹出对话框 
							
							//  是检查点的话  也要去记录卡页面 申请验收
							that.openCard(item,'Y');
							
							// uni.showModal({
							//     title: '申请验收',
							//     content: '确认申请验收？',
							// 	editable:true,
							// 	placeholderText:"验收人工号",
							//     success: function (res) {
							//         if (res.confirm) {
							//             console.log('用户点击确定');
							// 			// 模拟网络请求
							// 			uni.showLoading({
							// 			    title: '提交中'
							// 			});
										
							// 			setTimeout(function () {
							// 			    uni.hideLoading();
											
							// 				uni.showToast({
							// 				    title: '提交成功！',
							// 				    duration: 2000
							// 				});
							// 			}, 2000);
															
							//         } else if (res.cancel) {
							//             console.log('用户点击取消');
							//         }
							//     }
							// });
							
						}else{
							
							// 把工序确认放到长按事件中
							return;
							
							// 做些事情
							// uni.showModal({
							//     title: '工序确认',
							//     content: '确认此工序已检修完成？',
							//     success: function (res) {
							//         if (res.confirm) {
							//             console.log('用户点击确定');
							// 			// 模拟网络请求
							// 			uni.showLoading({
							// 			    title: '提交中'
							// 			});
										
							// 			setTimeout(function () {
							// 			    uni.hideLoading();
											
							// 				uni.showToast({
							// 				    title: '提交成功！',
							// 				    duration: 2000
							// 				});
											
							// 				// 修改页面的数据
							// 				// that.finishRepairStep(stageId);
							// 				that.getData();
											
							// 			}, 2000);
										
																
							//         } else if (res.cancel) {
							//             console.log('用户点击取消');
							//         }
							//     }
							// });
						}
							
					}else{
						that.openCard(item,'Y');
					}
					
				}
				
			},
			// 打开记录卡 
			openCard(item,editFlag){
				console.log("dpmCheckPoint",item.dpmCheckPoint);
				uni.navigateTo({
					url: './recordCard?planNo=' + item.planNo+'&lineNo='+item.lineNo+'&stageId='+item.stageId+'&editFlag='+editFlag,
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
	.warning{
		background-color: #f3ffff;
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
	
	.holder_img{
		
		display: flex;
		width: 20vh;
		margin: 0 auto;
		margin-top: 300rpx;
	}
   
</style>
