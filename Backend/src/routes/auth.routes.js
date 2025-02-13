import express from 'express';
import {signup} from "../controller/auth.controller.js";
const router=express.Router();

router.post('/signUp',signup);

export default router;