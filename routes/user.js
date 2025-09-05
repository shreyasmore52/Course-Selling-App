const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const userRouter = Router();
const { userModel, purchaseModel, courseModel } = require("../db");
const { z } = require("zod");
const { userAuthMiddelware, JWT_SECRET_USER } = require("../middleware/auth");

const signupValidation = z.object({
    email: z.email("Invalid email format").max(30),
    password: z.string().min(6, "pass must be more than 6 character").max(30),
    firstName: z.string().min(2, "First name is too short").max(30),
    lastName: z.string().min(2, "last name is too short").max(30)
});

userRouter.post("/sign-up", async function(req,res){    
    try{

        const result =  signupValidation.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                success: false,
                message: result.error.issues[0].message
            });
        }
        const { email , password , firstName , lastName } = result.data;

        const foundUser =  await userModel.findOne({ email });
        if(foundUser){
            return res.status(400).json({
                success: false,
                message: "User alredy exists",
            });
        }
        //hash the password
        const hashPass = await bcrypt.hash(password , 5);

        // save user
           const newUser =  await userModel.create({
                email : email,
                password : hashPass,
                firstName : firstName,
                lastName : lastName
            })
              
        return res.status(201).json({
            success: true,
            message: "Signup Done!",
            data: { id: newUser._id, email: newUser.email}
        });
            
        
    }catch(e){
        console.log("error on signup -> " + e);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message,
        });

    }
})

userRouter.post("/log-in", async function(req,res){
    const { email , password } = req.body;

    const foundUser = await userModel.findOne({
        email: email
    });

    if (!foundUser){
        return res.status(403).json({
            success: false,
            message: "User does not exits. On this mail!"
        })
    
    }else{
        const verifyPass = await bcrypt.compare(password, foundUser.password);
        if(verifyPass){
            const token = jwt.sign({
            id : foundUser._id
            },JWT_SECRET_USER);
         
            return res.status(201).json({
                success: true,
                token : token
            });
        }else{
            res.status(403).json({
                success: false,
                message: "The cerdential is invalid please verify password !"
            })
        }
    }

})

userRouter.get("/purchases",userAuthMiddelware, async function(req,res){
   
    try{
        const userId = req.userID; 
        
        const purchase = await purchaseModel.find({
            userId,
        })

        const courseData = await courseModel.find({
            _id: { $in: purchase.map(x => x.courseId) } // show the data of course
        })
        
        return res.json({
            purchase: purchase,
            courseData: courseData
        })

    }catch(e){
        return res.status(500).json({
            message: "error on" + e
        })
    }
   
})

module.exports = {
    userRouter : userRouter
}