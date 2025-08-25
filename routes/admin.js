const { Router } = require("express");

const adminRouter = Router();

adminRouter.post("/sign-up", function(req,res){
    res.json("you are in Admin endPoint")
})

adminRouter.post("/login", function(req,res){
    res.json("you are in Admin endPoint")
})

adminRouter.post("/create/course", function(req,res){
    res.json("you are in Create course endPoint")
})

adminRouter.put("/edite/course", function(req,res){
    res.json("you are in Edite course endPoint")
})

adminRouter.get("/all/course", function(req,res){
    res.json("you are in Create course endPoint")
})


module.exports = { 
    adminRouter : adminRouter
}