
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

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

export const login= async (req,res)=>{
    const{email,password}=req.body;
    if(password.length<6) return res.status(400).json({message:"Password should equal or greater than 6"});
    try{
       const user=await User.findOne({email});
       if(user){
           if(await bcrypt.compare(password,user.password)){
               generateToken(check._id,res);
              return  res.status(200).json({
                   _id:user._id,
                   email:user.email,
                   password:user.password,
                   profilePic:user.profilePic

               });
               
           }
           else return res.status(400).json({message:"Invalid Credential"});
       }
       else return res.status(400).json({message:"Invalid Credential"});
    }
    catch(error){
      console.log("Error in login "+error.message);
       return res.send(500).json("Server error in loginIn");
    }
};

export const logout=(req,res)=>{
    try{
      res.cookie('jwt',"",{maxAge:0});
      res.status(200).json({message:"logout succesfully"});
    }
    catch(error){
       console.log("error in logout"+error.message);
       res.status(500).json({Message:"Server error in logout"});
    }
};

export const updateprofile=async()=>{
   try{
      const {profilePic}=req.body;
      const userId=req.user._id;
      if(profilePic){
         const uploadresponse=cloudinary.uploader.upload(profilePic);
         const updateUser=User.findByIdAndUpdate(userId,{
            profilePic:(await uploadresponse).secure_url
         },{new:true});

         return res.status(200).json(updateUser);
      }
      else return res.status(400).json({message:"profile pic required"});
   }
   catch(error){
      console.log("error in uploading profilepic");
      return res.status(500).json({message:"Internal seerver error im uplaoding image"});
   }
};

export const checkAuth=(req,res)=>{
   try{
     return res.status(200).json(req.user);
   }
   catch(error){
    console.log("error in checking user");
    return res.status(500).json("Internal server error");
   }
}