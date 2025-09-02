const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const { z } = require("zod");
const { adminAuthMiddelware , JWT_SECRET_ADMIN} = require("../auth");

const signupValidation = z.object({
    email: z.email("Invalid email format").max(30),
    password: z.string().min(6, "pass must be more than 6 character").max(30),
    firstName: z.string().min(2, "First name is too short").max(30),
    lastName: z.string().min(2, "last name is too short").max(30)
});

adminRouter.post("/sign-up", async function(req,res){

    try{
        
        const result =  signupValidation.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                success: false,
                message: result.error.issues[0].message
            });
        }
        const { email , password , firstName , lastName } = result.data;

        const foundUser =  await adminModel.findOne({ email });
        if(foundUser){
            return res.status(400).json({
                success: false,
                message: "Admin alredy exists",
            });
        }
        //hash the password
        const hashPass = await bcrypt.hash(password , 5);

        // save admin
           const newAdmin =  await adminModel.create({
                email : email,
                password : hashPass,
                firstName : firstName,
                lastName : lastName
            })
              
        return res.status(201).json({
            success: true,
            message: "Signup Done!",
            data: { id: newAdmin._id, email: newAdmin.email}
        });
            
        
    }catch(e){
        console.log("error on signup -> " + e);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message,
        });

    }

});

adminRouter.post("/log-in", async function(req,res){
     const { email , password } = req.body;

    const foundUser = await adminModel.findOne({
        email : email
    });

    if(!foundUser){
        return res.status(403).json({
            message: "Admin does not exits."
        })
    }else{
        const verifyPass = await bcrypt.compare(password, foundUser.password);
        if(verifyPass){
            const token = jwt.sign({
                id : foundUser._id
            },JWT_SECRET_ADMIN);

            return res.status(201).json({
                token: token
            });
        }else{
            res.status(403).json({
                message: "The cerdential is invalid please verify password !"
            })
        }
    }
 
})

adminRouter.post("/create/course", adminAuthMiddelware,function(req,res){
    res.json("you are in Create course endPoint")
})

adminRouter.put("/edite/course", adminAuthMiddelware,function(req,res){
    res.json("you are in Edite course endPoint")
})

adminRouter.get("/all/course", adminAuthMiddelware,function(req,res){
    res.json("you are in Create course endPoint")
})


module.exports = { 
    adminRouter : adminRouter
}