var util = {
	createUniqueId : function(name) {
        var id = "";
        if (!name) {
            name = "unNamed";
        }
        id = name + "_" + Date.now() + "_" + Math.random().toString().substr(2);
        return id;
    },
 	//寄生组合式继承
   	object: function (o){
		function F(){};
		F.prototype = o;
		return new F();
	},
	//寄生组合式继承
	inheritPrototype: function (subType,supType){
		var prototype = this.object(supType.prototype);
		prototype.constructor = subType;	//增强对象
		subType.prototype = prototype;
	}
}
module.exports = util;
