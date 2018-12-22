var fs = require('fs');

module.exports.vars = function(hook){
    return {
	lzt:
	function(){

	    var items = fs.readdirSync(__dirname+'/../res')
	    var ans = ''
	    for (var i=0; i<items.length; i++) {
		ans += '<p class="link"><a href="/codeLib/'+items[i]+'">'+items[i]+'</a></p>\n'
	    }

	    return ans
	}
    }
}
