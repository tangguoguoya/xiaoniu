<template>
	<div class="home">
		<my-header></my-header>
		<div class="banner">
			<img src="../assets/sw03.901a267.png"/>
		</div>
		<nav>
			<router-link to="/list" tag="div">
				<div>
					<img src="../assets/main_03.png"/>
				</div>
				<span>整车热卖</span>
			</router-link>
			<div>
				<div>
					<img src="../assets/main_05.png"/>
				</div>
				<span>热卖配件</span>
			</div>
			<div>
				<div>
					<img src="../assets/main_07.png"/>
				</div>
				<span>线下门店</span>
			</div>
			<div>
				<div>
					<img src="../assets/main_09.png"/>
				</div>
				<span>文化周边</span>
			</div>
		</nav>
		<main>
			<h2>整车热卖</h2>
			<div class="content">
				<img src="../assets/n1s.jpg"/>
				<img src="../assets/n1s01.jpg"/>
				<img src="../assets/n1s02.jpg"/>
				<img src="../assets/n1s03.jpg"/>
			</div>
		</main>
		<my-footer></my-footer>
	</div>
</template>

<script>
</script>

<style scoped="scoped"  lang="less">
	.home{
		
		nav{
			display: flex;background: #EEEEEE;justify-content: space-around;
			height: 1.5rem;align-items: center;
			div{
				width: 30%;margin: .15rem auto;text-align: center;
			}
		}
		main{
			h2{
				color: red;font-size: .34rem;height: 1rem;line-height: 1rem;padding-left: .1rem;
			}
		}
	}
</style>