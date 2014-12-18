var express = require('express');
var router = express.Router();
module.exports = router;


router.get("/:aid.html",function(req,res,next){
  var aid = req.params.aid;
  var query = res.db.mysql.query("SELECT * FROM articles WHERE id="+aid+";",function(err,rs){
    if(err){
      next(err);
      return;
    }
    if(!rs[0]){
      next(new Error("你找的文章被作者吃了."));
      return;
    }
    rs[0].tags = rs[0].tags === "" ? [] : rs[0].tags.split(",");
    var data = {
      articles:rs,
      title:rs[0].title + " | " + "夕阳城堡"
    }
    res.render('index', data);
  });

});