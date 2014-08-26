var mongodb = require('./db');
var util = require('./util');

function Ticket(ticket){ 
  this._id = ticket._id ? ticket._id : util.createUniqueId("ticket");
  this.userId = ticket.userId ? ticket.userId : "";
  this.bookingId = ticket.bookingId ? ticket.bookingId : "";
  this.name = ticket.name ? ticket.name : ""; 
  this.beginP = ticket.beginP ? ticket.beginP : ""; 
  this.endP = ticket.endP ? ticket.endP : ""; 
  this.date = ticket.date ? ticket.date : ""; 
  this.price = ticket.price ? ticket.price : ""; 
  this.phone = ticket.phone ? ticket.phone : ""; 
  this.companyId = ticket.companyId ? ticket.companyId : ""; 

}; 
module.exports = Ticket; 
Ticket.prototype = {
    constructor: Ticket,
    //  注册  保存一个用户  更新用户
    //  callback 是执行玩保存后的回调函数
    save : function(callback){ 
            var ticket = this;
            //打开数据库

            mongodb.open(function(err,db){ 

              //如果打开出错，err会有出错信息，否则为null
              if(err){ 
                //将注册信息错误信息作为参数返回给回调函数
                return callback(err); 
              } 
              //连接数据库中的名为friend的表，没有就创建
              db.collection('ticket',function(err,collection){ 
              //连接失败会将错误信息返回给回调函数，并且关闭数据库连接
              if(err){ 
                mongodb.close(); 
                return callback(err); 
              } 
             //插入新的数据
             console.log(ticket);
              collection.save(ticket,{safe: true},function(err,result){ 
              //不管是否成功都关闭数据库
              mongodb.close(); 
              //如果错误err有错误信息，将err和friend返回给回调函数
              callback(err, result);//成功！返回插入的用户信息 
              console.log(result)
          }); 
        }); 
      }) 
    },

    //  获得 已买票
    getBookingTicket : function(userId,callback){
      //打开数据库 
      mongodb.open(function(err, db){ 
        if(err){ 
          return callback(err); 
        } 
        //读取 users 集合 
        db.collection('ticket', function(err, collection){ 
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

    //  删除ticket  ticketId为ticket表中的_id
    cencelTicket : function(ticketId, callback){
      mongodb.open(function(err, db){
        if (err) {
          return  callback(err);
        };
        //读取 users 集合 
        db.collection('ticket', function(err, collection){ 
            if(err){ 
              mongodb.close(); 
              return callback(err); 
            } 
            collection.remove({_id: ticketId},{safe:true},function(err,result){
              return  callback(err,result);
          });
        });   
      })
    },

        //  商家 获得 已预定的票
    companyGetBookingTicket : function(companyId,callback){
      //打开数据库 
      mongodb.open(function(err, db){ 
        if(err){ 
          return callback(err); 
        } 
        //读取 ticket 集合 
        db.collection('ticket', function(err, collection){ 
          if(err){ 
            mongodb.close(); 
            return callback(err); 
          } 
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
  }
