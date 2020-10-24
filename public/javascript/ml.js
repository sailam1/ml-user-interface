document.onreadystatechange=function(){
    if(document.readyState!=="complete"){
        document.querySelector("body").style.visibility="hidden";
        document.querySelector("#loader").style.visibility="visible";
    }
    else{
        document.querySelector("#loader").style.display="none";
        document.querySelector("body").style.visibility="visible";
    }
}




function off(){
    for(var i=0;i<3;i++){
        document.getElementsByClassName("selects")[i].style.display="none";
    }
    var hyper_len=document.getElementsByClassName("hyper").length
    for(var j=0;j<hyper_len;j++){
        document.getElementsByClassName("hyper")[j].style.display="none";
    }
}


function on(){
    document.getElementById("RP").onclick=function(){
        document.getElementsByClassName("selects")[0].style.display="block";
        document.getElementsByClassName("selects")[1].style.display="none";
        document.getElementsByClassName("selects")[2].style.display="none";


    }
    document.getElementById("CP").onclick=function(){
        document.getElementsByClassName("selects")[0].style.display="none";
        document.getElementsByClassName("selects")[1].style.display="block";
        document.getElementsByClassName("selects")[2].style.display="none";
    }
    document.getElementById("ClP").onclick=function(){
        document.getElementsByClassName("selects")[0].style.display="none";
        document.getElementsByClassName("selects")[1].style.display="none";
        document.getElementsByClassName("selects")[2].style.display="block";
    }
}




function switchs(){
    document.getElementById("RP").onchange=function(){
        document.getElementsByClassName("selects")[0].selectedIndex=0;
    }
    document.getElementById("CP").onchange=function(){
        document.getElementsByClassName("selects")[1].selectedIndex=0;
    }
    document.getElementById("ClP").onchange=function(){
        document.getElementsByClassName("selects")[2].selectedIndex=0;
    }
}
// function validateForm(){
//     var rp=document.forms["inputs"]["RP"].value;
//     var cp=document.forms["inputs"]["CP"].value;
//     var clp=document.forms["inputs"]["ClP"].value;
//     if(rp==="None Selected" | cp==="None Selected" | clp==="None Selected"){
//         alert("pls fill the form");
//         return false;
//     }
// }

// function formEdit(){
//     var choosen=document.getElementsByClassName("selects")[0].selectedIndex;
//     if(choosen != "None Selected")
// }


function hyon(){
    if(document.getElementsByName("algo")[0].checked){
        if(document.getElementsByClassName("selects")[0].selectedIndex===2){
            document.getElementsByClassName("hyper")[0].style.display="block";
        }
        if(document.getElementsByClassName("selects")[0].selectedIndex===4){
            document.getElementsByClassName("hyper")[1].style.display="block";
        }
        if(document.getElementsByClassName("selects")[0].selectedIndex===1){
            document.getElementsByClassName("hyper")[10].style.display="block";
        }
        if(document.getElementsByClassName("selects")[0].selectedIndex===3){
            document.getElementsByClassName("hyper")[11].style.display="block";
        }
        if(document.getElementsByClassName("selects")[0].selectedIndex===5){
            document.getElementsByClassName("hyper")[12].style.display="block";
        }
    }
    if(document.getElementsByName("algo")[1].checked){
        if(document.getElementsByClassName("selects")[1].selectedIndex===1){
            document.getElementsByClassName("hyper")[2].style.display="block";
        }
        if(document.getElementsByClassName("selects")[1].selectedIndex===2){
            document.getElementsByClassName("hyper")[3].style.display="block";
        }
        if(document.getElementsByClassName("selects")[1].selectedIndex===3){
            document.getElementsByClassName("hyper")[4].style.display="block";
        }
        if(document.getElementsByClassName("selects")[1].selectedIndex===4){
            document.getElementsByClassName("hyper")[5].style.display="block";
        }
        if(document.getElementsByClassName("selects")[1].selectedIndex===5){
            document.getElementsByClassName("hyper")[6].style.display="block";
        }
        if(document.getElementsByClassName("selects")[1].selectedIndex===6){
            document.getElementsByClassName("hyper")[7].style.display="block";
        }
        if(document.getElementsByClassName("selects")[1].selectedIndex===7){
            document.getElementsByClassName("hyper")[8].style.display="block";
        }
        if(document.getElementsByClassName("selects")[1].selectedIndex===8){
            document.getElementsByClassName("hyper")[9].style.display="block";
        }
    }
}
//rester put default value to null

function hyswitch(){    //to hide  all hyperparameters and uncheck radio button
    var hyper_len=document.getElementsByClassName("hyper").length;
    var radio_len=document.getElementsByClassName("hypers").length;
    var reseter_len=document.getElementsByClassName("reseter").length;
    for(var i=0;i<hyper_len;i++){
        document.getElementsByClassName("hyper")[i].style.display="none";
    }
    for(var j=0;j<radio_len;j++){
        document.getElementsByClassName("hypers")[j].checked=false;
    }
    for(var k=0;k<reseter_len;k++){
        document.getElementsByClassName("reseter")[k].value="";
    }

}
function hyswitch1(){                   //for radio option with default parameters
    var hyper_len=document.getElementsByClassName("hyper").length;
    for(var i=0;i<hyper_len;i++){
        document.getElementsByClassName("hyper")[i].style.display="none";
    }
}



