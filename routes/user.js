const { Router } = require("express");

const userRouter = Router();

userRouter.post("/sign-up", function(req,res){
    res.json({
        message:"Signup end point"
    })
})

userRouter.post("/log-in", function(req,res){
    res.json({
        message:"log in end point"
    })
})

userRouter.get("/purchases",function(req,res){
    res.json({
            message: "This is courses user has "
        })
})

module.exports = {
    userRouter : userRouter
}