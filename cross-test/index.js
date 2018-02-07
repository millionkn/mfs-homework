var express = require("express");
var app1 = express();
app1.use(function(req,res,next){
	res.set('Content-Type','text/html');
	next();
})
app1.get("/",function(req,res){
	res.end("在浏览器地址栏输入127.0.0.1/要注册的用户名即可")
})
app1.get("/:id",function(req,res){
	res.end(`
	<script>
	var ajax = new XMLHttpRequest()
    ajax.open("GET","http://127.0.0.1:3000/${req.params.id}/",false);//这里用同步方式。。没有引入jquery写state太麻烦。。
	ajax.send();
	console.log(ajax.responseText);
	document.write('已接收到'+ajax.responseText)
	</script>`);
});

app1.listen(80);

var app2 = express();
app2.get('/:id',function(req,res){
	var hos = req.get('Origin');
	if(hos=='http://127.0.0.1'){
		res.set('Access-Control-Allow-Origin',hos);
		res.send(req.params.id=="mafengshe"?'{errno:1,errmsg:"用户名已经存在",data:{}}':'{errno:0,errmsg:"",data:{}}');
	}
	res.end();
})
app2.listen(3000);

console.log("进入`127.0.0.1/用户id/`即可")
console.log("其实就是懒。。不想写ui了")