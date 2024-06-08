const express=require("express");
const app=express();
require("dotenv").config();
const cors=require("cors");
const db=require("./config/mongoose");
const apiRoutes=require("./routes/apiRoutes.js");
const downloadRoutes=require("./routes/downloadRoutes.js");
const UserRoute=require("./routes/UserRoute.js");
const Addroute=require("./routes/AddRoute.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require("dotenv").config();
const port=5000;
app.get("/",(req,res)=>{
    res.send("Hello World");    
})

app.use("/api",apiRoutes);
app.use("/download",downloadRoutes);
app.use("/user",UserRoute)
app.use("/apps",Addroute);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})