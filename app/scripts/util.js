var util = {
	createUniqueId : function(name) {
        var id = "";
        if (!name) {
            name = "unNamed";
        }
        id = name + "_" + Date.now() + "_" + Math.random().toString().substr(2);
        return id;
    },
    //继承
   	object: function (o){
		function F(){};
		F.prototype = o;
		return new F();
	},
	inheritPrototype: function (subType,supType){
		var prorotype = this.object(subType.prototype);
		prototype.constructor = subType;	//增强对象
		subType.prototype = prototype;
	}
}