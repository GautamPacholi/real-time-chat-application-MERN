import express from 'express';
import {signup,login,logout,updateprofile,checkAuth} from "../controller/auth.controller.js";
import {verifyToken} from "../middleware/auth.middleware.js";
const router=express.Router();

router.post('/signUp',signup);
router.post('/logIn',login);
router.post('/logOut',logout);
router.put('updateProfile',verifyToken,updateprofile);

router.get('/check',verifyToken,checkAuth);


export default router;