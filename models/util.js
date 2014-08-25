var util = {
	createUniqueId : function(name) {
        var id = "";
        if (!name) {
            name = "unNamed";
        }
        id = name + "_" + Date.now() + "_" + Math.random().toString().substr(2);
        return id;
    }
}
module.exports = util;
