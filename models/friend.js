var mongodb = require('./db');
var util = require('./util');

function Friend(friend){ 
  this._id = friend._id ? friend._id : util.createUniqueId("friend");
  this.userId = friend.userId ? friend.userId : "";
  this.name = friend.name ? friend.name : ""; 
  this.idCard=friend.idCard ? friend.idCard : "";
  this.phone=friend.phone ? friend.phone : "";
}; 
module.exports = Friend; 
Friend.prototype = {
    constructor: Friend,
    //  注册  保存一个用户  更新用户
    //  callback 是执行玩保存后的回调函数
    save : function(callback){ 
            var friend = this;
            //打开数据库
            mongodb.open(function(err,db){ 
              //如果打开出错，err会有出错信息，否则为null
              if(err){ 
                //将注册信息错误信息作为参数返回给回调函数
                return callback(err); 
              } 
              //连接数据库中的名为friend的表，没有就创建
              db.collection('friend',function(err,collection){ 
              //连接失败会将错误信息返回给回调函数，并且关闭数据库连接
              if(err){ 
                mongodb.close(); 
                return callback(err); 
              } 
             //插入新的数据
              collection.save(friend,{safe: true},function(err,result){ 
              //不管是否成功都关闭数据库
              mongodb.close(); 
              //如果错误err有错误信息，将err和friend返回给回调函数
              callback(err, result);//成功！返回插入的用户信息 
              console.log(result)
          }); 
        }); 
      }) 
    },

    //  获得朋友集合
    getFriends : function(userId,callback){
      //打开数据库 
      mongodb.open(function(err, db){ 
        if(err){ 
          return callback(err); 
        } 
        //读取 users 集合 
        db.collection('friend', function(err, collection){ 
          if(err){ 
            mongodb.close(); 
            return callback(err); 
          } 
          //查找Fried中 userId 值为 userId 
          collection.find({userId: userId}).toArray(function(err,items){
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

    //  删除friend  friendId为friend表中的_id
    deleteFriend : function(friendId, callback){
      mongodb.open(function(err, db){
        if (err) {
          return  callback(err);
        };
        //读取 users 集合 
        db.collection('friend', function(err, collection){ 
            if(err){ 
              mongodb.close(); 
              return callback(err); 
            } 
            collection.remove({_id: friendId},{safe:true},function(err,result){
              return  callback(err,result);
          });
        });   
      })
    }
  }
