<template>
  <view class="container">
   
      <view v-if="data">
<!--        <uni-list>
          <uni-list-item showBadge=true v-for="(item, index) in data" :key="index" rightText>
            <template v-slot:body>
			  <uni-card :title="'记录人: '+item.recordPersonName":extra="'异常总数:'+item.exceptionNumber"  @click="handleItemClick(item.recordId)">
			      <text>记录日期:{{item.recordDate}}</text>
			  </uni-card>
            </template>
          </uni-list-item>
        </uni-list> -->
		<uni-list v-for="(item, index) in data" :key="index">
		  <uni-list-item :class="item.haveException=='Y'?'warning':''"
			:clickable="true"
			:showBadge="true" 
			:title="item.recordPersonName" 
			:showArrow="true" 
			:rightText="'异常总数： '+item.exceptionNumber"  
			:note="item.recordDate"
			@click="handleItemClick(item.recordId)"
			>
		  </uni-list-item>
		</uni-list>
      </view>
      <uni-load-more :status="'noMore'"></uni-load-more>

    <uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
		data:[],
		status:'loading',
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        }
      }
    },
    onPullDownRefresh() {
     // 下拉刷新
	 console.log('refresh');
	         setTimeout(function () {
	             uni.stopPullDownRefresh();
	         }, 1000);
    },
    onReachBottom() {
      // 到底部加载更多
    },
	async onLoad() {
		
		this.data = await this.$requestInspect({
			url:'inspect/record/list/only'
		})
	},
    methods: {
      handleItemClick(id) {
        uni.navigateTo({
          url: './detail?id=' + id
        })
      },
      fabClick() {
        // 打开新增页面
        uni.navigateTo({
          url: './add',
          events: {
            // 监听新增数据成功后, 刷新当前页面数据
           //  刷新数据
          }
        })
      }
    }
  }
</script>

<style>
	.warning{
		background-color: #ffdb9b;
	}
</style>
