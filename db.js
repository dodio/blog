var mysql = require("mysql");
var Promise = require("promise");
var pool = mysql.createPool(require("./config").db);
var mydb = {
  query:function(sql){
    var p = new Promise(function(resolve,reject){
      pool.query(sql,function(err,rs){
        if(err){
          reject(err);
          return;
        }
        resolve(rs);
      });
    });
    return p ;
  },

  querySqls: function(sqls){

      var query_array = sqls.map(function(sql){
        return mydb.query(sql);
      });
      return Promise.all(query_array);
  }
}



module.exports = {
  mydb:mydb,
  mysql:pool
};
