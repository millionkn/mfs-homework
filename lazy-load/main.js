const cp = require('child_process')
const path = require('path')
var client = cp.fork("./client/client.js",[]);
var server;
client.on('message',function(m){
	console.log(m);
    server = cp.exec(`node ./app.js "${m.uri}"`,{
		cwd:path.resolve(__dirname, './server')
	})
	server.stdout.on("data",function(s){
		console.log(s.toString())
	})
	server.stderr.on("data",function(s){
		console.log(s.toString())
	})
})