<template>
	<view class="article">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar :statusBar="true" :border="false"></uni-nav-bar>
		<!-- #endif -->
		<view class="article-title">{{ title }}</view>
		<view class="article-content" v-html="infolist.content"></view>
	</view>
</template>

<script>
	
	export default {

		data() {
			return {
				// 当前显示 _id
				infolist:"",
				id: "",
				title: 'title',
				// 数据表名
				// 查询字段，多个字段用 , 分割
				field: 'user_id.username,user_id._id,avatar,excerpt,last_modify_date,comment_count,like_count,title,content',
				formData: {
					noData: '<p style="text-align:center;color:#666">详情加载中...</p>'
				}
			}
		},
		computed: {
		},
		onLoad(event) {
			console.log(event);
			//获取真实新闻id，通常 id 来自上一个页面
			if (event.id) {
				this.id = event.id
			}
			//若上一页传递了标题过来，则设置导航栏标题
			if (event.title) {
				this.title = event.title
				uni.setNavigationBarTitle({
					title: event.title
				})
			}
			
		},
		onReady() {
			// 开始加载数据，修改 where 条件后才开始去加载 clinetDB 的数据 ，需要等组件渲染完毕后才开始执行 loadData，所以不能再 onLoad 中执行
			if (this.id) { // ID 不为空，则发起查询
				
				uni.request({
					url: "http://118.118.118.21:8001/api/webinfo/infolist/info/"+this.id,
					method: 'GET',
					data: {
						page:"1",
						limit:"5"
					},
					success: res => {
						console.log(res);
									this.infolist = res.data.infolist;
					},
					fail: (err) => {
						console.log("网络异常...")
					},
				});
				
				
				
			} else {
				uni.showToast({
					icon: 'none',
					title: this.$t('listDetail').newsErr
				})
			}
		},
		methods: {
			loadData(data) {
				//如果上一页未传递标题过来（如搜索直达详情），则从新闻详情中读取标题
				if (this.title == '' && data[0].title) {
					this.title = data[0].title
					uni.setNavigationBarTitle({
						title: data[0].title
					});

				}
				this.setReadNewsLog();
			},
		}
	}
</script>

<style scoped>
	.article-title {
		padding: 20px 15px;
		padding-bottom: 0;
	}

	.article-content {
		padding: 15px;
		font-size: 15px;
		overflow: hidden;
	}
</style>
