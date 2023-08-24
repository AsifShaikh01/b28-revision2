const express = require("express");
const {UserModel} = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userRouter = express.Router();
userRouter.post("/register" , async(req,res)=>{
    const {username , avatar , email ,password} = req.body;
    try {
        const alreadyUser = await UserModel.find({email});
        if(alreadyUser){
            res.send("User is already registered!!")
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new UserModel({username , avatar , email , password:hashedPassword});
        await user.save();

        const token = jwt.sign({email:user.email , id:user._id},"masai");
        res.send({"msg":"user registered!!", "token":token})
        
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const alreadyUser = await UserModel.find({email});
        if(!alreadyUser){
            res.send("user not found??")
        }
        const token = jwt.sign({email:alreadyUser.email , id:alreadyUser._id},"masai");
        res.send({"msg":"login successfull!!", "token":token})
        
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    userRouter
}