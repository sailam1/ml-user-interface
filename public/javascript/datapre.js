function checker(){
    var X=document.getElementById("X").value;
    var y=document.getElementById("y").value;
    var encoding=document.getElementById("encoding").value;

    var patternX=/\d+:\d+/;
    if(X!==""){
        if(! patternX.test(X)){
            alert("incorrect format for X\nformat should be integer:integer\nexample: 2:13");
            return false;
        }
    }
    if(y!==""){
        if(! /\d+/.test(y)){
            alert("y is interer");
            return false;
        }
    }
    if(encoding!==""){
        if(/,/.test(encoding)){
            alert("please use space instead of commos");
            return false;
        }
    }
}

// function abc(){
//     var xhttp=new XMLHttpRequest();
//     xhttp.onreadystatechange=function(){
//         if(this.readyState==4 && this.status==200){
//             document.getElementById("test").innerHTML=this.responseText;
//         }
//     };
//     xhttp.open("GET","");
//     xhttp.send();
// }






