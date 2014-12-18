var express = require('express');
var router = express.Router();
module.exports = router;

var pass = "xiyang";
var month = 30 * 24 * 60 * 60 * 1000;
router.get("/$",function(req,res,next) {
  res.render("login");
});

router.post("/$",function(req,res,next){
  var password = req.param("password");

  if(password === pass){
    res.cookie("login","yes",{signed:true,maxAge:month,httpOnly:true});
    res.redirect("/home");
    return;
  }

  res.send("..........");

});
router.all("/exit",function(req,res,next){
  res.clearCookie("login");
  res.redirect("/");
})