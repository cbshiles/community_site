var html = require('./html-tools.js');
for (let key in html) global[key] = html[key]
var sys = require('./sys.js')
var fs = require('fs')

var scripts = `
function redirect(path){
    window.location.replace('http://${sys.cfg.server}:${sys.cfg.port}/'+path)
}

function reflect(){
    var str = '';
    for (var p in this) {
        if (this.hasOwnProperty(p)) {
            str += p + '::' + this[p] + '\\n';
        }
    }
    console.log(str)
}
`
function h(){return t('title', 'My (refactored) first page')+
	     t('script', scripts)
	    }

function b(){return t('span', 'wat & £ £ da wat') +
	     ta('button', `onclick="redirect('login')"`, 'Clicka')+
	     ta('button', `onclick="reflect()"`, 'Have a look')

	    }

//Takes 2 functions, that provide content of head & body
function compose(head, body){
    return '<!DOCTYPE html>' +
	t('html',
	  t('head', head()) +
	  t('body', body()))
}

module.exports.go = function(req, res){
    var url = req.url.split('/')
    console.log(url)
    if (req.url === '/favicon.ico'){
	fs.readFile('./media/favicon.ico', function basic(err, data) { 
	    if (err) return console.log(err)
	    res.end(data)
	})
    }
    else {
	console.log(req.method)
	console.log(req.url)
	res.end(compose(h,b));
    }

}
