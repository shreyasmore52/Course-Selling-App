const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;

function adminAuthMiddelware(req,res,next){
   try{
   const token = req.headers.token;
   const decodeData = jwt.verify(token , JWT_SECRET_ADMIN);

      if(decodeData){
         req.adminID = decodeData.id;
         next();
      }

   }catch(e){
      return res.status(403).json({
         error: "Error on -> " + e
      })
   }
}

function userAuthMiddelware(req,res,next){
   try{
      const token = req.headers.token;
      const decodeData = jwt.verify(token , JWT_SECRET_USER);

      if(decodeData){
            req.userID = decodeData.id;
         next();
      }
   }catch(e){
         return res.status(403).json({
         error: "Error on -> " + e
      })
   }
  
}

module.exports = {
   adminAuthMiddelware,
   userAuthMiddelware,
   JWT_SECRET_USER,
   JWT_SECRET_ADMIN
}