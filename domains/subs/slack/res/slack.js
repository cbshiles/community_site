    function errFunc(err) {
        console.log("Post error!");
        console.log(err);
    }

function connectSuccess(){
    document.getElementById("transmit").disabled = false	
    document.getElementById("nsfwTransmit").disabled = false	
    location.reload()
}

function flip(str){
    return str.split('').reverse().join('')
}

function dateStr(){
var date = new Date();  
var options = {  
    year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
};  

return date.toLocaleTimeString("en-us", options);  
}


function refineMsg(val){

    var val = val.trim()
    if (val == "") return ""

    var msg = '<div class="post postorange">'
    	+'<p class="timeStamp">'+dateStr()+' </p> '
    	+val.replace(/\n/g, "<br>")
	+'</div>'
   return flip(msg)
}


// a and z included in range
function randomInRange(a, z){
    var spread = z-a+1
    return a + Math.floor(Math.random() * spread)
}

function getID(){
    var nchar = randomInRange(14, 16)
    var str = ""
    for(var i=0; i<nchar; i++){
    str += getChar(i==0)
    }
    return str
}

function getChar(first){
    var code
    if (first){
    code = randomInRange(0, 26+26-1)
    if (code < 26) code += 65
    else code += 71//-26 + 97
    } else {
    code = randomInRange(0, 26+26+10-1)
    if (code < 10) code += 48
    else if (code < 36) code += 55 // - 10 + 65
    else code += 61//-36 + 97
    }
    return String.fromCharCode(code)
}

function refineMsgNSFW(val){

    var val = val.trim()
    if (val == "") return ""


    var name = getID()
    var msg = '<div class="hid" id="'+ name +'">'
    	+val
	+'</div>'
        +'<button onclick="toggle(\''+name+'\')" id="'+(name+'Butt')+'">Show</button>'
   return refineMsg(msg)
}

function toggle(id){
    var div = document.getElementById(id);
    var hid = (div.style.visibility == 'hidden' || div.style.visibility == '')
    div.style.visibility = hid?'visible':'hidden';

    var buttonTxt = document.getElementById(id+'Butt');
    buttonTxt.firstChild.data = hid?'Hide':'Show';
}

function send(refineFn){
   var m = refineFn($('#msg').val())
   if (m == "") return

   $('#msg').val('')

   document.getElementById("transmit").disabled = true
   document.getElementById("nsfwTransmit").disabled = true

    $.ajax ({
      type : 'POST', async : true,
      error : errFunc, url : "post",
      data : m, success : connectSuccess
    })
}


$(document).on("click", "#transmit", function () {
    send(refineMsg)
})

$(document).on("click", "#nsfwTransmit", function () {
    send(refineMsgNSFW)
})


$(document).ready(function () {
$('#tbox').keydown(function(e) {
   var code = e.keyCode || e.which;
   if(e.ctrlKey && code == 13) { 
   	send(refineMsg)
    }
})
})

// enableEnter is accessible in the whole page scope.
function enableEnter(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        ezpConsole.partOverride.retrieveParts();
    }
}
