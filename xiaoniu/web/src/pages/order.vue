<template>
	<div class="order">
		<my-header2>我的订单</my-header2>
		<div class="order_content" v-for="(i,j) in obj" :key="j">
			<div class="content-top">
				<div>订单编号：{{i._id}}</div>
				<div>已支付</div>
			</div>
			<div class="content-md">
				<div class="md-pic">
					<img src="i.pic"/>
				</div>
				<div class="md-info">
					<p>{{i.goodsName}}</p>
					<p>数量：{{i.count}}</p>
				</div>
				<div class="md-pay">
					￥{{i.price}}
				</div>
			</div>
			<div class="content-bt">
				合计：<span>￥{{i.total}}</span>（含运费0.00）
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				obj:[]
			}
		},
		async created(){
			if (this.userName) {
				let res = await this.$http.get("/order")
				console.log(res)
				this.obj = res.data[0]
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
.order {
	font-size: 0.3rem;
	.order-content {
		 margin-bottom: 1.2rem;
	}
	.content-top {
		 display: flex; justify-content: space-between; padding: 0.15rem;font-size: .25rem;
	}
	.content-md {
		 display: flex; background: #f9f8f7;
		 
		 > div { flex: 1;}
	}
	.md-pic {
		height: 1.8rem;overflow: hidden;margin: .2rem;margin-right: 0;
		img {
			width: 80%; height: auto; vertical-align: top;
		}
	}
	.md-info {
		padding: 0.2rem 0;font-size: .25rem;
		p {line-height: 0.5rem;}
	}
	.md-pay { display: flex; justify-content: center; align-items: flex-end; padding-bottom: .15rem;color: #F9080E;font-size: .25rem;}
	.content-bt {
		background: #f9f8f7; padding: 0.14rem; border-top:0.04rem solid #fff; display: flex; justify-content: flex-end;font-size: .25rem;
		span { color: #F9080E;}
	}
}
</style>