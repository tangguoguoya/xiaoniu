<template>
	<div class="login">
		<transition name="slide">
			<div class="login_cont" v-if="flag">
				<h1>小牛后台管理系统</h1>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm"class="demo-ruleForm">
					<el-form-item prop="userName">
						<el-input v-model="ruleForm.userName" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="pwd">
						<el-input v-model="ruleForm.pwd" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="width: 100%;" @click="submit()">立即登录</el-button>
					</el-form-item>
				</el-form>
				<div class="hint">
					温馨提示：未登录过的新用户，自动注册
					注册过的用户可凭账号密码登录
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
	data(){
		
	 var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if(value.split("").every(i=>/\w/.test(i))){
          	callback();
          }else{
          	 callback(new Error('不可以使用特殊符号'));
          }
          
        }
      };
      
		return {
			flag:false,
			ruleForm:{
				userName:"",
				pwd:""
			},
			rules:{
				userName:[
					{required:"true",message:"请输入用户名",trigger:"blur"},
					{ min: 2, max: 15, message: '长度在 2 到 5 个字符', trigger: 'blur' }
				],
				pwd:[
					{ validator: validatePass, trigger: 'blur' }
				]
			}
		}
	},
	mounted(){
		this.flag = true
	},
	methods:{
		submit(){
			this.$refs.ruleForm.validate(async (valid)=>{
				if (valid) {
					let res = await this.$http.post("/admin",this.ruleForm)
					if (res.data!="密码错误") {
						this.$message({
							message:res.data,
							type:'success'
						});
						sessionStorage.setItem("admin",this.ruleForm.userName)
						this.$router.push("/manage")
					} else{
						this.$message({
							message:res.data,
							type:'error'
						});
					}
				} else{
					this.$message.error('错了哦，这是一条错误信息🐬');
				}
			})
		}
	}
}
</script>

<style lang="less" scoped="scoped">
.login{
	background: #324057;width: 100%;height: 100%;
	.login_cont {
		position: fixed;left: 50%;top: 50%;transform: translate(-50%,-50%);
		background: #FFFFFF;border-radius: 10px;padding: 40px 25px; width: 350px; height: 240px;
		h1{
			position: absolute;bottom: 300px;font-size: 35px;color: #FFFFFF;
		}
		.hint {font-size: 10px;position: relative;top: -17px;}
	}
	
	.slide-enter,.slide-leave-to { opacity: 0; transform: translate(-50%,-100%);}
	.slide-enter-active,.slide-leave-active { transition:all 1s}
}
	
</style>