const { Op } = require("sequelize");
const Invite = require("../models/Invite");
const User = require("../models/User");


exports.sentInvite=async (req,res)=>{
    try {
        const {sentTo}=req.body;
        const ConflictInvite=await Invite.findOne({where:{userId:req.userId,sentTo,status:{[Op.ne]:"rejected"}}});
        if(ConflictInvite){
            res.status(200).json({message:`Already Invited! and it is ${ConflictInvite.status.toUpperCase()}`,status:false});
        }else{
            await Invite.create({userId:req.userId,sentTo});
            res.status(201).json({message:"Sent Successfully!",status:true});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.viewAllInvite=async (req,res)=>{
    try {
        let InviteData=[];
        const {inviteType}=req.query;
        if(inviteType=="received"){
            InviteData=await Invite.findAll({
                where:{sentTo:req.userId,status:"pending"},
                attributes:["id"],
                include:[
                    {model:User,attributes:["id","firstName","lastName","username"], as:"sender"}
                ]
            });
        }else{
            InviteData=await Invite.findAll({
                where:{userId:req.userId,status:"pending"},
                attributes:["id"],
                include:[
                    {model:User,attributes:["id","firstName","lastName","username"], as:"receiver"}
                ]
            });
        }
       
        res.status(200).json({data:InviteData,status:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.deleteInvite=async (req,res)=>{
    try {
        const {id}=req.params;
        const InviteData=await Invite.findOne({where:{id,userId:req.userId,status:"pending"}});
        if(InviteData){
            await InviteData.destroy();
            res.status(200).json({message:"Deleted!",status:true});
        }else{
            res.status(400).json({message:"Invalid Id Given!",status:false});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.rejectInvite=async (req,res)=>{
    try {
        const {id}=req.body;
        const InviteData=await Invite.findOne({where:{id,sentTo:req.userId,status:"pending"}});
        if(InviteData){
            await InviteData.update({status:"rejected"});
            res.status(200).json({message:"Rejected!",status:true});
        }else{
            res.status(400).json({message:"Invalid Id Given!",status:false});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}