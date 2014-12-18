var express = require('express');
var router = express.Router();
module.exports = router;

var ErrorUnlogin = new Error("未登录");

router.use(function(req,res,next){
  req.signedCookies.login !== "yes" ? next(ErrorUnlogin) : next();
});

router.post("/add",function(req,res,next) {
  var article = {
    title:undefined,
    content:undefined
  }
  for(var i in article){
    article[i] = req.param(i);
  }

  if(!article.title){
    next(new Error("标题不能为空."));
    return;
  }

  if(!article.content){
    next(new Error("内容不能为空."));
    return;
  }


  var db = res.db;

  var sql = "INSERT INTO articles SET ?";

  db.mysql.query(sql,article,function(err,rs){
    if(err){
      next(err);
      return;
    }

    var data = {
      state:0,
      msg:"发表成功!",
      aid:rs.insertId
    }
    res.json(data);
  })
})


router.post("/edit",function(req,res,next){
  var aid = req.param("aid");

  var article = {
    title:undefined,
    content:undefined
  }
  for(var i in article){
    article[i] = req.param(i);
  }

  if(!aid){
    next(new Error("没有文章id."));
    return;
  }
  if(!article.title){
    next(new Error("标题不能为空."));
    return;
  }

  if(!article.content){
    next(new Error("内容不能为空."));
    return;
  }

  var db = res.db;

  var sql = "UPDATE articles SET ? WHERE id="+aid;


  db.mysql.query(sql,article,function(err,rs){
    if(err){
      next(err);
      return;
    }

    var data = {
      state:0,
      msg:"修改成功!",
      aid:aid
    }
    res.json(data);
  })

})
