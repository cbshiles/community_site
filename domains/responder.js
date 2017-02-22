var fs = require('fs')

var providers = require('./providers.js')

function moldFunctor(obj){

    var prov = providers.vars(hook)

    function hook(name){
	return moldFunctor(obj.subs[name])(prov) //might as well not be a prov here
    }

    return function(){
	var isText = !obj.firstWasVar
	
	var ltot = obj.vars.length+obj.texts.length;
	var ans = ""
	for (var i=0; i<ltot; i++){
	    var dex = (i - i%2)/2 //integer div 
	    if (isText){
		ans += obj.texts[dex]
	    } else {

		ans += prov[obj.vars[dex]]()
	    }
	    isText = !isText
	}
	return ans
    }
}

function makeHTML(obj){
    return moldFunctor(obj)()
}

var methods = {
    GET: function(req, res){
	var path = req.url[0]
	var file = req.url[1]

	var dot = file.lastIndexOf('.')
	var base, xten
	if (dot == -1){
	    base = file
	    xten = ''
	} else {
	    base = file.substring(0, dot)
	    xten = file.substring(dot+1)
	}

	if (xten == 'html'){
	    var mold = JSON.parse(fs.readFileSync(path+'pages/'+base+'.json', 'utf8'));
	    res.end(makeHTML(mold))
	} else res.end("Got nothin else yet")
    },

    POST: function(req, res){
	res.end("bleh")
    }
}
	
module.exports.main = function(req, res){
    var func = methods[req.method]
    if (typeof func == 'undefined')
	res.end('404')
    func(req, res)
}
