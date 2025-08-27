const { Router } = require("express");

const courseRouter = Router();

const { courseModel } = require("../db");

courseRouter.post("/purchase",function(req,res){
    //we expect here user is pay money alredy
    res.json({
            message: "This is dummy payment get-way"
        })
})

courseRouter.get("/preview",function(req,res){
    res.json({
            message: "Preview endpoint"
        })
})

module.exports = {
    courseRouter : courseRouter
}