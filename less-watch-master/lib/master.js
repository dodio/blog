var fs = require("fs");
var watch = require("node-watch");
var path = require("path");

function mixin(){
  var obj = {};
  [].prototype.forEach.call(arguments,function(arg){
    for(var i in arg){
      if(Object.hasOwnproperty(i)){
        obj[i] = arg[i];
      }
    }
  })
}

function Master(){

}

var proto = {
  //根据文件名获取前端css路径
  getCss:function(filePath){},
  //往css列表中添加非本地less编译生成的css文件
  addCss:function(filePath){

  }
}




var default = {
  lessDir:path.join(process.cwd(),"less"),
  dest:"all"


}
function create(options){


}