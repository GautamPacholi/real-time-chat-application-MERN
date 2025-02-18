import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authrouter from './routes/auth.routes.js';
import messagerouter from "./routes/message.routes.js";
import cookieParser from 'cookie-parser';


dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser());
const port=process.env.PORT;
 
app.use('/api/auth',authrouter);
app.use('/api/message',messagerouter);

app.listen(port,()=>{
   console.log("ruuning on "+port);
   connectDB();
});