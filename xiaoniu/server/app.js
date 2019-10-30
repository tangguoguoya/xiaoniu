let Koa = require("koa")
let server = new Koa();
server.listen(3000,err=>{
	console.log("后端服务器已监听3000端口，若有向3000端口发送请求，服务器就会执行代码")
})

let Static = require("koa-static")
server.use(Static("./src"))

let cors = require("koa2-cors")
server.use(cors())
let body = require("koa-body")
server.use(body())

let multer = require("koa-multer")
//tool就是一个接收器的实例，在实例时至少要告诉它 图片 存储的地址

var storage = multer.diskStorage({
  //文件保存路径
  //destination目标址
  //request 这一请求 的信息（req.url  req.query 。。。）
  //file 文件信息 （文件名 文件大小  文件的内容）
  //cb -> callback ->回调函数
  destination: function (req, file, cb) {
    cb(null, 'src/upload/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
  	//以点分割成数组，数组的最后一项就是后缀名
  	// 声明一个变量 = 文件.原始的文件名（sew213.jpg）.slit(".") -> [sew213,jpg]
    var fileFormat = (file.originalname).split("."); 
           //1234567890 + "." + 
    cb(null,getDate() + "." + fileFormat.pop());
  }
})


let {admin,user,goods,shopcar,order} = require("./mongo")
let Router = require("koa-router")
let router = new Router();
server.use(router.routes())

router.post("/admin",async (ctx,next)=>{
	let web = ctx.request.body;
	let res = await admin.findOne({userName:web.userName})
	if (res) {
		if (res.pwd==web.pwd) {
			ctx.body="登录成功"
		} else{
			ctx.body="密码错误"
		}
	} else{
		let oneRow = new admin(web)
		await oneRow.save()
		ctx.body = "🐒🐒注册成功！🐒🐒";
	}
})

router.get("/admin",async (ctx,next)=>{
	let total = await admin.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	let data = await admin.find().skip((current-1)*size).limit(size).sort({_id:-1})
	ctx.body={total,data}
})

router.post("/user",async (ctx,next)=>{
	let web = ctx.request.body;
	let oneRow = new user(web);
	await oneRow.save()
	ctx.body={
		status:1,
		message:"恭喜！🐒🐒注册成功！~🐒🐒"
	}
})
router.get("/user",async (ctx,next)=>{
//	ctx.body = await user.find()
	let total = await user.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	let data = await user.find().skip((current-1)*size).limit(size).sort({_id:-1})
	ctx.body={total,data}
})

router.post("/goods",async (ctx,next)=>{
	let web = ctx.request.body;
	let oneRow = new goods(web);
	let res = await oneRow.save();
	if (res) {
		ctx.body= "商品添加成功！"
	} else{
		ctx.body= "商品添加失败！"
	}
})
router.get("/goods",async (ctx,next)=>{
//	ctx.body = await user.find()
	let total = await goods.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	let data = await goods.find().skip((current-1)*size).limit(size).sort({_id:-1})
	ctx.body={total,data}
})

router.delete("/goods",async (ctx,next)=>{
	let _id = ctx.query.id;
	await goods.deleteOne({_id});
	ctx.body="删除成功！"
})

router.put("/goods",async (ctx,next)=>{
	let web = ctx.request.body;
	let _id = ctx.query.id;
	await goods.updateOne({_id},web);
	ctx.body="修改成功！"
})

router.get("/list",async (ctx,next)=>{
	let pagesize = +ctx.query.pagesize;
	let current = +ctx.query.current;
	ctx.body = await goods.find({},{pic:1}).skip((current-1)*pagesize).limit(pagesize).sort({_id:-1})
})

router.get("/listTotal",async (ctx,next)=>{
	ctx.body = await goods.countDocuments()
})

router.get("/detail",async (ctx,next)=>{
	let _id = ctx.query.id;
	ctx.body = await goods.findOne({_id});
})

router.post("/login",async (ctx,next)=>{
	let web = ctx.request.body;
	let one = await user.findOne({userName:web.userName});
//	console.log(one)

	if (!one && !isNaN(web.userName)) {
		one = await user.findOne({tel:+web.userName});
	}
	if (one) {
		if (one.pwd == web.pwd) {
			ctx.body={
				status:1,
				message:"恭喜！🐒🐒登录成功！~🐒🐒"
			}
//			ctx.body="登录成功"
		} else{
			ctx.body={
				status:0,
				message:"密码错误"
			}
//			ctx.body="密码错误"
		}
	}else{
		ctx.body="用户名或密码不存在"
	}
})

router.post("/car",async (ctx,next)=>{
	let web = ctx.request.body;
	let one = await shopcar.findOne({id:web.id,user:web.user})
//	console.log(one)
	if(one){
		one.count += web.count;
		await shopcar.updateOne({_id:one._id},one)
//		console.log(one)
	}else{
		let oneRow = new shopcar(web);
		let res = await oneRow.save()
//		console.log(res)
	}
	ctx.body = "已加入购物车！"
})

router.get("/car",async (ctx,next)=>{
	let user = ctx.query.user;
	ctx.body = await shopcar.find({user});
})

router.post("/order",(ctx,next)=>{
	let web = ctx.request.body;
	web.forEach(async i=>{
		let oneRow = new order(i);
		await oneRow.save()
	})
	ctx.body={
		status:1,
		message:"🐒🐒结算成功！~🐒🐒"
	}
})

router.get("/order",async (ctx,next)=>{
	let web = ctx.request.body;
	ctx.body = await order.find({order});
})


function getDate(){
	var time = new Date();
	console.dir(time)  //日期对象
	//1.获取年
	var year = time.getFullYear(); //2019
	//2.获取月
	var month = time.getMonth()+1; //月的范围是0-11
	//3.获取日
	var day = time.getDate();
	//4.获取星期
	var week = time.getDay();//3 //星期范围是0-6,星期天是一周第一天
	var weekStr = "日一二三四五六";
	var week1 = weekStr[week]; //三
	//5.获取小时
	var hours = time.getHours(); //小时范围是 0-23
	//6.获取分钟
	var minutes = time.getMinutes(); //分钟范围是 0-59
	//7.获取秒
	var seconds = time.getSeconds(); //秒范围是 0-59
	//8.获取毫秒
	var seconds2 = time.getMilliseconds()
	return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${seconds2}`
}
let tool = multer({storage})

//在/upload请求响应时，就接收单独的一张图片
router.post("/upload",tool.single("file"),(ctx,next)=>{
	ctx.body = ctx.req.file.filename;       
})
