const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;

function adminAuthMiddelware(req,res,next){
   
   const token = req.headers.token;
   
   const decodeData = jwt.verify(token , JWT_KEY_Admin);

   if(!decodeData){
      return res.status(403).json({
         message: "Token is invalid"
      })
   }else{
      req.adminID = decodeData.id;
      next();
   }

}

function userAuthMiddelware(req,res,next){
      
   const token = req.headers.token;
   const decodeData = jwt.verify(token , JWT_KEY_User);

   if(!decodeData){
      return res.status(403).json({
         message: "Token is invalid"
      })
   }else{
      req.userID = decodeData.id;
      next();
   }
}

module.exports = {
   adminAuthMiddelware,
   userAuthMiddelware,
   JWT_SECRET_USER,
   JWT_SECRET_ADMIN
}