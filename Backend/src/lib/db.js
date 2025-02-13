import mongoose from 'mongoose';

const connectDB= async ()=>{
    try{
       await mongoose.connect(process.env.MONGODBURL);
       console.log("mongodb connection succesfully");
    }
    catch(error){
         console.log("error connecting mongodb");
    }
}
export default connectDB;