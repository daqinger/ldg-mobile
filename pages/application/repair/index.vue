<template>
	<view>
		<uni-search-bar @confirm="search" clearButton="auto" cancelButton="auto" placeholder="请输入关键字...">
		</uni-search-bar>
		<uni-section  title="工单列表" style="margin: 0;" type="line"></uni-section>
		<view v-for="(item,index) in repairs">
		  <uni-card :title="item.woNo" extra=">" @click="toDetail(item.listFlag,item.woNo)">
			  <uni-list>
			  	<uni-list-item title="工单号" :note="item.woNo"></uni-list-item>
			  	<uni-list-item title="设备编码" :note="item.mchCode"></uni-list-item>
			  	<uni-list-item title="年度计划号" :note="item.planNo"></uni-list-item>
			  	<uni-list-item title="计划名称" :note="item.planName"></uni-list-item>
			  	<uni-list-item title="计划开始时间" :note="item.planSDate"></uni-list-item>
			  	<uni-list-item title="计划结束时间" :note="item.planFDate"></uni-list-item>
			  	<uni-list-item title="状态" :note="item.state"></uni-list-item>
				
			  </uni-list>
		</uni-card>
        
      </view>
	  
	</view>
</template>

<script>		
	export default {
		
		data() {
			return {
				searchValue: '123123',
				repairs:[]
			}
		},
		methods: {
			async search(res) {	
				console.log(res.value);
				
				this.repairs = await this.$requestMaintPlanLine({
					url:'/search/'+res.value,
					loading:true
				})
				
				console.log("获取的数据：",this.repairs)
				
				
			},
			toDetail(listFlag,woNo){		
				// 如果是清单类 就跳转到   equipmentList  页面
				if(listFlag == "TRUE"){
					uni.navigateTo({
					  url: './equipmentList?woNo=' + woNo
					})
				}else{
					uni.navigateTo({
					  url: './repair?woNo=' + woNo
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.search-result {
		padding-top: 10px;
		padding-bottom: 20px;
		text-align: center;
	}

	.search-result-text {
		text-align: center;
		font-size: 14px;
		color:#666;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0px;
	}

	.uni-mt-10 {
		margin-top: 10px;
	}
</style>
