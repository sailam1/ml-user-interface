const express=require("express");
const bodyparser=require("body-parser");
const xlsx=require("xlsx");
const upload=require("express-fileupload");
const fs=require("fs");
const json2xls=require("json2xls");
const json2csv=require("json2csv");
const {spawn}=require("child_process");      //to run python script
const child_process=require("child_process");
const jsdom=require("jsdom");
const csv=require("csv-parser");
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const nodemailer=require("nodemailer");
const xoauth2=require("xoauth2");

const {JSDOM}=jsdom;
const mongoose=require("mongoose");

var boolean;


app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine",'ejs');
app.use(upload());
app.use(session({
    secret:"Our little secret.",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true,useUnifiedTopology: true});
mongoose.set("useCreateIndex",true);


const userScema=new mongoose.Schema({
    mail:String,
    password:String
});

userScema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userScema);
passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var data="";
// child_process.exec('my.sh',function(err,stdout,stderr){
//     if(err){
//         console.log(err);
//     }
//     if(stderr){
//         console.log("stderr:"+stderr);
//     }
//     else{
//         console.log(stdout);
//     }
// })


var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'mungilwarsailam@gmail.com',
        pass:'shrisailam'
        // clientId:'391080746692-2f5jlh3gs32ndg2qpf7su7n04l48lnkp.apps.googleusercontent.com',
        // clientSecret:'0XkkDYBsg519iY62_wbwBIr3'
        // xoauth2:xoauth2.createXOAuth2Generator({
        //     user:'mungilwarsailam@gmail.com',
        //     pass:'shrisailam',
        //     clientId:'391080746692-2f5jlh3gs32ndg2qpf7su7n04l48lnkp.apps.googleusercontent.com',
        //     clientSecret:'0XkkDYBsg519iY62_wbwBIr3'
        // })
    }
});



app.get("/",function(req,res){
    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/home.html");
    }
    else{
        res.redirect("/signin.html");
    }
});
app.get("/datapre.html",function(req,res){
    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/datapre.html");
    }
    else{
        res.redirect("/signin.html");
    }
});
app.get("/ML.html",function(req,res){
    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/ML.html");
    }
    else{
        res.redirect("/signin.html");
    }
});

app.get("/home.html",function(req,res){
    res.redirect("/");
});
app.get("/help.html",function(req,res){
    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/help.html");
    }
    else{
        res.redirect("/signin.html");
    }
});
app.get("/predator.html",function(req,res){
    res.sendFile(__dirname+"/predator.html");
});
app.get("/signup.html",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.get("/signin.html",function(req,res){
    res.sendFile(__dirname+"/signin.html");
});
app.post("/submit",function(req,res){
    if(req.files){
        var filed=req.files.file;
        var fileds=req.files.file1;
        var filename=req.files.file.name;
        var filename1=req.files.file1.name;
        data=req.files.file.data;
        var data=req.files.file.data;
        var value="";

        filed.mv("./upload/"+filename,function(err){
            if(err){
                console.log(err);
                res.redirect("/");
            }
            else{
                console.log("file1 uploaded");
                res.redirect("/datapre.html");
                
            }
            fs.rename("./upload/"+filename,"./upload/dataset.csv",function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("file1 renamed");
                }
                fs.close(1,function(err){
                    if(err){
                        console.log(err);
                    }
                })
            })


            
        })


        fileds.mv("./upload/"+filename1,function(err){
            if(err){
                console.log("file 2 not uploaded");
            }
            else{
                console.log("file2 uploaded");
            }
            fs.rename("./upload/"+filename1,"./upload/find.csv",function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("file2 renamed");
                }
                fs.close(2,function(err){
                    if(err){
                        console.log(err);
                    }
                })
            })
        })


        var array=Array.prototype.slice.call(data,0);
        wb=xlsx.read(array,{type:"array"});
        var html_table=xlsx.write(wb,{type:"binary",bookType:"html"});
        

        fs.writeFile("tables.html",html_table,function(err){
            if(err){
                console.log("error in writing");
            }
            else{
                console.log("tables.html file saved");
            }
            options={
                runScripts:"dangerously",
                resources:"usable"
            }
            
            
            
            JSDOM.fromFile("tables.html",options).then(function(dom){
                dom.window.document.querySelector("body").firstElementChild.lastElementChild.lastElementChild.innerHTML="<script src='javascript/index.js'></script>";
                // console.log(dom.serialize());
                fs.writeFile("tables.html",dom.serialize(),function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("updated tables.html");
                    }
                })
            })
        })
        
    }
    
});


app.get("/tables.html",function(req,res){
    res.sendFile(__dirname+"/tables.html");

});
app.get("/predator_data.html",function(req,res){
    res.sendFile(__dirname+"/predator_data.html");
});

app.get("/details.html",function(req,res){
    res.sendFile(__dirname+"/details.html");
});



