var util = require('./util');
var baseModel = require('./baseModel');

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
  this.type = 1; 
}; 
module.exports = User; 

// 继承 共用数据库操作方法
// 保存、更新 user
// 验证登录
util.inheritPrototype(User, baseModel);

