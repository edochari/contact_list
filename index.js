const express=require("express");
const path=require("path");
const port=8030;
const db=require("./config/mongoose");
const contact=require("./models/contact")
const app=express();

app.set('view engine','ejs');
app.set("views",path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static("assets"));
// app.use(function(req,res,next){
//     console.log("Middle ware 1 is called");
//     next();
// });
// app.use(function(req,res,next){
//     console.log("Middle ware 2 is called");
//     next();
// });
// app.use(function(req,res,next){
//     console.log("Middle ware 3 is called");
//     next();
    
// });

var contactList=[
    {
        name:"hari",
        phone:"1111111111"
    },
    {
        name:'mithun',
        phone:'22222222222'
    },
    {
        name:'yassu',
        phone:'3333333333'
    }
   
];
app.get("/",function(req,res){
    // console.log(req);
    // res.send("<h1>Heyy how r u</h1>");
    contact.find({},function(err,contacts){
        if(err){
            console.log("Error while fetching contacts");
            return ;
        }
        return res.render('home',{title:"My contacts list",
        contact_list:contacts});
    })
   
})
app.get("/practice",function(req,res){
    // console.log(req);
    // res.send("<h1>Heyy how r u</h1>");
    return res.render('practice',{title:"users list"});
})

app.get("/delete-contact/",function(req,res){
    console.log(req.query);

    let id=req.query.id;
    contact.findByIdAndDelete(id,function(err){
        if(err){

      
        console.log("Error while deleting the contact");
        return ;
        }
        return res.redirect("back");
    })
   
   
    // let phone=req.query.phone;
    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1)
    // {
    //     contactList.splice(contactIndex,1);
    // }
   
    
})
app.post("/create-contact",function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in creating contact");
            return ;
        }
        console.log("**********",newContact);
        return res.redirect("back");
    })
    
  
   
})
app.listen(port,function(err){ 
    if(err)
    {
        console.log("Error occured");
    }
    console.log("My server is up and running",port);
})