var mongodb = require('./db');
var util = require('./util');

function Company(company){ 
  this._id = company._id ? company._id : util.createUniqueId("company");
  this.username = company.username; 
  this.password = company.password; 
  this.name = company.name ? company.name : ""; 
  this.mes = company.mes ? company.mes : ""; 
  this.imgUrl = company.imgUrl ? company.imgUrl : ""; 
  this.intr = company.intr ? company.intr : ""; 
  this.type = 2; 
}; 
module.exports = Company; 
Company.prototype = {
    constructor: Company,
    //  注册  Company  更新用户
    //  callback 是执行玩保存后的回调函数
    save : function(callback){ 
              var company = this;
              //打开数据库
              mongodb.open(function(err,db){ 
                //如果打开出错，err会有出错信息，否则为null
                if(err){ 
                  //将注册信息错误信息作为参数返回给回调函数
                  return callback(err); 
                } 
                //连接数据库中的名为user的表，没有就创建
                db.collection('company',function(err,collection){ 
                //连接失败会将错误信息返回给回调函数，并且关闭数据库连接
                if(err){ 
                  mongodb.close(); 
                  return callback(err); 
                } 
               //插入新的数据
                collection.save(company,{safe: true},function(err,result){ 
                //不管是否成功都关闭数据库
                mongodb.close(); 
                //如果错误err有错误信息，将err和user返回给回调函数
                callback(err, result);//成功！返回插入的用户信息 
                console.log(result)
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
          db.collection('company', function(err, collection){ 
            if(err){ 
              mongodb.close(); 
              return callback(err); 
            } 
            //console.log(typeof name)
            //查找用户名 name 值为 name文档 
            collection.findOne({username: username},function(err, result){ 
              mongodb.close(); 
              if(result){ 
                var company = new Company(result); 
                //console.log(user)
                callback(err, company);//成功！返回查询的用户信息 
              } else { 
                callback(err, null);//失败！返回null 
              } 
            }); 
          }); 
        }); 
    },
     //  获得公司集合
    getCompany : function(callback){
      //打开数据库 
      mongodb.open(function(err, db){ 
        if(err){ 
          return callback(err); 
        } 
        //读取 users 集合 
        db.collection('company', function(err, collection){ 
          if(err){ 
            mongodb.close(); 
            return callback(err); 
          } 
          collection.find().toArray(function(err,items){
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
  }
