import express from 'express';
import {signup,login,logout} from "../controller/auth.controller.js";
const router=express.Router();

router.post('/signUp',signup);
router.post('/logIn',login);
router.post('/logOut',logout);


export default router;