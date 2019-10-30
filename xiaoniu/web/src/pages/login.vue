<template>
	<div class="login">
		<div class="logo">
			<router-link to="/">
				<img src="../assets/logo.png"/>
			</router-link>
		</div>
		<div class="main">
			<h1>用户登录</h1>
			<div class="User">
				<div class="name">
					用户名
					<input type="text" id="user" v-model="obj.userName" placeholder="请输入用户名" />
				</div>
				<div class="pwd">
					密码
					<input type="password" id="pwd" v-model="obj.pwd" placeholder="请输入密码" />
				</div>
			</div>
			
			<div class="btn">
				<button class="btn_login" @click="login">登 录</button>
				<button class="btn_new">重 置</button>
			</div>
			<router-link to="/reg" tag="div">还没账号？</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				obj:{userName:"",pwd:""}
			}
		},
		methods:{
			async login(){
				//1.收集数据
				//2.简单验证
				if (!this.obj.userName || !this.obj.pwd) {
					this.$toast("用户名或者密码不能为空")
					return false
				}
				//3.发请求
				let res = await this.$http.post("./login",this.obj)
				console.log(res)
				this.$toast(res.data)
				if (res.data.status== 1) {
					this.$store.commit("changeUser",this.obj.userName)
					this.$router.push(this.$store.state.back)
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
.login {
	.logo {
		text-align: center; padding: 1rem .2rem;
		img {
			width: 50%;height: auto;
		}
	}
	.main {
		text-align: center;
		
		h1 {font-size: .32rem;color: #666;padding-bottom: .3rem;}
		.User {
			div {
				border-top: 1px solid #EEEEEE;margin: 0 1rem;
				input {border: none;padding: .3rem .5rem;width: 3rem;}
			}
			
		}
		.btn {
			button {
				padding: .15rem .25rem;border: none;color: #FFFFFF;font-size: .25rem;margin: .3rem .15rem;border-radius: .06rem;
			}
			.btn_login {background: #26A2FF;}
			.btn_new {background: #f9080e;}
		}
		
	}
}
</style>