app.post("/preprocessinput",function(req,res){
    var jsonData=req.body;
    var newLine="\r\n";
    var json=JSON.stringify(jsonData);
    var array_data_keys=Object.keys(jsonData);
    var array_data_values=Object.values(jsonData);
    array_data_keys=array_data_keys+newLine;


    fs.writeFile("./upload/values.csv",array_data_keys,function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("values file saved");
        }
        fs.appendFile("./upload/values.csv",array_data_values,function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("data appended in values file");
            }
        })
    })
    options={
        runScripts:"dangerously",
        resources:"usable"
    }
    fs.createReadStream("./upload/find.csv")
    .pipe(csv())
    .on("headers",function(headers){
        var column_len=headers.length;
        var str="";
        var str2="";
        var val=0;
        for(var i=0;i<column_len;i++){
            val=val+1
            str+="<th>"+headers[i]+"</th>";
            str2+="<td><input type='text' autocomplete='off' placeholder='enter value' name=n"+val+"></td>";
        }
        JSDOM.fromFile("predator_data.html",options).then(function(dom){
            dom.window.document.querySelector("body").innerHTML=
            "<form method='POST' action='/data'>"+
            "<table border='0'>"+
            "<tr>"+str+"</tr>"+
            "<tr>"+str2+"</tr>"+
            "<tr><td colspan='2'><button onclick='return check()'>submit data</button></form></td></tr>"+
            "<script src='javascript/predator_data.js'></script>";
            fs.writeFile("predator_data.html",dom.serialize(),function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("changed predator.html");
                }
            })
        })
    })


    
    const pythons=child_process.spawn('python',['./upload/mean.py']);


    pythons.stdout.on('data',function(data){
        console.log("pipe data from pyhton script");

        // res.sendFile(__dirname+"/preprocess_download.html")
        res.redirect("/ML.html");

    });
  
});



app.post("/next_ml",function(req,res){       //after preprocessing setep
    res.redirect("/ML.html");
});




app.post("/ML_submit",function(req,res){
    var ml_jsonData=req.body;
    var newLine="\r\n";
    var ml_keys=Object.keys(ml_jsonData);
    var ml_values=Object.values(ml_jsonData);
    ml_keys=ml_keys+newLine;
    fs.writeFile("./upload/ml_input.csv",ml_keys,function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("ml_input.csv created");
        }
        fs.appendFile("./upload/ml_input.csv",ml_values,function(err){
            if(err){
                console.log(err);
                console.log("not appended to ml_input.csv");
            }
            else{
                console.log("ml_input.csv updated");
            }
        })
    })

    const ml=child_process.spawn("python",["./upload/ml.py"]);

    
    ml.stdout.on('data',function(data){
        var newLine="\r\n";
        console.log("running ml.py file");
        var data1=data.toString();
        var new_array=[];
        for(var i=1;i<data1.length-1;i++){
            var update=data1.substring(2*i-1,2*i)+newLine;
            new_array.push(update);
        }


        options={
            runScripts:"dangerously",
            resources:"usable"
        }

        JSDOM.fromFile("prediction.html",options).then(function(dom){
            dom.window.document.querySelector("a").setAttribute("href",'data:text/csv;charset=utf-8,' +new_array)
            dom.window.document.querySelector("a").setAttribute("download","people.csv")
            fs.writeFile("prediction.html",dom.serialize(),function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("updated prediction.html");
                }
            })
        })
        res.sendFile(__dirname+"/prediction.html");
        

        
        
    })

    


});
app.post("/data",function(req,res){
    json_pre_data=req.body;
    var newLine="\r\n";
    var json_keys=Object.keys(json_pre_data);
    var json_values=Object.values(json_pre_data);
    json_keys=json_keys+newLine
    fs.writeFile("./upload/predatorData.csv",json_keys,function(err){        //file containing one value predicting
        if(err){
            console.log(err);
        }
        else{
            fs.appendFile("./upload/predatorData.csv",json_values,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("predatorData.csv updated");
                }
            })
        }
    })
    res.send("done");
});

app.get("/predict",function(req,res){


    const python4=spawn("python",["./upload/one_value.py"]);

    python4.stdout.on("data",function(data){
        print_data=data.toString();
        res.send("predicted value is: "+print_data);

    })
});


app.post("/go_back",function(req,res){                             //redirecting from ml_submit page
    res.redirect("/");
});

app.post("/signUP",function(req,res){                              //new users details in database
    // var data=req.body;
    // const newUser=new User({
    //     Fname:data.Fname,
    //     Lname:data.Lname,
    //     mail:data.email,
    //     password:data.password
    // });


    // newUser.save(function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.redirect("/");
    //     }
    // })
    var mailoptions={
        from:'mungilwarsailam@gmail.com',
        to:req.body.username,
        subject:'ML Interface',
        html:'<h1>Welcome to ML Interface</h1><p>make sure to enjoy this site.user details are</p><p>username:'+req.body.username+"/p"
    };
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/signup.html");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/home.html");
                transporter.sendMail(mailoptions,function(err,info){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("mail sent: ");
                    }
                })
            });
        }

    });
    
});

app.post("/signin",function(req,res){
    // var userName=req.body.email;
    // var password=req.body.password;

    // User.findOne({mail:userName},function(err,foundUser){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         if(foundUser){
    //             if(foundUser.password===password){
    //                 res.redirect("/");
    //             }
    //             else{
    //                 res.redirect("/signin.html");
    //             }
    //         }
    //         else{
    //             res.redirect("/signin.html");
    //         }
    //     }
    // })
    const user=new User({
        username:req.body.username,
        password:req.body.password
    });
    req.login(user,function(err){
        if(err){
            console.log(err);
            res.send("someting went wrong");
        }
        
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            });
        }
    });
});
app.post("/signout",function(req,res){
    req.logout();
    res.redirect("/signin.html");
});


app.listen(3000,function(){
    console.log("port 3000 is running");
});
