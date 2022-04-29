<template>
  <view class="uni-container">
   <uni-forms >
	   <view v-for="(item, index) in formData" :key="index">
	   	<uni-card  :title="item.areaName">		
			<view v-for="(i_item,i_index) in item.areaTerms" :key="i_index">
				<uni-row>
					<uni-col :span="17">{{i_item.termName}}</uni-col>
					<uni-col :span="7">
						<uni-data-checkbox  :multiple="false" v-model="i_item.termStatus" :localdata="range"></uni-data-checkbox>
					</uni-col>
				</uni-row>
			</view>	
	   	</uni-card>
	   </view>
	
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">保存</button>
      </view>
    </uni-forms>
	<!-- 这边渲染具体的巡检项目 -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
		range: [{"value": "Y","text": "正常"    },{"value": "N","text": "异常"}],
		formData:[]
      }
    },
    onReady() {
    },
	async onLoad() {
	
		this.formData = await this.$requestInspect({
			url:'inspect/record/getRecord'
		})
	},
    methods: {
      /**
       * 验证表单并提交
       */
      submit() {
        console.log(this.formData);
		uni.showToast({
		    title: '添加成功',
		    duration: 2000
		});
		
		setTimeout(function () {
		    uni.navigateBack({
		    	
		    })
		}, 2000);
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
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
  .uni-col{
	  margin-top: 20px;
  }
</style>
