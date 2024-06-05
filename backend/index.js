const express=require("express");
const app=express();
require("dotenv").config();
const db=require("./config/mongoose");
const port=5000;
app.get("/",(req,res)=>{
    res.send("Hello World");    
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})