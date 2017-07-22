var rTools = require('../../../server/responderTools.js')
var fs = require('fs')

postObjj = { //Name conflict!! geez..
    post: function(req, res){
	var body=''
	req.on('data', function(data) {
	    body += data
	    if (body.length > 1e5) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                req.connection.destroy();
            }
	})

        req.on('end', function () {
	    var up = body.split(':', 2)
	    if (up[0] === 'test' && up[1] === 'tset321'){
		//create session variable that gives them permissions
		res.end('y')
	    } else {
		res.end('n')
	    }
        })
    },

    send: function(req, res){
	var body=''
	req.on('data', function(data) {
	    body += data
	    if (body.length > 1e5) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                req.connection.destroy();
            }
	})

        req.on('end', function () {
	    console.log(body)
	    var bod = JSON.parse(body)

	    var pth = __dirname+'/res/'+bod.fname
	    console.log("path: "+pth)
	    console.log(fs.existsSync(pth))
	    if (fs.existsSync(pth)) {
	    res.end('n')
	    } else {
	    fs.writeFileSync(pth, bod.content);
	    res.end('y')
	    }
	})
    }
}

module.exports.methods = {
    GET: rTools.nrmGet,
    POST: function(req, res){
	console.log(req.url[1])
	var fn = postObjj[req.url[1]]
	if (typeof fn !== 'undefined')
	    fn(req, res)
	else
	    res.end('cant find command')
    }

}

