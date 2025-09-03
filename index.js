const express = require("express");
const envFile = require("dotenv");
envFile.config();


const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// this are routes use run a app 
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


app.get("/",function(req,res){
    res.sendFile( __dirname + "/public/index.html")
})

 async function main() {
    try{
         await mongoose.connect(process.env.MONGO_URL);
         app.listen(process.env.PORT);
    } catch (e){
        console.error("Error on " + e);
    }

 }
 
 main();

 