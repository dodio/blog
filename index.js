var blog = require("./blog");
var config = require("./config");
blog.listen(config.port,function(err) {
  if(!err){
    console.log("启动成功.监听端口:%s",config.port);
  }
})

