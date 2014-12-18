var express = require('express');
var router = express.Router();
module.exports = router;

/* GET home page. */
router.get('/', function(req, res,next) {

  var mysql = res.db.mysql;

  var pageSize = res.config.pageSize;

  var sql = "SELECT * from articles order by date_create desc limit 0," + pageSize + ";" ;
  // var sql = "SELECT * FROM articles;";
  var query = mysql.query(sql,function(err,rs){

    if(err){
      next(err);
      return;
    }
    var articles = tagedArticle(rs);
    // console.log(articles)
    var data = {
      title:"夕阳城堡 | Yesterday u said tomorrow!",
      articles:articles
    }
    res.render('index', data);
  });
  
});




function tagedArticle(rs){
  rs.forEach(function(r) {
    r.tags = !r.tags || r.tags === "" ? [] : r.tags.split(",");
  })
  return rs;
}