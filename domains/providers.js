var spec = [ ['Literal quotes', '|', 'Anything enclosed in literal quotes is not interpreted by the translator, it is sent as is to the translated page.'],
	     ['Var quotes', '`', 'Text enclosed in var quotes is sent to the provider, to be filled up'],
	     ['Tag enclosing', '<>', 'Text enclosed in here is the body of an html style tag. The preceding word to the opening tag tells the enclosing of its name.'],
	     ['Tag-head Enclosing', '[]', 'Text enclosed in here is within the head of an html-style tag. It is used to set attributes and to indicate a one headed tag.'],
	     ['Mold Enclosing', '{}', 'A mold (aka template) is a chunk of aml that can be called by providers to fill their holes. (ha) An entire aml file is considered to be a \'root mold\'.'],
	     ['Whitespace', ' \t\n', 'Whitespace does not have any meaning of its own, but it is significant in the sense that it breaks up words. just html<In this tag>'],
	     ['Escape', '~', 'Escape character ensures that the next character will be treated literally, and not interpreted. Escape is valid in all modes, even quotes.']]

var cspec
module.exports.vars = function(hook){
    return {
	specCharList:
	function(){
	    var ans = ""
	    for (var i=0; i<spec.length; i++){
		cspec = spec[i]
		ans += hook('specChar')
	    }
	    return ans
	},

	type:
	function(){return cspec[0]},

	cs:
	function(){
	    //? way to print out the escaped version??
	    var str = JSON.stringify(cspec[1])
	    var ans = ''
	    for (let i = 0; i<str.length; i++){
		if (i > 0) ans += " and "
		ans += "<b>"+str.charAt(i)+"</b>"
	    }
	    return ans;
	},

	desc:
	function(){return cspec[2]}
    }
}

