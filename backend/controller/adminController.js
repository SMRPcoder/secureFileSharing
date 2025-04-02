const Files = require("../models/Files");
const User = require("../models/User");


exports.viewAllUsers=async (req,res)=>{
    try {
        let {page}=req.query;
        if(!page)page=1;
        const limit=20;
        const offset=(page*limit)-limit;
        const userData=await User.findAndCountAll({
            attributes:{exclude:["password"]},
            limit,
            offset,
            order:[["createdAt","DESC"]]
        });
        res.status(200).json({data:userData.rows,count:userData.count,status:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error Happend!",status:false});
    }
}

exports.viewAllFiles=async (req,res)=>{
    try {
        let {page}=req.query;
        if(!page)page=1;
        const limit=20;
        const offset=(page*limit)-limit;
        const filesData=await Files.findAndCountAll({
            distinct:true,
            include:[
                {model:User, as:"file_sender",attributes:{exclude:["password"]}},
                {model:User, as:"file_receiver",attributes:{exclude:["password"]}},
            ],
            limit,
            offset
        });
        res.status(200).json({data:filesData.rows,count:filesData.count,status:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error Happend!",status:false});
    }
}