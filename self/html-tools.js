//Simple HTML tag 
module.exports.t = function(tag, meat){
    return '<'+tag+'>'+meat+'</'+tag+'>';
}

//HTML tag with attributes
module.exports.ta = function(tag, attr, meat){
    return '<'+tag+' '+attr+'>'+meat+'</'+tag+'>';
}

//For creating repetitive HTML elements
module.exports.ft = function(lzt, funk){
    var c = '';
    for (let i=0; i<lzt.length; i++){
	c += funk(lzt[i], i);
    }
    return c;
}
