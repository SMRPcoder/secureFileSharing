const { request, response } = require("express");
const { RegisterValidator, LoginValidator } = require("../validations/auth.validation");
const User = require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


exports.register=async (req,res)=>{
    try {
        const {error:validationError,value:registerBody}= RegisterValidator.validate(req.body);
        if(validationError){
            res.status(400).json({message:validationError.message,status:false});
        }else{
           const userData=await User.findOne({where:{username:registerBody.username}});
           if(userData){
            res.status(409).json({message:"Already Found!",status:false});
           }else{
            await User.create({...registerBody});
            res.status(201).json({message:"Created Sucessfully!",status:true});
           }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Error Happend!",status:false});
    }
}


exports.login=async (req,res)=>{
    const {error:validationError,value:loginBody}= LoginValidator.validate(req.body);
    if(validationError){
        res.status(400).json({message:validationError.message,status:false});
    }else{
        const userData=await User.findOne({where:{username:loginBody.username}});
        if(userData){
            const isVerified=await bcrypt.compare(loginBody.password,userData.password);
            if(isVerified){
                const token=jwt.sign({id:userData.id,username:userData.username,firstName:userData.firstName,lastName:userData.lastName},process.env.JWT_SECRET,{expiresIn:"24h"});
                res.status(200).json({message:"Login Success",token,status:true});
            }else{
                res.status(401).json({message:"Password Missmatch!!",status:false});
            }
            
        }else{
            res.status(400).json({message:"No Data Found!",status:false});
        }
    }
}

exports.checkProtected=async(req,res)=>{
    res.status(200).json({message:"Hello From Protected Route!",status:true});
}