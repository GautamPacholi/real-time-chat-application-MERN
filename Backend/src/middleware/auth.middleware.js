import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const verifyToken=async (req,res,next)=>{
    try{
       const token=req.cookies.jwt;
       if(token){
          const authorized=jwt.verify(token,process.env.JWT_SECRET);
          if(authorized){
              const validuser=await User.findById(authorized.userId).select("-password");
              if(validuser){
               req.user=validuser;
               return next();
              }
              return res.status(404).json({message:"User not found"});

          }
          else return res.status(401).json({message:"Invalid token"});
       }
       else{
        return res.status(401).json("Unaouthoried token ");
       }
    }
    catch(error){
         console.log("error in verifying token"+error.message);
         return res.status(500).json({ message:"Internal server error in verifying token"});
    }
};