<template>
	<div class="detail">
		<my-header2 @click="$router.back()">
			商品详情
		</my-header2>
		<div class="banner">
			<img :src="obj.pic"/>
		</div>
		<div class="main">
			<div class="title">
				名称：{{obj.goodsName}}
			</div>
			<div class="price">
				价格：{{obj.price}}
			</div>
			<div class="color">
				颜色：{{obj.color}}
			</div>
			<div class="count">
				数量：
				<div>
					<button @click="num>1&&num--"> - </button>
					<input type="text" v-model="num" />
					<button @click="num++"> + </button>
				</div>
				
			</div>
		</div>
		<div class="content">
			{{obj.details}}
		</div>
		<div class="footer">
			<div class="total">
				合计：￥{{num*obj.price}}
			</div>
			<div class="shopcar" @click="addCar()">
				加入购物车
			</div>
			<div class="pay">
				立即购买
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	export default{
		data(){
			return {
				obj:{},
				num:1
			}
		},
		computed:{
			...mapState(["userName"])
		},
		async created(){
			let res = await this.$http.get("/detail",{
				params:{id:this.$route.query.id}
			})
			this.obj = res.data
		},
		methods:{
			async addCar(){
				if (this.userName) {
					let obj = {
						id:this.obj._id,
						pic:this.obj.pic,
						goodsName:this.obj.goodsName,
						count:this.num,
						price:this.obj.price,
						user:this.userName
					}
					let res = await this.$http.post("/car",obj)
					console.log(res)
					this.$toast("已加入购物车！")
				} else{
					this.$store.commit("changeBack",this.$route.fullPath)
					this.$toast("请先登录您的账户哦！~~~")
					this.$router.push("/login")
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
.detail {
	.main {
		border-bottom: 1px solid #EEEEEE;border-top: 1px solid #EEEEEE;
		padding: .2rem;
		div {padding-bottom: .2rem;}
		.title {
			font-weight: bold;font-size: .32rem;
		}
		.price {color: #f9080e;}
		.count {
			display: flex;
			div {
				display: flex;border: 1px solid #CCCCCC;border-radius: .07rem;width: 1.5rem;padding: 0;height: .5rem;
				button {border: none; background: #FFFFFF;flex: 1;border-radius: .07rem;}
				input {flex: 1;border: none;width: 33.3%;border-left: 1px solid #CCCCCC;border-right: 1px solid #CCCCCC;text-align: center;}
			}
		}
	}
	.content {text-indent: 2em;padding: .2rem;font-size: .28rem;margin-bottom: 1rem;}
	.footer {
		display: flex; position: fixed; left: 0; bottom: 0;width: 100%;
		height: .8rem;background: #EEEEEE;align-items: center;font-size: .25rem;
		.total {
			flex: 2;color: red;padding-left: .2rem;
		}
		.shopcar {flex: 1;background: #ffc300;color: #FFFFFF;text-align: center;line-height: .8rem;}
		.pay {flex: 1;color: #FFFFFF;background: #f9080e;text-align: center;line-height: .8rem;
		}
	}
}
</style>