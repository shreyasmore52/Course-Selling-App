const express = require("express");
app.use(express.json());
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
//const { userModel , adminModel , courseModel ,purchaseModel} = require("./db");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


app.get("/",function(req,res){
    res.sendFile( __dirname + "/public/index.html")
})

app.listen(3000);