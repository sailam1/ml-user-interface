document.onreadystatechange=function(){
    if(document.readyState!=="complete"){
        document.querySelector("body").style.visibility="hidden";
    }
    else{
        document.querySelector("body").style.visibility="visible";
    }
}

document.querySelector("table").setAttribute("border","1");




for(var i=0;i<document.querySelectorAll("td").length;i++){
    document.querySelectorAll("td")[i].addEventListener("click",function(event){
        var col=window.event.target.cellIndex+1;
        alert("column number: "+col);
    });
}

function checker(){
    var input1=document.getElementById("X").value;
    var input2=document.getElementById("y").value;
    var input3=document.getElementById("encoding").value;
    var inputLength=document.getElementsByTagName("input").length;
    for(var i=0;i<inputLength;i++){
        if(document.getElementsByTagName("input")[i].value===""){
            alert("all input fields are compulsary");
        }
    }
    
}

