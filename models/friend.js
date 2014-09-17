var util = require('./util');
var baseModel = require('./baseModel');


function Friend(friend){ 
  this._id = friend._id ? friend._id : util.createUniqueId("friend");
  this.userId = friend.userId ? friend.userId : "";
  this.name = friend.name ? friend.name : ""; 
  this.idCard=friend.idCard ? friend.idCard : "";
  this.phone=friend.phone ? friend.phone : "";
}; 

util.inheritPrototype(Friend, baseModel);

module.exports = Friend; 
