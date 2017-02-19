var big = "big"

function cat(t){
    return t[big]();
}
    
var fat = { big: function(){return 7} }

console.log(cat(fat))
