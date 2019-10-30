<template>
	<div class="user">
		<el-table
	      :data="tableData"
	      style="width: 100%">
	      <el-table-column
	        prop="regtime"
	        label="注册日期"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="userName"
	        label="用户名"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="tel"
	        label="电话">
	      </el-table-column>
	    </el-table>
	    <el-pagination
		  background
		  layout="prev, pager, next"
		  :total="total"
		  :page-size="size"
		  @current-change="change">
		  <!-- :hide-on-single-page="value" 当只有一页时隐藏分页器-->
		</el-pagination>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				size:4,
				total:1,
				tableData: []
			}
		},
		async created(){
			this.getData(1)
		},
		methods:{
			format(regtime){
				regtime = new Date(regtime)
				return regtime.getFullYear()+"-"+(regtime.getMonth()+1)+"-"+regtime.getDate()
			},
			change(current){
	      		this.getData(current)
	      	},
	      	async getData(current){
	      	  	let res = await this.$http.get("/user",{
	      	  		params:{size:this.size,current}
	      	  	});
	      	  	console.log(res)
	      	  	this.total = res.data.total;
	    	    this.tableData = res.data.data.map(i=>{
		    		i.regtime = this.format(i.regtime)
		    		return i
		    	});
		    	
	      	}
		}
	}
</script>

<style>
</style>