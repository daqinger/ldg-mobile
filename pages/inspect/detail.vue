<template>
  <view class="container">

	  <uni-drawer ref="showRight" mode="right" :mask-click="false">
		  <scroll-view style="height: 100%;" scroll-y="true">
		
			   <uni-list v-for="(item, index) in detail" :key="index">
			   	<uni-list-item :class="item.termStatus=='Y'?'':'warning'" :title="item.termName" :note="(item.termStatus=='Y'?'正常':'异常')"></uni-list-item>
			   </uni-list>
			  <button @click="closeDrawer" type="primary">关闭</button>
		  </scroll-view>
	  </uni-drawer>

      <view v-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-if="data">
		  <uni-card :title="data.recordPersonName" :extra="'异常总数'+data.exceptionNumber">
	
			  <uni-list>
			  	<uni-list-item title="记录日期" :note="data.recordDate"></uni-list-item>
			  	<uni-list-item title="异常描述" :note="data.exceptionRemarks"></uni-list-item>
			  	<uni-list-item title="处理方案" :note="data.exceptionSolution"></uni-list-item>
			  	<uni-list-item title="备注" :note="data.remarks"></uni-list-item>
			  </uni-list>
		  </uni-card>
        
      </view>
    <view class="btns">
      <button type="primary" @click="handleUpdate">后补处理方案</button>
      <button type="default" class="btn-delete" @click="showDrawer">详情</button>
    </view>
  </view>
</template>





<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/inspect.js';

  export default {
    data() {
      return {
        data:"",
		detail:[],
		loading:"loading",
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    async onLoad(e) {
		var recordId = e.id;

		var that = this;
		uni.request({
			url: 'http://118.118.118.21:8088/api/inspect/record/info/'+recordId,
			method: 'GET',
			data: {},
			success: res => {
				console.log(res);
				that.data = res.data.record;
				
			},
			fail: () => {},
			complete: () => {}
		});
		
		this.detail = await this.$requestInspect({
			url:'inspect/record/getRecordDetail/'+recordId,
		})
		that.loading='';
		
     
    },
    onReady() {
      
    },
    methods: {
		
      handleUpdate() {
		  var that = this;
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + that.data.recordId,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
     showDrawer() {
		 this.$refs.showRight.open();
	 },
	 closeDrawer() {
		 this.$refs.showRight.close();
	 }

    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
  
  .warning{
  	background-color: #ffdb9b;
  }
</style>
