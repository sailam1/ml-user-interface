document.querySelector("table").setAttribute("border","1");



// var data_list=[];
// var previous_data=[0,"null",""]
// var input="sa";
// for(var i=0;i<document.querySelectorAll("th").length;i++){
//     var boolean=false;
//     document.querySelectorAll("th")[i].addEventListener("click",function(event){
        // var col=window.event.target.cellIndex+1;
        // for(var i=0;i<previous_data.length;i++){
        //     if(parseInt(col)!==previous_data[i] || input==="" || input===null){
        //         boolean=true;
        //     }
        //     else{
        //         boolean=false;
        //         break;
        //     }
        // }
        // if(boolean){
        //     input=window.prompt("enter column number "+col+" value:");
        //     if(input===null || input===""){
        //         if(input===""){
        //             input=null;
        //         }
        //         alert("value for column "+col+" is null");
        //     }
        //     else{
        //         previous_data.push(parseInt(col));
        //         data_list.push({col,input});
        //         console.log(data_list);
        //     }
        //     // previous_data.push(parseInt(col));
        //     // data_list.push({col,input});
        //     // console.log(data_list);

        // }
        // else{
        //     alert("already entered");
        // }




//     });


// }
// document.querySelector("button").addEventListener("click",function(event){
//     document.querySelector("body").innerHTML+="<h4>data submitted</h4>";
// });
function check(){
    var input_length=document.getElementsByTagName("input").length;
    for(var i=0;i<input_length;i++){
        var val=document.getElementsByTagName("input")[i].value;
        if(val==="" || val===null){
            alert("please fill all values");
            return false;
            break;
        }
    }
}
