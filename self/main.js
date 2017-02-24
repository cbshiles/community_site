var http = require('http')
var sys = require('./sys.js')
var router = {
    GET: require('./GetRequest.js'),
    POST: require('./PostRequest.js')
}

function route(req, res) {

    var response = router[req.method]

    if(req.method == "GET"){


	var ax = {"firstWasVar":false,
	 "vars":["varpar"],
	 "texts":["<!DOCTYPE html >\n<!DOCTYPE html>\n\n\n\n<html>\n\t<head></head>\n\t<body>\n\t<p attrib=\"dirt\">This the  text.  </p>  \n\t",
		  "\n\t</body>\n\t\n</html>\n\t\n\n\n"],

	 "subs":{
	     "par":{"firstWasVar":false,
		    "vars":[],"texts":["\n\t<p>Par of  the   var   </p>   \n   \n"],"subs":{ }
		   }
	 }
		 }


	function ider(obj) {
	    return {
		vars: { varpar: function()
			{return layoutFunctor(obj.subs.par)(null)}
		      },
		subs: {}
	    }
	}
	
	function moldFunctor(obj){
	    return function(prov){
		
		var isText = !obj.firstWasVar
		
		var ltot = obj.vars.length+obj.texts.length;
		var ans = ""
		for (var i=0; i<ltot; i++){
		    var dex = (i - i%2)/2 //integer div 
		    if (isText){
			ans += obj.texts[dex]
		    } else {
			ans += prov.vars[obj.vars[dex]]()
		    }
		    isText = !isText
		}
		return ans
	    }}

	function doit(mold, prov){
	    if (mold.vars.length == 0)
		return mold.texts[0];
	    else {
		return layoutFunctor(mold)(prov)
	    }
	}
	    
	res.end(doit(ax, ider(ax)))
	return
    }
    
    if (typeof response !== 'undefined')
	response.go(req, res)
    else {
	let errMsg = 'Sorry, HTTP method '+req.method+" isn't supported."
	res.end(errMsg)
	console.log(errMsg)
    }
}

function launch(port, router){
    http.createServer(router).listen(port)
    console.log('Server running on '+port+'.')
}

launch(sys.cfg.port, route)
