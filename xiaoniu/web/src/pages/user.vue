<template>
	<div class="user">
		<my-header2 @click="$router.back()">
		用户中心
		</my-header2>
		<div class="user_name">
			<div>
				<img src="../assets/main_03.png"/>
				qq
			</div>
			<div>
				<button>退出</button>
			</div>
		</div>
		<main>
			<div class="user_tel">
				<div>电话号码</div>
				<div>15565549003</div>
			</div>
			<div class="fav">
				<div>购物车</div>
				<div>3 > </div>
			</div>
			<div class="user_list">
				<div>订单列表</div>
				<div>7 > </div>
			</div>
		</main>
		<my-footer></my-footer>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
.user {
	.user_name {
		display: flex; justify-content: space-between;align-items: center;padding: .2rem; border-bottom: 1px #EEEEEE solid;
		div {
			button {padding: .1rem .2rem; border: none;border-radius: .05rem;}
		}
		img {
			border-radius: 50%;width: 1rem; height: 1rem;margin-right: .2rem;
			
		}
	}
	main {
		& > div {display: flex;padding: .2rem;border-bottom: 1px #EEEEEE solid;justify-content: space-between;}
		.user_tel {
			div:nth-child(2){color: #4CAF50;}
		}
	}
}
</style>