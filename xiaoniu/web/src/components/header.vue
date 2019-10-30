<template>
	<div class="header">
		<header>
			<div class="logo">
				<router-link to="/">
					<img src="../assets/logo.png"/>
				</router-link>
			</div>
			<div class="head_right">
				<div class="star">
					<img src="../assets/star.png"/>
				</div>
				<div class="user">
					<router-link to="/login">
						<img src="../assets/user.png"/>
					</router-link>
					
				</div>
			</div>
		</header>
	</div>
</template>

<script>
</script>

<style  scoped="scoped"  lang="less">
	header{
			display: flex;justify-content: space-between;align-items: center;height: .8rem;background: #EEEEEE;
			.logo{
				width: 30%;margin-left: .1rem;
			}
			.head_right{
				width: 18%;display: flex;justify-content: space-between;margin-right: .18rem;
				div{
					width: .47rem;
				}
			}
		}
</style>