const { Router } = require("express");

const courseRouter = Router();


courseRouter.get("/courses", function(req,res){
    res.json({
        message: "This is all courses "
    })
})

courseRouter.get("/purchase-getway",function(req,res){

    //we expect here user is pay money alredy
    res.json({
            message: "This is dummy payment get-way"
        })
})

module.exports = {
    courseRouter : courseRouter
}