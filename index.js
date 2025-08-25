const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.get("/",function(req,res){
    res.sendFile( __dirname + "/public/index.html")
})

app.post("/user/sign-up", function(req,res){
    res.json({
        message:"Signup end point"
    })
})

app.post("/user/log-in", function(req,res){
    res.json({
        message:"Signup end point"
    })
})

app.get("/courses", function(req,res){
    res.json({
        message: "This is courses "
    })
})

app.get("/user/purchases",function(req,res){
    res.json({
            message: "This is courses user has "
        })
})

app.get("/course/purchase-getway",function(req,res){

    //we expect here user is pay money alredy
    res.json({
            message: "This is courses user has "
        })
})


app.listen(3000);