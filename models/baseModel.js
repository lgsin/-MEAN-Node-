var mongodb = require('./db');
var util = require('./util');

// 共用父类 含共用操作数据库的方法
function SuperType(){};

// 保存、更新
SuperType.prototype.save = function(tabelName,callback){ 
	  var obj = this;
	  console.log(obj)
      //打开数据库
      mongodb.open(function(err,db){ 
	        //如果打开出错，err会有出错信息，否则为null
	        if(err){ 
	          //将注册信息错误信息作为参数返回给回调函数
	          return callback(err); 
	        } 
	        //连接数据库中的名为user的表，没有就创建
	        db.collection(tabelName,function(err,collection){ 
	        //连接失败会将错误信息返回给回调函数，并且关闭数据库连接
	        if(err){ 
	          mongodb.close(); 
	          return callback(err); 
	        } 
	       //插入新的数据
	        collection.save(obj,{safe: true},function(err,result){ 
	        //不管是否成功都关闭数据库
	        mongodb.close(); 
	        console.log(result)
	        //如果错误err有错误信息，将err和user返回给回调函数
	        callback(err, result);//成功！返回插入的用户信息 
	    }); 
	  }); 
	}) 
};
//获得表中所有数据
SuperType.prototype.getList = function(tableName,paramsObj,callback){
	console.log(paramsObj)
  //打开数据库 
  mongodb.open(function(err, db){ 
    if(err){ 
      return callback(err); 
    } 
    //读取 tableName集合 
    db.collection(tableName, function(err, collection){ 
      if(err){ 
        mongodb.close(); 
        return callback(err); 
      } 
      //传入 对象参数paramsObj
      collection.find(paramsObj).toArray(function(err,items){
        if(err) {
            throw err; 
          }else{//如果数据库没有内容
            mongodb.close();
            return callback(err,items);
          } 
        }); 
      }); 
  }); 
}
// 验证 登录
SuperType.prototype.check = function(tableName,paramsObj,callback){
	console.log(paramsObj)
    //打开数据库 
    mongodb.open(function(err, db){ 
      if(err){ 
        return callback(err); 
      } 
      //读取 tableName 集合 
      db.collection(tableName, function(err, collection){ 
        if(err){ 
          mongodb.close(); 
          return callback(err); 
        } 
        //查找 paramsObj
        collection.findOne(paramsObj,function(err, result){ 
          mongodb.close(); 
          if(result){ 
            callback(err, result);//成功！返回查询的用户信息 
          } else { 
            callback(err, null);//失败！返回null 
          } 
        }); 
      }); 
    }); 
}
// 删除 
SuperType.prototype.deleteById = function(tableName,paramsObj,callback){
	console.log(paramsObj)
	mongodb.open(function(err, db){
        if (err) {
          return  callback(err);
        };
        //读取 tableName 集合 
        db.collection(tableName, function(err, collection){ 
            if(err){ 
              mongodb.close(); 
              return callback(err); 
            } 
            collection.remove(paramsObj,{safe:true},function(err,result){
              return  callback(err,result);
          });
        });   
      })
}
module.exports = SuperType; 
