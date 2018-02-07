var npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
var spawn = require('child_process').spawn
var client = spawn(npm,['run','dev'],{
    cwd:__dirname
});
client.stdout.on("data",(buffer)=>{
    var str = buffer.toString();
    var uri;
    if(matches = str.match(/^Project is running at (.*)/)){
        uri = matches[1].match(/34m(.*)\u001b\[39m/)[1]
        process.send?process.send({uri:uri}):console.log(uri)
    }
})