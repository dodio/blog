var express = require('express');
var router = express.Router();
module.exports = router;


var util = require("util");

router.use(function(req,res,next){
  if(req.signedCookies.login !== "yes"){
    res.redirect("/");
    return;
  }
  next();
});
router.get("/$",function(req,res,next){
  var action = req.query.action;
  var aid = req.query.aid;

  var db = res.db;
  var data = {};

  var sqls = [
  "SELECT * FROM tags;"
  ]

  if(action === "edit" && aid){
    var temp = util.format("SELECT * FROM `articles` where id=%s;",db.mysql.escape(aid));
    sqls.push(temp);
  }


  db.mydb.querySqls(sqls).then(function(rs){
    data.tags = rs[0];

    if(rs[1] && rs[1][0]){
      
      var article = rs[1][0];

      data.article = article;

      if(typeof article.tags === "string"){
        var atags = article.tags.split(",");
        atags.forEach(function(at){
          data.tags.forEach(function(t){
            if(at === t.tag){
              t.className = "btn-success";
            }else{
              t.className = "";
            }
          });
        })
      }
    }


    res.render("article_edit",data);
  })

  .then(null,function(err){
    next(err);
  });

})