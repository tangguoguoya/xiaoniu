<template>
	<div class="shopcar">
		<my-header2>购物车</my-header2>
		<main v-if="userName">
			<div class="goodslist" v-for="(i,j) in list" :key="j">
				<div class="select">
					<input type="checkbox" :value="i._id" v-model="check" />
				</div>
				<div class="goodspic">
					<img :src="i.pic"/>
				</div>
				<div class="info">
					<div class="title">
					名称：{{i.goodsName}}
						</div>
					<div class="price">
						价格：￥{{i.price}}
					</div>
					<div class="count">
						数量：
						<div>
							<button @click="i.count>1&&i.count--"> - </button>
							<input type="text" v-model="i.count" />
							<button @click="i.count++"> + </button>
						</div>
					</div>
				</div>
				<div class="remove" @click="Delect()">
					删除
				</div>
			</div>
		</main>
		<div v-else>
			您还没有登录哦！
			<a href="javascript:;" @click="login()">请先登录</a>
		</div>
		<div class="footer">
			<div class="select">
				<input type="checkbox" :checked="Allcheck" @click="change()"/>
			</div>
			<div class="total">
				合计：￥{{total}}
			</div>
			<div class="commit" @click="pay()">
				去结算
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default{
		data(){
			return {
				list:[],
				check:[]
			}
		},
		computed:{
			...mapState(["userName"]),
			total(){
				return this.list.reduce((t,i)=>{
					if (this.check.includes(i._id)) {
						return t+=i.price*i.count
					} else{
						return t
					}
				},0)
			},
			Allcheck(){
				return this.check.length == this.list.length
			}
			
		},
		async created(){
			if (this.userName) {
				let res = await this.$http.get("/car?user="+this.userName)
//				console.log(res)
				this.list = res.data 
			}
		},
		methods:{
			login(){
				this.$store.commit("changeBack",this.$route.fullPath)
				this.$router.push("/login")
			},
			change(){
				if(this.Allcheck){
					this.check = []
				}else{
					this.check = this.list.map(i=>i._id)
				}
			},
			pay(){
				if(this.check == ""){
					this.$toast("您还没有选择商品哦！~~~")
				}else{
					this.$messagebox.confirm('结算已选中的商品吗?').then(async action => {
						let send = this.list.filter(i=>this.check.includes(i._id)).map(i=>{
							delete i.__v 
							delete i._id
							return i
						})
						let res = await this.$http.post("/order",send)
						console.log(send)
						if (res.data.status== 1) {
							this.$toast("结算成功！")
							this.$router.push("/order")
						}
					},res=>{});
				}
			},
			Delect(){
				
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
.shopcar {
	background: #eee; height: 100%;
	main {
		margin-bottom: 1.5rem;
		.goodslist {
			display: flex; background: #fff; margin-top: 0.24rem;padding: .15rem 0;
			.select {
				width:8%; text-align: center; padding-top: .1rem;
				input { width: .35rem; height: .35rem;}
			}
			.goodspic {
				width: 25%;border: 1px solid #EEEEEE;margin-right: .15rem;
			}
			.info {
				& > div {padding-bottom: .1rem ;}
				.title {
					font-weight: bold;font-size: .29rem;
				}
				.price {color: #f9080e;font-size: .29rem;}
				.count {
					display: flex; font-size: .29rem;
					div {
						display: flex;border: 1px solid #CCCCCC;border-radius: .07rem;width: 1.2rem;padding: 0;height: .4rem;
						button {border: none; background: #FFFFFF;flex: 1;border-radius: .07rem;}
						input {flex: 1;border: none;width: 33.3%;border-left: 1px solid #CCCCCC;border-right: 1px solid #CCCCCC;text-align: center;}
					}
				}
			}
			.remove{
				width:25%; display: flex; justify-content: flex-end;
				align-items: flex-end; padding: 0.5rem 0; color: #555;
			}
		}
	}
	.footer {
		display: flex; position: fixed; left: 0; bottom: .9rem;width: 100%;
		height: .8rem;background: #FFF;align-items: center;font-size: .25rem;
		.total {
			flex: 1;color: red;padding-left: 3rem;
		}
		.commit {flex: 1.5;color: #FFFFFF;background: #f9080e;text-align: center;line-height: .8rem;
		}
		input { width: .35rem; height: .35rem;margin-left: .2rem;}
	}
}
</style>