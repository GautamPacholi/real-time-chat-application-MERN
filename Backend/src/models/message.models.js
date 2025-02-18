import mongoose from "mongoose";

const messagesSchema=mongoose.Schema({
   senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true,
   },
   receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:true
   },
   text:{
    type:String
   },
   image:{
    type:String,
   }

},
{
    timestamps:true
});

const Message=mongoose.model("Message",messagesSchema);
export default Message;