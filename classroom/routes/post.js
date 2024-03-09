const express = require("express")
const router = express.Router();
//index-users

router.get("/",(req,res)=>{
    res.send("GEt for posts")
});

//show -posts
router.get("/:id",(req,res)=> {
    res.send("get for post id");
});

//post - posts

router.post("/",(req,res)=>{
    res.send("post for posts")
});

//delete -posts
router.delete("/:id",(req,res)=>{
    res.send("delete for post id")
});

module.exports = router; 