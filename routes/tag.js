var express = require('express');
var router = express.Router();
module.exports = router;

var util = require("util");

router.get("/:tag",function(req,res,next) {
  var tag = req.params.tag;

  var sql  = util.format("SELECT * FROM tag_article,articles where tag_article.aid = articles.id and tag = %s order by date_create desc limit 0,%s;",res.db.mysql.escape(tag),res.config.pageSize);

  console.log(sql);
  res.db.mydb.query(sql).then(function(rs){
    var articles = tagedArticle(rs);

    var title = util.format("有关[%s]的文章. | 夕阳城堡",tag);
    var data = {
      articles:articles,
      title:title
    }
    res.render("index",data);
  })

  .then(null,function(err){
    next(err);
  })

})

function tagedArticle(rs){
  rs.forEach(function(r) {
    r.tags = !r.tags || r.tags === "" ? [] : r.tags.split(",");
  })
  return rs;
}