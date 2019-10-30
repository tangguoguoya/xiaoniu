<template>
	<div class="reg">
		<div class="logo">
			<router-link to="/">
				<img src="../assets/logo.png"/>
			</router-link>
		</div>
		<div class="main">
			<h1>用户注册</h1>
			<div class="user">
				<div class="userName">
					用户名
					<input type="text" v-model="obj.userName" id="" placeholder="请输入用户名" />
				</div>
				<div class="pwd">
					密码
					<input type="password" v-model="obj.pwd" id="" placeholder="请输入密码" />
				</div>
				<div class="new_pwd">
					确认密码
					<input type="password" v-model="new_pwd" id="" placeholder="请确认密码" />
				</div>
				<div class="tel">
					手机号
					<input type="text" v-model="obj.tel" id="" placeholder="请输入手机号" />
				</div>
			</div>
			
			<div class="btn">
				<button class="btn_login" @click="submit()">注 册</button>
				<button class="btn_new" @click="clear()">重 置</button>
			</div>
			<router-link to="/login" tag="div">我有账户</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				obj:{
					userName:"",
					pwd:"",
					tel:""
				},
				new_pwd:""
			}
		},
		methods: {
			async submit(){
				if (!this.obj.userName ||!this.obj.pwd || !this.new_pwd || !this.obj.tel) {
					alert("账号密码不为空")
					return false;
				} 
				if(this.obj.pwd != this.new_pwd){
					alert("两次密码不一致");
					return false;
				}
				let res = await this.$http.post("user",this.obj)
				alert("🐒🐒 注册成功！🐒🐒")
				console.log(res)
			},
			clear(){
				this.obj.userName = "",
				this.obj.pwd = "",
				this.new_pwd = "",
				this.obj.tel = ""
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
.reg {
	.logo {
		text-align: center; padding: 1rem .2rem;
		img {
			width: 50%;height: auto;
		}
	}
	.main {
		text-align: center;
		
		h1 {font-size: .32rem;color: #666;padding-bottom: .3rem;}
		.user {
			div {
				border-top: 1px solid #EEEEEE;margin: 0 1rem;
				input {border: none;padding: .3rem .5rem;width: 3rem;}
			}
			.pwd{
				margin-right: .4rem;
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