const { Router } = require("express");

const courseRouter = Router();

const { purchaseModel, courseModel } = require("../db");

const { userAuthMiddelware } = require("../middleware/auth")


courseRouter.post("/purchase", userAuthMiddelware , async function(req,res){
    //we expect here user is pay money alredy
    try{

        const userId = req.userId;
        const courseId = req.body.courseId;

        const newPurchase = await purchaseModel.create({
            userId: userId,
            courseId: courseId
        })

        return res.status(202).json({
            message: "You have successfully bought the courese",
            courseId: newPurchase._id
        })
    }catch(e){
        return res.status(403).json({
            message: "Error on " + e
        })
    }
})

courseRouter.get("/preview", async function(req,res){
   try{
        const allCourse =  await courseModel.find({});

        return res.status(202).json({
            allCourse: allCourse
    })
   }catch(e){
     return res.status(500).json({
        message: "error on " + e
     })
   }
   
})

module.exports = {
    courseRouter : courseRouter
}