<template>
	<div class="foot">
		<!--------------->
		<router-link to="/" tag="div" :class="$route.path=='/'&& active"> <!--tag="div"  -->
			<div class="footer_item_pic">
				<img src="../assets/shop.png"/><!-- v-if="$route.path=='/'"-->
			</div>
			<p>商城</p>
		</router-link>
		<!--------------->
		<router-link to="/shopcar" tag="div" :class="$route.path=='/shopcar'&& active"> 
			<div class="footer_item_pic">
				<img src="../assets/server.png"/>
			</div>
			<p>购物车</p>
		</router-link>
		<!--------------->
		<router-link to="/order" tag="div" :class="$route.path=='/order'&& active"> 
			<div class="footer_item_pic">
				<img src="../assets/order.png"/>
			</div>
			<p>订单</p>
		</router-link>
		<!--------------->
		<router-link to="/user" tag="div" :class="$route.path=='/user'&& active"> 
			<div class="footer_item_pic">
				<img src="../assets/my.png"/>
			</div>
			<p>我的</p>
		</router-link>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				active:"active"
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.foot {
		display: flex;
		background: #110e0d;
		position: fixed;
		bottom: 0;
		left: 0;
		color: #fff;
		width: 100%;
		padding: .06rem 0;
		
		& > div {   /*& > div 直属DIV 父级元素*/  
			flex: 1;
			text-align: center;
			width: 100%;
			p {font-size: .14rem;color: #707274;}
			.footer_item_pic {
				img {
					width: 23%;
					height: 23%;
					padding-bottom: .05rem;
				}
			}
		}
		.active{
			p{color: #FFFFFF;}
			img {filter: brightness(1.5);}
		}
	}
	
	
	
	
</style>