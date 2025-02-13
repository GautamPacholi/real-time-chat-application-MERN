import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authrouter from './routes/auth.routes.js';


dotenv.config();

const app=express();
app.use(express.json());
const port=process.env.PORT;
 
app.use('/auth',authrouter);

app.listen(port,()=>{
   console.log("ruuning on "+port);
   connectDB();
});