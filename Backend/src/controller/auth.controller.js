
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import { generateToken } from "../lib/utils.js";

export const signup=async (req,res)=>{
     const{fullName,email,password}=req.body;
     try{
     if(password.length<6) return res.status(400).json({message:"Password must greater than 6"});
     const user=await User.findOne({email});
     if(user) return res.status(400).json({message:"Email already exist"});
     const salt=await bcrypt.genSalt(10);
     const hashPassword=await bcrypt.hash(password,salt);

     const newUser=new User({
        email:email,
        password:hashPassword,
        fullName:fullName,
     });

     if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
           return res.status(201).json({
               _id:newUser._id,
               fullName:newUser.fullName,
               email:newUser.email,
               profilePic:newUser.profilePic,
            });
     }
     else{
       return res.status(400).json({message:"Invalid user data"});
     }
   }
   catch(error){
      console.log("Error in Signup controller",error.message);
     return res.status(500).json({message:"Internal server error"});
   }
};