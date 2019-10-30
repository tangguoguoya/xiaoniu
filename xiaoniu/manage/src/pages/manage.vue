<template>
	<div class="manage">
		<el-container>
			<el-aside width="200px">
			    <el-menu default-active="2" 
			    	class="el-menu-vertical-demo" 
			    	background-color="rgb(50, 64, 87)" 
			    	text-color="#bfcbd9" 
			    	active-text-color="#20a0ff" router>
			    	
			    	<el-menu-item index="/manage">
			        	<i class="el-icon-menu"></i>
			        	<span slot="title">首页</span>
			    	</el-menu-item>
			    	
			    	<el-submenu index="2">
			       		<template slot="title">
					        <i class="el-icon-document"></i>
					        <span>数据管理</span>
					    </template>
				    	<el-menu-item index="/manage/admin">
				    		<i class="el-icon-s-custom"></i>
				        	<span slot="title">管理员列表</span>
				    	</el-menu-item>
					    <el-menu-item index="/manage/user">
					    	<i class="el-icon-user"></i>
				        	<span slot="title">用户列表</span>
				    	</el-menu-item>
				    	<el-menu-item index="/manage/ment">
				    		<i class="el-icon-present"></i>
				        	<span slot="title">商家列表</span>
				    	</el-menu-item>
				    	<el-menu-item index="/manage/goods">
				    		<i class="el-icon-s-shop"></i>
				        	<span slot="title">商品列表</span>
				    	</el-menu-item>
				    	<el-menu-item index="/manage/order">
				    		<i class="el-icon-s-claim"></i>
				        	<span slot="title">订单列表</span>
				    	</el-menu-item>
			    	</el-submenu>
			    	<el-submenu index="8">
			    		<template slot="title">
					        <i class="el-icon-plus"></i>
					        <span>数据添加</span>
				        </template>
			        	<el-menu-item index="/manage/addGoods">
			        		<i class="el-icon-shopping-cart-full"></i>
						    <span slot="title">添加商品</span>
					    </el-menu-item>
			    	</el-submenu>
			    </el-menu>
			</el-aside>
			<el-container>
				<el-header><my-header></my-header></el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import header from"@/components/header"
	export default{
		components:{"my-header":header}
	}
</script>

<style>
	.el-submenu__title{text-align: left;}
	.el-menu-item {text-align: left;background: #1f2d3d !important;}
	#home { background: rgb(50, 64, 87) !important;}
	.el-submenu__title:hover { background:#53647b !important;  }
	
	.el-header {background: #eff2f7 !important;}
	.manage{height: 100%;}
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: rgb(50, 64, 87);
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    background: #FFFFFF !important;
  }
  
	.el-container {
   height: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>