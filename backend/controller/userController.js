const { request, response } = require("express");
const User = require("../models/User");


exports.showUserList=async (req=request,res=response)=>{
    try {
        const UserListData=await User.findAll({where:{isActive:true},attributes:["id","username"]});
        res.status(200).json({data:UserListData,status:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Error Happend!",status:false});
    }
}