const spawn = require('child_process')

module.exports.vars = function(hook){
    return {
	hexagram: function()
	{
	    var hex = spawn.spawnSync('python3', [__dirname+'/../hex_retrieve.py'])
	    return hex.stdout
	}
    }}
