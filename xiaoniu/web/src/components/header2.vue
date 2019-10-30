<template>
	<div class="header2">
		<div class="left" @click="$router.back()">
			<slot name="left"><img src="../assets/back.png"/></slot>
		</div>
		<h1>
			<slot></slot>
		</h1>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
.header2{
	background: #f9080e;height: .8rem;display: flex;
	.left {
		width: .6rem; height: 100%; display: flex; justify-content: center; align-items: center;
		img {
			width: 23%; height: auto;filter: brightness(1.5);
		}
	}
	h1 {font-weight: normal; font-size: .28rem; text-align: center;flex: .9;color: #FFFFFF;line-height: .8rem;}
}
</style>