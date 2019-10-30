let mongo = require("mongoose");
//mongod --dbpath=D:data/xx/xx
mongo.connect("mongodb://127.0.0.1/xiaoniu02",{useNewUrlParser:true,useUnifiedTopology: true})
mongo.connection.on("connected",err=>{
	console.log("连接成功")
})

let adminHead = mongo.Schema({
	time:{
		type:Date,
		default:new Date()
	},
	userName:String,
	pwd:String,
	address:{
		type:String,
		default:"河南省信阳市"
	}
})

let admin = mongo.model("admin",adminHead)

let userHead = mongo.Schema({
	userName:String,
	pwd:String,
	tel:Number,
	regtime:{
		type:Date,
		default:new Date()
	}
})

let user = mongo.model("user",userHead)

let goodsHead = mongo.Schema({
	goodsName:String,
	price:Number,
	color:String,
	details:String,
	store:Number,
	pic:String,
	time:{
		type:Date,
		default:new Date()
	}
})

let goods = mongo.model("goods",goodsHead)

let shopcarHead = mongo.Schema({
	goodsName:String,
	price:Number,
	pic:String,
	count:Number,
	user:String,
	id:String
})

let shopcar = mongo.model("car",shopcarHead)

let orderHead = mongo.Schema({
	goodsName:String,
	price:Number,
	pic:String,
	count:Number,
	user:String,
	id:String
})

let order = mongo.model("order",orderHead)
module.exports = {admin,user,goods,shopcar,order}
