<template>
	<div class="list">
		<my-header></my-header>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" topPullText="请稍等哦！~~~">
		
		<main>
			<router-link v-for="i in list" :key="i._id" 
				:to="{path:'/detail',query:{id:i._id}}">
				<img :src="i.pic"/>
			</router-link>
		</main>
		</mt-loadmore>
		<my-footer></my-footer>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				list:[],
				allLoaded:false,
				pagesize:5,
				total:0,
				current:1
			}
		},
		computed:{
			rest(){
				return Math.ceil(this.total/this.pagesize)-1;
			}
		},
		async created(){
			this.getData()
			let res  = await this.$http.get("/listTotal")
			console.log(this.list)
			this.total = res.data
		},
		methods:{
			loadTop() {
			  // 加载更多数据
				this.getData(true)
			  	this.$refs.loadmore.onTopLoaded();
			},
			async getData(flag){
				let res =await this.$http.get("/list",{
					params:{
						pagesize:this.pagesize,
						current:this.current
					}
				})
				console.log(res)
				if(flag){
					this.list = res.data
				}else{
					this.list = this.list.concat(res.data);
				}
			},
			loadBottom() {
			  //...// 加载更多数据
			  if(this.current>this.rest){
			  	this.allLoaded = true;// 若数据已全部获取完毕
			  }else{
			  	this.current++;
			  	this.getData()
			  }
			  //
			  this.$refs.loadmore.onBottomLoaded();
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
.list{
	img{margin-bottom: .1rem;}
}
</style>