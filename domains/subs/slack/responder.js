var rTools = require('../../../server/responderTools.js')
var fs = require('fs')
/*
there can be other providers within the domain,
but since this one will recieve the most (probably) requests,
it is loaded at startup as opposed to in the act of responding

also, this provider is actually a function..
*/

function provider(pageData, talk){
    return {
	vars: function(hook){
	    var butt = talk ? hook('postBox') : ''
	    return {
		messages: function()
		{return pageData},
		'talk??': function()
		{return butt}
	    }
	}
    }
}

var mold = JSON.parse(fs.readFileSync(__dirname+'/pages/msgPage.json'))

/*
  This implementation is not particularly efficient.
  If you wanted to speed it up, you would asynchronously
  reverse a file whenever it filled up, so it could be read
  straight forward after that.

you should make a post that closes all tags up to the </html>
*/

var pages = fs.readdirSync(__dirname+'/slacks')

//dangerously assumes contiguous file names

var count = 0 //# of numbered files
var first = 999999 //# of lowest numbered file, if this site ever gets to a millionandtwelve pages, it will explode

for (var i=0; i<pages.length; i++){
    count++
    var x = parseInt(pages[i].split('.')[0])
    if (first > x) first=x
}

function filer(x){
    return slackDir+x+'.txt'
}

function bytesIn(fName){
    return fs.statSync(fName).size
}

var MAX_PAGES = 12
var MAX_CHARS = 1024*24
//read dir to look at all the numbered files

var slackDir = __dirname+'/slacks/'

if (count == 0) {first = 0; newFile()}
console.log("fill: "+filer(count+first-1))
var fill = bytesIn(filer(count+first-1))

function addText(msg){
    fs.appendFile(filer(count+first-1), msg+'\n' , function (err) {
	if (err){
	    console.log(err)
	    return
	}
	fill += msg.length
    })
}

// a new file will have the # 
function newFile(){
    var gnu = count+first
    fs.appendFile(filer(gnu), '', function(err){
	if (err) console.log(err)
    })
    if (++count > MAX_PAGES){ //wont happen for a loong time..
	fs.unlinkSync(filer(first))
	first++
	count--
    }
}

function flip(str){
    return str.split('').reverse().join('')
}

function slacker(num, res){
    if ( num < count && num >= 0){
	console.log("SDSDS"+first +" "+ count +" "+ num +" "+ 1)
	var x = first + count - num - 1
	console.log(first+":"+ count+":"+ num+":"+ x)
	fs.readFile(filer(x), 'utf8', (err, data) => {
	    if (err) res.end(err.toString())
	    var page = rTools.combine(mold, provider(flip(data), num==0))
	    res.end(page)
	})
    } else {
	res.end("Page outta range!")
    }
}

function nums(path, base, req, res){
    var bnum = parseInt(base)
    if (!isNaN(bnum)){
	slacker(bnum, res)
    } else {
	rTools.stdHtml(path, base, req, res)
    }
}

postObj = {
    post: function(req, res){
	if (fill > MAX_CHARS) newFile()
	req.on('data', function(data) {
	    addText(data)
	    res.end('Post sent')
	})
    }	  
}

module.exports.methods = {
    GET: rTools.makeGet(nums),
    POST: function(req, res){
	var fn = postObj[req.url[1]]
	if (typeof fn !== 'undefined')
	    fn(req, res)
	else
	    res.end('cant find command')
    }

}

