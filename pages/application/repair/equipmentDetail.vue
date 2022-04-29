<!-- 概览设备清单详细页面 -->
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
					 <uni-notice-bar :scrollable="true" :showIcon="true" :single="true" text="带有颜色图标的检修记录是检验点,灰色图标的检修记录不是检验点"></uni-notice-bar>
					<scroll-view scroll-y="true" class="scroll-Y">
						<uni-list v-for="(item,index) in allData">
							<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
							<uni-list-item 
							:thumb="(item.dpmCheckPoint==''||item.dpmCheckPoint==null)?'/static/application/repair/check_point_false.png':'/static/application/repair/check_point_true.png'"
							thumbSize="lg"
							:title="'检修编号:'+item.techNo" 
							clickable :note="'检修记录:'+item.techName" 
							:rightText="item.state==''||item.state==null?'无状态':item.state" 
							@click="toDetail(item)"></uni-list-item>
							</view>
						</uni-list>
					 </scroll-view>		
			     </swiper-item>
				<swiper-item class="swiper-item">		
				<uni-section  title="待完成的检修工序" style="margin: 0;" type="line"></uni-section>
				<uni-notice-bar :scrollable="true" :showIcon="true" :single="true" text="带有颜色图标的检修记录是检验点,灰色图标的检修记录不是检验点"></uni-notice-bar>
					<scroll-view scroll-y="true" class="scroll-Y">
						
						<uni-list v-if="waitData!=''" v-for="(item,index) in waitData">
					<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
						<uni-list-item 
						:thumb="(item.dpmCheckPoint==''||item.dpmCheckPoint==null)?'/static/application/repair/check_point_false.png':'/static/application/repair/check_point_true.png'"
						thumbSize="lg"
						:title="'检修编号:'+item.techNo" 
						clickable :note="'检修记录:'+item.techName" 
						:rightText="item.state==''||item.state==null?'无状态':item.state" 
						@click="toDetail(item)"></uni-list-item>
						</view>		
						</uni-list>
						<image class="holder_img" v-if="waitData==''" src="../../../static/application/repair/wait_holder.png" mode="aspectFit"></image>
						
					</scroll-view>		
				</swiper-item>
			
				<swiper-item class="swiper-item">
					<uni-section  title="已完成的检修工序" style="margin: 0;" type="line"></uni-section>
					<uni-notice-bar :scrollable="true" :showIcon="true" :single="true" text="带有颜色图标的检修记录是检验点,灰色图标的检修记录不是检验点"></uni-notice-bar>
						<scroll-view scroll-y="true" class="scroll-Y">
							
							<uni-list v-if="finishData!=''" v-for="(item,index) in finishData">
						<view @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
								<uni-list-item 
								:thumb="(item.dpmCheckPoint==''||item.dpmCheckPoint==null)?'/static/application/repair/check_point_false.png':'/static/application/repair/check_point_true.png'"
								thumbSize="lg"
								:title="'检修编号:'+item.techNo" 
								clickable :note="'检修记录:'+item.techName" 
								:rightText="item.state==''||item.state==null?'无状态':item.state" 
								@click="toDetail(item)"></uni-list-item>
								</view>
							</uni-list>
							<image class="holder_img" v-if="finishData==''" src="../../../static/application/repair/finish_holder.png" mode="aspectFit"></image>
							
						</scroll-view>		
				</swiper-item>
				
				<swiper-item class="swiper-item">
					<uni-section  title="设备清单详情" style="margin: 0;" type="line"></uni-section>
					
					<scroll-view scroll-y="true" class="scroll-Y">
						
						<uni-card :title="detailData.mchName">
							  <uni-list>
								<uni-list-item title="编号" :note="detailData.sortNo"></uni-list-item>
							  	<uni-list-item title="附属设备编码" :note="detailData.dpmMchCode"></uni-list-item>
							  	<uni-list-item title="设备类型" :note="detailData.equipType"></uni-list-item>
							  	<uni-list-item title="设备类型描述" :note="detailData.equipTypeDesc"></uni-list-item>
							  	<uni-list-item title="定值" :note="detailData.fixedValue"></uni-list-item>
							  	<uni-list-item title="状态" :note="detailData.state"></uni-list-item>
								
							  </uni-list>
						</uni-card>
						
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
                    name: '清单详情',
                    id: 'redian'
                }],
                scrollInto: "",
				allData:[],
				finishData:[],
				waitData:[],
				detailData:{
					mchName:'',
					sortNo:'',
					dpmMchCode:'',
					equipType:'',
					equipTypeDesc:'',
					fixedValue:'',
					state:'',
				},
				param:{
					planNo:'',
					lineNo:'',
					seqNo:''
				}
            }
        },
	   async onLoad(e) {
		this.param.planNo = e.planNo;
		this.param.lineNo = e.lineNo;
		this.param.seqNo = e.seqNo;
		
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
			finishRepairStep(stageId){
				this.waitData.some((item, i) => {
					// debugger
				  if (item.stageId == stageId) {
					  item.state = "已确定";
					this.finishData.push(item);
				    this.waitData.splice(i, 1)
				    return true //当内部return true时跳出整个循环
				  }
				})
			},
			toDetail(item){
				var that = this;
				
				// 先判断状态
				if(item.state == "已确定"){
					// 当是已确定的时候，不能修改
					that.openCard(item,'N');
					
				}else{
					// 还没完成状态
					that.openCard(item,'Y');			
				}
				
			},
			// 打开记录卡 
			openCard(item,editFlag){
				console.log("dpmCheckPoint",item.dpmCheckPoint);
				uni.navigateTo({
					url: './equipmentCard?planNo=' + item.planNo+'&lineNo='+item.lineNo+'&seqNo='+item.seqNo+'&techId='+item.techId+'&editFlag='+editFlag,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			longtap(item){
				if (this.ifLongtap) {
					console.log("被长按....",item);
					// var userNum = this.userInfo.username;
					var that = this;
					uni.showModal({
						title: '是否确认项目',
						content: '',
						editable:true,
						placeholderText:"备注",
						success: function (res) {
							if (res.confirm) {
								item.outState = "Confirmed";
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
			async saveData(data){
				//设备清单 - 项目确认
				await this.$requestMaintPlanLine({
							url:'/saveequipexecuteperson',
							data:data,
							method:'POST',
							info:true
						});
						
				this.getData(false);
			},
			async getData(loading){
				var planNo = this.param.planNo;
				var lineNo = this.param.lineNo;
				var seqNo = this.param.seqNo;
				// var userNum = this.userInfo.username;
				
				// 从服务器获取全部的检修记录
				var inspectItems =await this.$requestMaintPlanLine({
							url:'/getequiprecord/'+planNo+'/'+lineNo+'/'+seqNo,
							loading:loading
						});
						
				console.log(inspectItems);
				//将数据拆成已完成和未完成
				this.allData = inspectItems;
				this.finishData = [];
				this.waitData = [];
				for(var i in inspectItems){
					if(inspectItems[i].state != "已确定"){
						this.waitData.push(inspectItems[i])
					}else{
						this.finishData.push(inspectItems[i])
					}
				}
				
				// 获取其设备清单详细信息
				var detail =await this.$requestMaintPlanLine({
							url:'/getdetailequipList/'+planNo+'/'+lineNo+'/'+seqNo,
						});
				this.detailData = detail;
						
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
