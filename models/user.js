var mongodb = require('./db');
var util = require('./util');

function User(user){ 
  this._id = user._id ? user._id : util.createUniqueId("user");
  this.username = user.username; 
  this.password = user.password; 
  this.name = user.name ? user.name : ""; 
  this.sex = user.sex ? user.sex : '男';  
  this.location=user.location ? user.location : ""; 
  this.idCard=user.idCard ? user.idCard : "";
  this.phone=user.phone ? user.phone : "";
  this.tel=user.tel ? user.tel : "";
  this.email=user.email ? user.email : "";
  this.postcode=user.postcode ? user.postcode : "";
  this.fax=user.fax ? user.fax : "";
}; 
module.exports = User; 
User.prototype = {
    constructor: User,
    //  注册  保存一个用户  更新用户
    //  callback 是执行玩保存后的回调函数
    save : function(callback){ 
              var user = this;
              //打开数据库
              mongodb.open(function(err,db){ 
                //如果打开出错，err会有出错信息，否则为null
                if(err){ 
                  //将注册信息错误信息作为参数返回给回调函数
                  return callback(err); 
                } 
                //连接数据库中的名为user的表，没有就创建
                db.collection('user',function(err,collection){ 
                //连接失败会将错误信息返回给回调函数，并且关闭数据库连接
                if(err){ 
                  mongodb.close(); 
                  return callback(err); 
                } 
               //插入新的数据
                collection.save(user,{safe: true},function(err,result){ 
                //不管是否成功都关闭数据库
                mongodb.close(); 
                //如果错误err有错误信息，将err和user返回给回调函数
                callback(err, user);//成功！返回插入的用户信息 
                console.log(user)
            }); 
          }); 
        }) 
      },

    //  登录验证
    check : function(username,callback){
        //打开数据库 
        mongodb.open(function(err, db){ 
          if(err){ 
            return callback(err); 
          } 
          //读取 users 集合 
          db.collection('user', function(err, collection){ 
            if(err){ 
              mongodb.close(); 
              return callback(err); 
            } 
            //console.log(typeof name)
            //查找用户名 name 值为 name文档 
            collection.findOne({username: username},function(err, result){ 
              mongodb.close(); 
              if(result){ 
                var user = new User(result); 
                //console.log(user)
                callback(err, user);//成功！返回查询的用户信息 
              } else { 
                callback(err, null);//失败！返回null 
              } 
            }); 
          }); 
        }); 
    }
  }
