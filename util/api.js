const BASE_URL_INSPECT = 'http://118.118.118.21:8088/api/';
const BASE_URL_MAINT_PLAN_LINE = 'http://localhost:88/api/maintplanline/maintequip';
const BASE_URL_MAINT_PLAN_LINE_TEST = 'http://118.118.118.21:8001/api/maintplanline/maintequip';
const BASE_URL_IFS = 'http://118.118.117.50:50080/getdata/';


export const requestMaintPlanLine = (options)=>{
	return new Promise((resolve,reject) => {
		if(options.loading){
			uni.showLoading({
			    title: '加载中'
			});
		}
		uni.request({
			url: BASE_URL_MAINT_PLAN_LINE_TEST+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: res => {
				if(res.data.code != 0){
					return uni.showModal({
						title: '操作失败',
						content: res.data.msg,
						showCancel:false
					});
				}else{
					if(options.info){
						uni.showToast({
							title: '操作成功！',
							icon:'success'
						});
					}				
				}
				resolve(res.data.data);
			},
			fail: (err) => {
				uni.showToast({
					title: '网络未连接~',
					icon:'error'
				});
				reject(err);
			},
			complete: () => {
				if(options.loading){
					uni.hideLoading();
				}
			}
		});
	})
}


export const requestInspect = (options)=>{
	return new Promise((resolve,reject) => {
		uni.showLoading({
		    title: '加载中'
		});
		uni.request({
			url: BASE_URL_INSPECT+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: res => {
				if(res.data.code != 0){
					return uni.showToast({
						title: '数据获取失败'
					});
				}
				resolve(res.data.data);
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败',
					icon:'error'
				});
				reject(err);
			},
			complete: () => {
				uni.hideLoading();
			}
		});
	})
}

export const requestIFS = (options)=>{
	return new Promise((resolve,reject) => {
		uni.showLoading({
		    title: '加载中'
		});
		uni.request({
			url: BASE_URL_IFS+options.url,
			method: options.method || 'POST',
			data: {
				token:'aFO90/PbIj5VlQUoeaapkRAsM/ZS61nzH2MycLntGUlFK6CA/2lDtA==',
				data:options.data || {}
			},
			success: res => {
				if(res == ""){
					return uni.showToast({
						title: '数据获取失败'
					});
				}
				console.log("返回的数据：",res);
				resolve(res.data.body.data.item);
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败',
					icon:'error'
				});
				reject(err);
			},
			complete: () => {
				uni.hideLoading();
			}
		});
	})
}