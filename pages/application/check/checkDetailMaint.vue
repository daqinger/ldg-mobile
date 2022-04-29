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
					<uni-section  title="我的待验收项目工序" style="margin: 0;" type="line"></uni-section>
					<uni-notice-bar :scrollable="true" :showIcon="true" :single="true" text="长按进行验收,点击查看记录卡详细信息"></uni-notice-bar>
					<scroll-view scroll-y="true" class="scroll-Y">
						
						<view v-for="(item,index) in myData" @longpress="longtap(item)"  @touchend="touchEnd" @touchmove="touchMove">
						  <uni-card :title="'序号： '+(index+1)" extra=">" @click="toDetail(item)">
							  <uni-list>
								<uni-list-item title="工序编号" :note="item.stageNo"></uni-list-item>
								<uni-list-item title="工序名称" :note="item.stageName"></uni-list-item>
								<uni-list-item title="检查标准" :note="item.inspectionStandart"></uni-list-item>
								<uni-list-item title="已验收人" :note="item.finishAccepter"></uni-list-item>
								<uni-list-item title="全部验收人" :note="item.allAccepter"></uni-list-item>
								<uni-list-item title="备注" :note="item.remark"></uni-list-item>
								<uni-list-item title="状态" :note="item.state"></uni-list-item>
								
							  </uni-list>
						</uni-card>
						  
						</view>
						<!-- <uni-list v-for="(item,index) in myData">
							<view @longtap="longtap(item)">
							<uni-list-item 
							:thumb="(item.dpmCheckPoint==''||item.dpmCheckPoint==null)?'/static/application/repair/check_point_false.png':'/static/application/repair/check_point_true.png'"
							thumbSize="lg"
							:title="'检修编号:'+item.techNo" 
							clickable :note="'检修记录:'+item.techName" 
							:rightText="item.state==''||item.state==null?'无状态':item.state" 
							@click="toDetail(item)"></uni-list-item>
							</view>
						</uni-list> -->
						<image class="holder_img" v-if="myData==''" src="../../../static/application/repair/wait_holder.png" mode="aspectFit"></image>
					 </scroll-view>			
				</swiper-item>
			     <swiper-item class="swiper-item">
					 <uni-section  title="全部验收项目工序" style="margin: 0;" type="line"></uni-section>
			
					<scroll-view scroll-y="true" class="scroll-Y">
						
						<view v-for="(item,index) in allData" >
						  <uni-card :title="'序号： '+(index+1)" extra=">" @click="toDetail(item)">
							  <uni-list>
								<uni-list-item title="工序编号" :note="item.stageNo"></uni-list-item>
								<uni-list-item title="工序名称" :note="item.stageName"></uni-list-item>
								<uni-list-item title="检查标准" :note="item.inspectionStandart"></uni-list-item>
								<uni-list-item title="已验收人" :note="item.finishAccepter"></uni-list-item>
								<uni-list-item title="全部验收人" :note="item.allAccepter"></uni-list-item>
								<uni-list-item title="备注" :note="item.remark"></uni-list-item>
								<uni-list-item title="状态" :note="item.state"></uni-list-item>
								
							  </uni-list>
						</uni-card>
						  
						</view>
						
						
						<!-- <uni-list v-for="(item,index) in allData">
							<view >
							<uni-list-item 
							:thumb="(item.dpmCheckPoint==''||item.dpmCheckPoint==null)?'/static/application/repair/check_point_false.png':'/static/application/repair/check_point_true.png'"
							thumbSize="lg"
							:title="'检修编号:'+item.techNo" 
							clickable :note="'检修记录:'+item.techName" 
							:rightText="item.state==''||item.state==null?'无状态':item.state" 
							@click="toDetail(item)"></uni-list-item>
							</view>
						</uni-list> -->
					 </scroll-view>		
			     </swiper-item>
				<swiper-item class="swiper-item">		
				<uni-section  title="待验收的项目工序" style="margin: 0;" type="line"></uni-section>

					<scroll-view scroll-y="true" class="scroll-Y">
						
						<view v-for="(item,index) in waitData">
						  <uni-card :title="'序号： '+(index+1)" extra=">" @click="toDetail(item)">
							  <uni-list>
								<uni-list-item title="工序编号" :note="item.stageNo"></uni-list-item>
								<uni-list-item title="工序名称" :note="item.stageName"></uni-list-item>
								<uni-list-item title="检查标准" :note="item.inspectionStandart"></uni-list-item>
								<uni-list-item title="已验收人" :note="item.finishAccepter"></uni-list-item>
								<uni-list-item title="全部验收人" :note="item.allAccepter"></uni-list-item>
								<uni-list-item title="备注" :note="item.remark"></uni-list-item>
								<uni-list-item title="状态" :note="item.state"></uni-list-item>
								
							  </uni-list>
						</uni-card>
						  
						</view>
						
						<!-- <uni-list v-if="waitData!=''" v-for="(item,index) in waitData">
						<view @longtap="longtap(item)">
						<uni-list-item 
						:thumb="(item.dpmCheckPoint==''||item.dpmCheckPoint==null)?'/static/application/repair/check_point_false.png':'/static/application/repair/check_point_true.png'"
						thumbSize="lg"
						:title="'检修编号:'+item.techNo" 
						clickable :note="'检修记录:'+item.techName" 
						:rightText="item.state==''||item.state==null?'无状态':item.state" 
						@click="toDetail(item)"></uni-list-item>
						</view>		
						</uni-list> -->
						<image class="holder_img" v-if="waitData==''" src="../../../static/application/repair/wait_holder.png" mode="aspectFit"></image>
						
					</scroll-view>		
				</swiper-item>
			
				<swiper-item class="swiper-item">
					<uni-section  title="已验收的项目工序" style="margin: 0;" type="line"></uni-section>
						<scroll-view scroll-y="true" class="scroll-Y">
							<view v-for="(item,index) in finishData">
							  <uni-card :title="'序号： '+(index+1)" extra=">" @click="toDetail(item)">
								  <uni-list>
									<uni-list-item title="工序编号" :note="item.stageNo"></uni-list-item>
									<uni-list-item title="工序名称" :note="item.stageName"></uni-list-item>
									<uni-list-item title="检查标准" :note="item.inspectionStandart"></uni-list-item>
									<uni-list-item title="已验收人" :note="item.finishAccepter"></uni-list-item>
									<uni-list-item title="全部验收人" :note="item.allAccepter"></uni-list-item>
									<uni-list-item title="备注" :note="item.remark"></uni-list-item>
									<uni-list-item title="状态" :note="item.state"></uni-list-item>
									
								  </uni-list>
							</uni-card>  
							</view>
							<!-- <uni-list v-if="finishData!=''" v-for="(item,index) in finishData">
								<view @longtap="longtap(item)">
								<uni-list-item 
								:thumb="(item.dpmCheckPoint==''||item.dpmCheckPoint==null)?'/static/application/repair/check_point_false.png':'/static/application/repair/check_point_true.png'"
								thumbSize="lg"
								:title="'检修编号:'+item.techNo" 
								clickable :note="'检修记录:'+item.techName" 
								:rightText="item.state==''||item.state==null?'无状态':item.state" 
								@click="toDetail(item)"></uni-list-item>
								</view>
							</uni-list> -->
							<image class="holder_img" v-if="finishData==''" src="../../../static/application/repair/finish_holder.png" mode="aspectFit"></image>
							
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
				ifLongtap:true,
                tabBars: [{
                    name: '我的',
                    id: 'redian'
                },{
                    name: '全部',
                    id: 'guanzhu'
                }, {
                    name: '待完成',
                    id: 'tuijian'
                }, {
                    name: '已完成',
                    id: 'tiyu'
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
	   async onLoad(e) {
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
					url: '../repair/recordCard?planNo=' + item.planNo+'&lineNo='+item.lineNo+'&stageId='+item.stageId+'&editFlag='+editFlag,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			longtap(item){
				console.log("被长按....",item);
				var userNum = this.userInfo.username;
				var that = this;
				uni.showModal({
					title: '验收提醒',
					content: '是否进行验收',
					success: function (res) {
						if (res.confirm) {
							
							uni.showModal({
								title: '验收中',
								content: '',
								editable:true,
								placeholderText:"备注或理由，可不填",
								cancelText:"让步",
								confirmText:"合格",
								success: function (res) {
									if (res.confirm) {
										item.uid = userNum;
										item.remark = res.content;
										item.acceResult = "合格";
										console.log("上传的参数为",item);
										
										that.saveData(item);
										
									} else if (res.cancel) {
										item.uid = userNum;
										item.remark = res.content;
										item.acceResult = "让步";
										console.log("上传的参数为",item);
										
										that.saveData(item);
									}
								}
							});
						} else if (res.cancel) {
							
						}
					}
				});
			},
			async saveData(data){
				//设备清单 - 项目确认
				await this.$requestMaintPlanLine({
							url:'/savestageacceptance',
							data:data,
							method:'POST',
							info:true
						});
						
				this.getData(false);
			},
			async getData(loading){
				var woNo = this.param.woNo;
				var userNum = this.userInfo.username;
				
				// 从服务器获取全部的检修记录
				var records =await this.$requestMaintPlanLine({
							url:'/getcheckpointmaintstage/'+woNo,
							loading:loading
						});
						
				console.log(records);
				//将数据拆成已完成和未完成
				this.allData = records;
				this.finishData = [];
				this.waitData = [];
				this.myData = [];
				for(var i in records){
					if(records[i].finishAccepter!=records[i].allAccepter){
						this.waitData.push(records[i]);
						// 待验收
						if(records[i].allAccepter.indexOf(userNum)!=-1){
							this.myData.push(records[i]);
						}
						
					}else{
						this.finishData.push(records[i]);
					}
				}
				
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
