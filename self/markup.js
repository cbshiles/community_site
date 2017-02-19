var fs = require('fs')

//throws err

function compile(fname){
    var data = fs.readFileSync(fname, 'utf8');

    let c
    for(let i=0; i<data.length; i++){
	c = data.charAt(i)
	if (c == '~') i++
	
    }
    
    console.log(typeof data);
}

compile('markup.js')
