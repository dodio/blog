var express = require('express');
var router = express.Router();
module.exports = router;

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var path = require("path");

var fs = require("fs");

router.use(function(req,res,next){
  req.signedCookies.login !== "yes" ? next(ErrorUnlogin) : next();
});

router.post("/$",multipartMiddleware,function(req,res,next){

  var file = req.files.upload_file;
  var err;

  if(!file){
    err = new Error("没有文件");
  }

  if(!isImg(file.type)){
    err = new Error("文件类型不正确");
  }

  var ext = file.path.substring(file.path.lastIndexOf("."));

  //自己用，不怕重复
  var filename = Date.now()+ext;


  var root_dir = process.cwd();
  var position = req.body.position;
  var upload_dir = "/" + res.config.upload_dir+"/"+position ;
  var destname_file = path.join(root_dir, upload_dir,filename);

  res.func.moveFile(file.path,destname_file,function(err){

    if(err){
      var data = {
        "success":false,
        "msg": err.message,
        "file_path": ""
      }
    }else{
      var data = {
        "success":true,
        "msg":"上传成功",
        "file_path":upload_dir+"/"+filename
      }
    }

    res.json(data);
  })
  
})


function isImg(type){
  return type === "image/jpeg" || type === "image/gif" || type === "image/png";
}