<template>
  <view class="uni-container">
      <uni-forms-item name="exceptionRemarks" label="异常描述">
        <uni-easyinput placeholder="异常描述" v-model="formData.exceptionRemarks"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="exceptionSolution" label="处理方案">
        <uni-easyinput v-model="formData.exceptionSolution"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="remarks" label="备注">
        <uni-easyinput placeholder="备注" v-model="formData.remarks"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">保存</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        formData:""
      }
    },
    onLoad(e) {
      var recordId = e.id;
      var that = this;
      uni.request({
      	url: 'http://118.118.118.21:8088/api/inspect/record/info/'+recordId,
      	method: 'GET',
      	data: {},
      	success: res => {
      		console.log(res);
      		that.formData = res.data.record;
      	},
      	fail: () => {},
      	complete: () => {}
      });
    },
    onReady() {
     
    },
    methods: {
      /**
       * 验证表单并提交
       */
      submit() {
       console.log(this.formData);
	   console.log(this.formData);
	   uni.showToast({
	       title: '修改成功',
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
</style>
