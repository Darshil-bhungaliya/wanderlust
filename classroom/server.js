const express = require("express")
const app = express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js")
const session = require("express-session"); 

app.use(session({secret:"mysupersecretstring",resave:false,saveUninitialized:true}))

app.get("/recount",(req,res)=>{
   if(req.session.recount){
       req.session.recount++;
    }else{
       req.session.recount =1;
   }
    res.send(`you sent a request ${req.session.recount} times`)
})
app.use("/users",users);
app.use("/posts",posts)
app.get("/",(req,res)=>{
    res.send("hi i   am  root!!!!")
})
app.listen(3000,()=>{
    console.log("server is listening to 3000")
})