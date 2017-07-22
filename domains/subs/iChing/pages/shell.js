const spawn = require('child_process')

module.exports.vars = function(hook){
    var hex = spawn.spawnSync('python3', [__dirname+'/../hex_retrieve.py']).stdout.toString()
    console.log(typeof hex)
    return {
	hexagram: function()
	{
	    return hex
	},
	eltit: function(){return hex.split(/<|>/)[4]}
    }}
