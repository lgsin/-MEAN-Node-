var mongodb = require('./db');
var util = require('./util');

function Path(path){ 
  this._id = path._id ? path._id : util.createUniqueId("path");
  this.companyId = path.companyId ? path.companyId : "";
  this.beginName = path.beginName;
  this.beginIntr = path.beginIntr;
  this.endName = path.endName;
  this.endIntr = path.endIntr;

  this.price=path.price ? path.price : "";
  this.time=path.time ? path.time : "";
  this.remainder=path.remainder ? path.remainder : "";
}; 
module.exports = Path; 
Path.prototype = {
    constructor: Path,
    //  注册  保存一个用户  更新用户
    //  callback 是执行玩保存后的回调函数
    save : function(callback){ 
            var path = this;
            //打开数据库
            mongodb.open(function(err,db){ 
              //如果打开出错，err会有出错信息，否则为null
              if(err){ 
                //将注册信息错误信息作为参数返回给回调函数
                return callback(err); 
              } 
              //连接数据库中的名为friend的表，没有就创建
              db.collection('path',function(err,collection){ 
              //连接失败会将错误信息返回给回调函数，并且关闭数据库连接
              if(err){ 
                mongodb.close(); 
                return callback(err); 
              } 
             //插入新的数据
              collection.save(path,{safe: true},function(err,result){ 
              //不管是否成功都关闭数据库
              mongodb.close(); 
              //如果错误err有错误信息，将err和friend返回给回调函数
              callback(err, result);//成功！返回插入的用户信息 
              console.log(result)
          }); 
        }); 
      }) 
    },

    //  获得path集合
    getPath : function(companyId,callback){
      //打开数据库 
      mongodb.open(function(err, db){ 
        if(err){ 
          return callback(err); 
        } 
        //读取 users 集合 
        db.collection('path', function(err, collection){ 
          if(err){ 
            mongodb.close(); 
            return callback(err); 
          } 
          //查找Fried中 userId 值为 userId 
          collection.find({companyId: companyId}).toArray(function(err,items){
            if(err) {
                throw err; 
              }else{//如果数据库没有内容
                mongodb.close();
                return callback(err,items);
              } 
            }); 
          }); 
      }); 
    },

    //  删除path  pathId为path表中的_id
    deletePath : function(pathId, callback){
      mongodb.open(function(err, db){
        if (err) {
          return  callback(err);
        };
        //读取 path 集合 
        db.collection('path', function(err, collection){ 
            if(err){ 
              mongodb.close(); 
              return callback(err); 
            } 
            collection.remove({_id: pathId},{safe:true},function(err,result){
              return  callback(err,result);
          });
        });   
      })
    }
  }
