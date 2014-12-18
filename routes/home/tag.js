var express = require('express');
var router = express.Router();
module.exports = router;

var mysql = require("mysql");


var util = require("util");


router.use(function(req,res,next){
  req.signedCookies.login !== "yes" ? next(ErrorUnlogin) : next();
});

router.post("/add",function(req,res,next) {
  var tags = req.param("tags");
  var db = res.db;

  var sql = "INSERT INTO tags SET ?";
  
  var tag = {
    tag:tags
  }

  db.mysql.query(sql,tag,function(err,rs){
    if(err){
      next(err)
      return;
    }
    res.json({
      state:0,
      data:tags
    })
  });

})

router.get("/rel",function(req,res,next){
  var aid = req.query.aid;
  var tag = req.query.tag;
  var name = req.query.name;

  if(!aid || !tag){
    next(new Error("参数没对"))
    return;
  }

  var rel = {
    aid:aid,
    tag:tag
  }

  var db = res.db;

  var sql_article_tag = util.format("select tags from articles where id=%s;",db.mysql.escape(aid));

  db.mydb.query(sql_article_tag).then(function(tags){

    var tag_yuanlai = tags[0].tags;

    var tags = !tag_yuanlai || tag_yuanlai === "" ? [] : tag_yuanlai.split(",");
    
    tags.push(tag);

    var tag_xianzai = tags.join(",");

    var sqls = [
    // 插入数据库tag记录
    mysql.format("INSERT INTO tag_article SET ?",rel),
    // 更新tag的文章数量
      util.format( "UPDATE tags SET count=count+1 WHERE tag ='%s';",tag),
    // 在文章tags 字段追加tag 
      util.format("update articles set tags='%s' where id=%s;",tag_xianzai, db.mysql.escape(aid))
    ];

    return db.mydb.querySqls(sqls);
  })
  .then(function(rs){
    res.json({
      state:0,
      msg:"关联成功",
      data:rs
    });
  })

  .then(null,function(err){
    next(err);
  });

})


router.get("/unrel",function(req,res,next){
  var aid = req.query.aid;
  var tag = req.query.tag;
  if(!aid || !tag){
    next(new Error("参数没对"))
    return;
  }

  var db = res.db;


  var sql_article_tag = util.format("select tags from articles where id=%s;",db.mysql.escape(aid));

  db.mydb.query(sql_article_tag).then(function(tags){

    var exp = RegExp(tag+",?|,"+tag+"$","g");

    var tags =  tags[0].tags.replace(exp,'');

    var sqls = [
    // 插入数据库tag记录
      util.format("DELETE FROM tag_article WHERE aid=%s AND tag='%s'",db.mysql.escape(aid),tag),
    // 更新tag的文章数量
      util.format( "UPDATE tags SET count=count-1 WHERE tag ='%s';",tag),
    // 在文章tags 去掉tag
      util.format("update articles set tags='%s' where id=%s;",tags, db.mysql.escape(aid))
    ];

    return db.mydb.querySqls(sqls);
  })
  .then(function(rs){
    res.json({
      state:0,
      msg:"取消成功",
      data:rs
    });
  })

  .then(null,function(err){
    next(err);
  });


})