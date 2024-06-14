const express=require("express");
const app=express();
require("dotenv").config();
const cors=require("cors");
const db=require("./config/mongoose");
const apiRoutes=require("./routes/apiRoutes.js");
const downloadRoutes=require("./routes/downloadRoutes.js");
const UserRoute=require("./routes/UserRoute.js");
const Addroute=require("./routes/AddRoute.js");
const ProfileRoute=require("./routes/Profilejobsekroute.js");
const getAllJobRoute=require("./routes/FetchJobs.js")
const EmailRoute=require("./routes/Email.js");
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
app.use("/seeker",ProfileRoute);
app.use("/alljob",getAllJobRoute)
app.use("/email",EmailRoute);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})