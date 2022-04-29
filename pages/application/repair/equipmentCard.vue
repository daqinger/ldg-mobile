<!-- 记录卡界面 -->
<template>
	<view class="uni-container">
		<uni-section :title="title" style="margin: 0;" type="line"></uni-section>
		<uni-forms :border="true" label-position="top">
			<uni-forms-item v-show="head.e" name="item1" label="结构图例">
				<image :src="head.e" :data-src="head.e"  @click="showDetail"></image>
			</uni-forms-item>
		
			<uni-forms-item v-for="(item,index) in formData.records" :label="'第'+(index+1)+'项'">
				<uni-row>
					<uni-col><view class="itemTitle">{{item.a+' - '+item.b}}</view></uni-col>
				</uni-row>
				<uni-row >
					<uni-col :span="6"><uni-easyinput  :inputBorder="false" :value="head.c" disabled></uni-easyinput></uni-col>
					<uni-col :span="18">
						<view @longtap="toggle(item.c)">
							<uni-easyinput :inputBorder="false" :value="item.c"  disabled></uni-easyinput>
						</view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="6"><uni-easyinput :inputBorder="false" :value="head.d" disabled trim="both"></uni-easyinput></uni-col>
					<uni-col :span="18"><uni-easyinput placeholder="请输入实测值" v-model="item.d"></uni-easyinput></uni-col>
				</uni-row>
			</uni-forms-item>
			<uni-forms-item name="imgs" label="设备图片">
<!-- 			<view class="image-holder" v-for="(item,index) in images" :key="index">
				<image :src="item" :data-src="item"  @click="showDetail"></image>
			</view> -->			
			<uni-file-picker file-mediatype="image" :limit="6" return-type="array" v-model="formData.imgs">
				</uni-file-picker>
			</uni-forms-item>
			
			<!-- 下面三个只有在验收点的时候才需要展示 -->
			<uni-forms-item name="allAccepter" v-if="checkPoint" label="全部验收人">
				<uni-easyinput disabled v-model="formData.allAccepter"></uni-easyinput>
			</uni-forms-item>
<!-- 			<uni-forms-item name="checkPersonName" v-if="checkPoint" label="验收人姓名">
				<uni-easyinput placeholder="请用空格隔开,用于保存至ERP" v-model="formData.checkPersonName"></uni-easyinput>
			</uni-forms-item> -->
			<uni-forms-item name="finishAccepter" v-if="checkPoint" label="已验收人">
				<uni-easyinput disabled  v-model="formData.finishAccepter"></uni-easyinput>
			</uni-forms-item>
			<view class="uni-button-group" v-if="checkPoint&&!formData.finishAccepter&&editFlag=='Y'">
				<button type="primary" class="uni-button" @click="sendCheckMsg">申请验收</button>
			</view>
			
		</uni-forms>
		<uni-fab ref="fab" :content="content" horizontal="right" vertical="bottom"
			 @trigger="trigger"/>
			 
		 <uni-popup ref="popup" background-color="#fff">
			<view class="popup-content"><text
					class="text">{{standardText}}</text></view>
		 </uni-popup>
	</view>
	
</template>

