
var fs = require("fs");

/**
 * 将某目录下的所有文件加载到 router 下
 * 文件名即使路径名
 * 
 * @param  {[type]} router     [description]
 * @param  {[type]} base       [description]
 * @param  {[type]} dir_routes [description]
 * @return {[type]}            [description]
 */
function loadRoutes(router,base,dir_routes){
  if(!router || typeof base !=="string" || !dir_routes){
    throw new Error("缺少足够参数。需要router,router根路径,routes文件的放置目录");
  }

  var files = fs.readdirSync(dir_routes);

  files.forEach(function(f){
      var stat = fs.lstatSync(dir_routes+"/"+f);

      if(stat.isDirectory()){
        loadRoutes(router,base+ "/" +f ,dir_routes+"/" + f);
        return;
      }

      var name =  f === "index.js" ? "" : f.replace(".js","");

      path = base + "/" + name;

      var module = dir_routes+"/"+f;

      console.log("加载路径:%s,模块%s成功",path,module);

      router.use(path,require(module));
  })
}

exports.loadRoutes = loadRoutes;