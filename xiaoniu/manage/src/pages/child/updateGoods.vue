<template>
	<div class="add">
		<h2>修改商品</h2>
		<div class="add_content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="商品名称" prop="goodsName" required>
			    <el-input v-model="ruleForm.goodsName"></el-input>
			  </el-form-item>
			  <el-form-item label="商品价格" required>
			  	<el-input-number v-model="ruleForm.price" :min="0.1" :max="10000"></el-input-number>
			  </el-form-item>
			   <el-form-item label="商品颜色">
			   	 <el-radio-group v-model="ruleForm.color">
			      <el-radio-button label="红色"></el-radio-button>
			      <el-radio-button label="蓝色"></el-radio-button>
			      <el-radio-button label="白色"></el-radio-button>
			      <el-radio-button label="粉色"></el-radio-button>
			    </el-radio-group>
			  </el-form-item>
			  <el-form-item label="商品详情" prop="details" required>
			  	<el-input type="textarea" v-model="ruleForm.details" ></el-input>
			  </el-form-item>
			  <el-form-item label="商品库存"  required>
			   <el-input-number v-model="ruleForm.store" :min="1" :max="10000"></el-input-number>
			  </el-form-item>
			  <el-form-item label="商品图片" required>
			    <el-upload
				  class="avatar-uploader"
				  :action="$URL"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			 </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	 export default {
    data() {
      return {
        imageUrl:"",
        ruleForm: {
          goodsName: "",
          price: "",
          color: "红色",
          details: "",
          store:"",
          pic:""
        },
        rules: {
          goodsName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
          ],
//        price: [
//          { required: true, message: '请输入商品价格', trigger: 'blur' ,type: 'number'},
//          { message: '价格必须在合理的价格区间', trigger: 'blur' }
//        ],
          details: [
            { required: true, message: '请输入商品详情', trigger: 'blur'},
            { min: 10, max: 2000, message: '字数不符合规则', trigger: 'blur' }
          ]
//        store: [
//          { required: true, message: '请输入商品库存', trigger: 'blur'},
//          { message: '库存数量不符合规则', trigger: 'blur' }
//        ]
        }
      };
    },
    created(){
    	for(let i in this.ruleForm){
    		this.ruleForm[i] = this.$route.params.row[i]
    	}
    	this.imageUrl = this.ruleForm.pic
    },
    methods: {
      handleAvatarSuccess(res, file) {
      	this.ruleForm.pic = this.$URL+"/"+res;
      	
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = /\.(jpg|jpeg|gif|png)$/i.test(file.name);
        const isLt2M = file.size / 1024 / 1024 < 2;
        
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
          	if (this.ruleForm.pic) {
//          	alert('submit!');
          		let res = await this.$http.put("/goods?id="+this.$route.params.row._id,this.ruleForm);
//        		console.log(res)
          		this.$router.push("/manage/goods")
          	} else{
          		this.$message.error('请上传图片');
          	}
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less">
	.add{
		h2 {
			text-align: center; font-weight: normal; color: #333;
			font-size: 26px; margin-bottom: 15px;
		}
		.add_content {
			width: 600px; margin: 0 auto;
			border: 1px solid #eee; border-radius:5px;
			padding: 30px 30px 30px 10px;
		}
		.avatar-uploader .el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		  }
		  .avatar-uploader .el-upload:hover {
		    border-color: #409EFF;
		  }
		  .avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 178px;
		    height: 178px;
		    line-height: 178px;
		    text-align: center;
		  }
		  .avatar {
		    width: 178px;
		    height: 178px;
		    display: block;
		  }
	}
</style>