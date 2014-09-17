var util = require('./util');
var baseModel = require('./baseModel');

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

//添加新路线 得到路线列表  删除路线
util.inheritPrototype(Path, baseModel);

module.exports = Path; 
