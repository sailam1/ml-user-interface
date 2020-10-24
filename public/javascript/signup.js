

function checker(){
    var input1=document.getElementsByTagName("input")[0].value;
    var input2=document.getElementsByTagName("input")[1].value;
    var input3=document.getElementsByTagName("input")[2].value;
    var input4=document.getElementsByTagName("input")[3].value;
    var input5=document.getElementsByTagName("input")[4].value;

    patternChecker=/[A-Z]+[a-z]+[0-9]+[!@#$%^&*]+/;
    if(input1!=="" && input2!==""){
        if(input1===input2){
            document.getElementById("error").innerText="first name and last name cannot be same";
            return false;
        }
        else{
            document.getElementById("error").innerText="";
        }
    }
    if(input4!=="" && input5!==""){
        if(input4!==input5){
            return false;
        }
    }
    if(input4!==""){
        if(! patternChecker.test(input4)){
            return false;
        }
    }
}
function passwordChecker(){
    var password=document.getElementsByTagName("input")[3].value;
    var pattern=/[A-Z]+[a-z]+[0-9]+[!@#$%^&*]+/;
    if(password!==""){
        if(! /[A-Z]+/.test(password)){
            document.getElementById("capitalChecker").innerHTML="<span>&#10008</span><span style='color:red;'>atleaset one capital alphabet</span><br>";
        }
        else{
            document.getElementById("capitalChecker").innerHTML="<span>&#10004</span><span style='color:green;'>atleaset one capital alphabet</span><br>";
        }
        if(! /[0-9]+/.test(password)){
            document.getElementById("digitChecker").innerHTML="<span>&#10008</span><span style='color:red;'>atleaset one digit</span><br>";
        }
        else{
            document.getElementById("digitChecker").innerHTML="<span>&#10004</span><span style='color:green;'>atleaset one digit</span><br>";
        }
        if(! /[!@#$%^&*]+/.test(password)){
            document.getElementById("specialChecker").innerHTML="<span>&#10008</span><span style='color:red;'>atleaset one special charecter</span><br>";
        }
        else{
            document.getElementById("specialChecker").innerHTML="<span>&#10004</span><span style='color:green;'>atleaset one special charecter</span><br>";
        }
        if(password.length<5){
            document.getElementById("lengthChecker").innerHTML="<span>&#10008</span><span style='color:red;'>atleast 5 charecters</span><br>";
        }
        else{
            document.getElementById("lengthChecker").innerHTML="<span>&#10004</span><span style='color:green;'>atleast 5 charecters</span><br>";
        }
    }
    else{
        document.getElementById("capitalChecker").innerHTML="";
        document.getElementById("digitChecker").innerHTML="";
        document.getElementById("specialChecker").innerHTML="";
        document.getElementById("lengthChecker").innerHTML="";
    }

}

function confirmPassword(){
    var password=document.getElementsByTagName("input")[3].value;
    var confirmPassword=document.getElementsByTagName("input")[4].value;
    if(confirmPassword!==""){
        if(password!==confirmPassword){
            document.getElementById("confirmPassword").innerHTML="<span>&#10008</span><span style='color:red;'>password didnt match</span><br>";
        }
        else{
            document.getElementById("confirmPassword").innerHTML="<span>&#10004</span><span style='color:green;'>password matched</span><br>";
        }
    }
    else{
        document.getElementById("confirmPassword").innerHTML="";
    }
        
}