<script>

	export default {
		data() {
			let formData = {
				"records":[],
				"imgs":[],
				"allAccepter":"",	//全部验收人    格式为：工号-名字空格
				"finishAccepter":""	//已经验收的人
			}
			return {
				head:{
					a:'',
					b:'',
					c:'',
					d:'',
					e:'',
					f:'',
					g:'',
					h:'',
					i:'',
					j:'',
					k:'',
					planNo:'',
					lineNo:'',
					techId:'',
					seqNo:'',
					maintId:'',
					objid:'',
					objversion:''
				},
				formData,
				editFlag:'Y',
				checkPoint:'',	//检验点
				content: [
				{
					text: '保存',
					active: false,
					iconPath: '/static/application/repair/finish.png'
				},
				{
					text: '一键填入',
					active: false,
					iconPath: '/static/application/repair/auto_write.png'
				}],
				
				title:"",
				standardText:"",
				param:{
					planNo:'',
					lineNo:'',
					seqNo:'',
					techId:''
				},
				stage:[],
				woNo:""
				
			}
		},
		onReady() {
		
		},
		async onLoad(e) {
			this.param.planNo = e.planNo;
			this.param.lineNo = e.lineNo;
			this.param.seqNo = e.seqNo;
			this.param.techId = e.techId;
			var editFlag = e.editFlag;
			
			if(editFlag=='N'){
				// 不可修改
				this.content = [];
			}
			this.editFlag = editFlag;
			
			this.getData(false);
			this.getWoNo();
		},
		methods: {
			async getWoNo(){
				var planNo = this.param.planNo
				var lineNo = this.param.lineNo
				var t =  await this.$requestMaintPlanLine({
							url:'/getwonumber/'+planNo+"/"+lineNo
						});
				this.woNo = t;
					
			},
			async getData(loading){
				
				var planNo = this.param.planNo
				var lineNo = this.param.lineNo
				var seqNo = this.param.seqNo
				var techId = this.param.techId
				
				// 从服务器获取对应检修记录详细信息
				var stage= await this.$requestMaintPlanLine({
					url:'/getdetailequiprecord/'+planNo+'/'+lineNo+'/'+seqNo+'/'+techId,
					loading:loading
					
				});
				console.log('检修记录',stage);
				
				// 赋值
				this.stage = stage;
				this.formData.finishAccepter = stage.finishAccepter;
				this.formData.allAccepter = stage.allAccepter;
				this.checkPoint = stage.dpmCheckPoint;
				this.title = stage.techNo+' - '+stage.techName;
				
				console.log("是否是检查点",this.checkPoint)
				
				if(this.checkPoint&&this.editFlag=="Y"){
					this.content = [
						{
							text: '保存',
							active: false,
							iconPath: '/static/application/repair/finish.png'
						},
						{
							text: '一键填入',
							active: false,
							iconPath: '/static/application/repair/auto_write.png'
						},{
							text: '验收人',
							active: false,
							iconPath: '/static/application/repair/add.png'
						},
						{
							text: '验收人',
							active: false,
							iconPath: '/static/application/repair/delete.png'
						}
					]
				}
				
					
				// 从服务器获取记录卡内容
				var recordCards= await this.$requestMaintPlanLine({
					url:'/getequiprecordcard/'+planNo+'/'+lineNo+'/'+seqNo+'/'+techId,
					
				});
				this.head = recordCards[0];

				if(this.head.i){
					var images = this.head.i.split(";");
					this.formData.imgs = [];
					for(var i = 0;i<images.length;i++){
						var temp = {
							name : i+".jpg",
							extname : "jpg",
							url : images[i]
						};
						this.formData.imgs.push(temp);
					}
				}

				recordCards.splice(0,1);//删除第一个，第一行数据暂时没有用
				console.log("记录卡内容2:",recordCards);
				this.formData.records = recordCards;	//赋值
			},
			sendCheckMsg(){
				// 开始执行验收逻辑
				
				// 验收之前先校验是否都填写了
				var tempRecords = this.formData.records;
				var flag = false;
				for(var i in tempRecords){
					if(tempRecords[i].c==''){
						flag = true;
					}
				}
				// 校验是否有验收人
				if(!this.formData.allAccepter){
					flag = true;
				}
				
				if(flag){	//有些记录卡未填写
					uni.showToast({
						title: '有值未填写!',
						icon:'error'
					});	
				}else{
					// 填写表单
					// 填写验收人
					// 点击申请验收
					//     1.更新记录卡信息
					//     2.向企业微信的验收人推送消息
					
					// 更新记录卡信息
					this.updateRecordData();
					
					
					// 推送微信
					this.sendMsgToWechat();
				}
				
			},
			// 更新记录卡信息
			async updateRecordData(){
				console.log(this.formData.imgs);
				
				var data = this.formData.records;
				var head = this.head;
				
				var imgList =  this.formData.imgs;
				var images = '';
				for(var i = 0;i<imgList.length;i++){
					if(i!=imgList.length-1){
						images += imgList[i].url+";"
					}else{
						images += imgList[i].url
					}
					
				}
				console.log(images);
				
				head.i = images;
				
				data.push(head);
				
				console.log("更新记录卡信息...",data);
				
				
				//保存设备清单 记录卡
				await this.$requestMaintPlanLine({
							url:'/saveequiprecordcard',
							data:data,
							method:'POST',
							info:true
						});
						
				this.getData(false);
				
				
				// // 模拟网络请求
				// uni.showLoading({
				//     title: '提交中'
				// });
				
				// setTimeout(function () {
				//     uni.hideLoading();
					
				// 	uni.showToast({
				// 	    title: '提交成功！',
				// 	    duration: 2000
				// 	});
					
				// }, 2000);
			},
			toggle(value) {
				this.standardText = value;
				this.$refs.popup.open("center");
			},
			// 预览图片
			showDetail(e){
				var srcList = new Array();
				srcList.push(e.currentTarget.dataset.src);
				console.log(e.currentTarget.dataset.src);
				// 预览
				uni.previewImage({
					current: 0,
					urls: srcList
				})
			},
			sendMsgToWechat(code){
				// 将英文半角字符 , 替换为  |  
				var allAccepter = this.formData.allAccepter;
				
				var accepterList = allAccepter.split(" ");
				accepterList.pop();
				console.log("验收人列表",accepterList);
				var perssonNum = "";
				
				for(var i=0;i<accepterList.length;i++){
					if(i!=accepterList.length-1){
						perssonNum += accepterList[i].split("-")[0]+"|";
					}else{
						perssonNum += accepterList[i].split("-")[0];
					}
					
				}
				console.log("替换后的字符：",perssonNum);
				var woNo = this.woNo;
				
				
				//  推送
				uni.request({
					url: 'http://118.118.118.21:8001/api/webinfo/wechat/sendmsgtowechat',
					method:'POST',
					data: {
					  "users": perssonNum,	// todo perssonNum
					  "content": "工单号【"+woNo+"】下【"+this.title+"】等待验收",
					  "title": "检修文件包",
					  "url": "http://118.118.118.21:8001/test.html?id=ldgjumpurl:E"+woNo
					},
					success: res => {
						console.log("返回的数据：",res);
						if(res.data.code == 0){
							uni.showToast({
								title: '信息已成功推送！',
								duration: 2000
							});
						}else{
							uni.showToast({
								title: res.data.data,
								icon:'error'
							});
						}
					},
					fail: (err) => {
						
						uni.showToast({
							title: '推送网络超时..',
							icon:'error'
						});
						console.log("失败信息：",err);
					}
				});
			},
			async addAccepter(data){
				var t = await this.$requestMaintPlanLine({
							url:'/saveequipaccepter',
							data:data,
							method:'POST',
							info:true
						});
				this.getData(false);
			},
			async deleteAccepter(data){
				var t = await this.$requestMaintPlanLine({
							url:'/deleteequipaccepter',
							data:data,
							method:'POST',
							info:true
						});
				this.getData(false);
			},
			trigger(e) {
				// console.log(e);
				// console.log("表单数据：",this.formData);
				
				var that = this;
				if(e.index==0){
					// 校验是否都填写了
					var tempRecords = this.formData.records;
					var flag = false;
					for(var i in tempRecords){
						if(tempRecords[i].d==null||tempRecords[i].d==''){
							flag = true;
						}
					}
					if(flag){	//有些记录卡未填写
						uni.showToast({
							title: '有值未填写!',
							icon:'error'
						});	
					}
					else{
						
						// if(this.checkPoint){//如果是校验点 检查是否已经校验完毕
							// TODO 检查是否校验完毕
							// if(this.formData.alreadyRersonName==''||this.formData.checkPersonName==''){
							// 	uni.showToast({
							// 		title: '未验收结束!',
							// 		icon:'error'
							// 	});	
							// }else{
								// var readyPerson = this.formData.alreadyRersonName.split (" ");
								// var needPerson = this.formData.checkPersonName.split (" ");
								// if(readyPerson.length == needPerson.length){
									// 如果一切正常 网络请求 提交数据
									// this.updateRecordData()
								// }else{
								// 	uni.showToast({
								// 		title: '未验收结束!',
								// 		icon:'error'
								// 	});	
								// }
							// }
							
						// } else{
						// 	this.updateRecordData();
						// }
						this.updateRecordData();
					}
					
				}else if(e.index==1){
					console.log("一键填入");
					//一键填入
					var tempRecords = this.formData.records;
					for(var i in tempRecords){
						if(tempRecords[i].d==null||tempRecords[i].d==''){
							tempRecords[i].d=tempRecords[i].c;
						}
					}
					this.formData.records = tempRecords;
				}else if(e.index==2){
					console.log("添加验收人");
					
					var that = this;
					
					uni.showModal({
						title: '添加验收人',
						showCancel:true,
						cancelText:"取消",
						cancelColor:"#F0AD4E",
						confirmText:"添加",
						editable:true,
						placeholderText:"输入工号",
						
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定',res);
								var data = that.stage;
								data.accepter = res.content.toUpperCase();
								// 添加验收人
								that.addAccepter(data);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					
					
					
				}else{
					console.log("删除验收人");
					uni.showModal({
						title: '删除验收人',
						showCancel:true,
						cancelText:"取消",
						cancelColor:"#F0AD4E",
						confirmText:"删除",
						editable:true,
						placeholderText:"输入工号",
						
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定',res);
								var data = that.stage;
								data.accepter = res.content.toUpperCase();
								// 添加验收人
								that.deleteAccepter(data);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					
				}
			},
		}
	}
</script>

<style>
	.uni-container {
		padding: 15px;
	}
	image{
		width: 200rpx;
		height: 200rpx;
	}
	.itemTitle{
		margin-top: 15rpx;
		margin-bottom: 5rpx;
	}
	button{
		margin: 50rpx;
	}
	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 30px;
		background-color: #fff;
	}
	
	.popup-height {
		@include height;
		width: 200px;
	}
	
	.text {
		font-size: 12px;
		color: #333;
	}
	
	.uni-forms{
		margin-bottom: 200rpx;
	}
	.uni-button-group {
		margin-top: 50px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
	}
	
	.uni-button {
		width: 184px;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0;
	}

</style>
