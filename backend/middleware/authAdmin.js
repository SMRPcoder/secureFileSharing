const jwt =require("jsonwebtoken");

const AuthAdmin=async (req,res,next)=>{
    try {
        const header=req.headers;
        const bearer_token=header.authorization;
        if(bearer_token){
            const [bearer,token]=bearer_token.split(" ");
            if(bearer==="Bearer"){
                const userData=jwt.verify(token,process.env.JWT_SECRET);
                if(userData){
                    if(userData.role=="ADMIN"){
                        next();
                    }else{
                        res.status(401).json({message:"Not a Admin!",status:false});
                    }
                }else{
                    res.status(401).json({message:"Verfication Failed! Not a User!",status:false});
                }
               
            }else{
                res.status(401).json({message:"Not a Token!",status:false});
            }
        }else{
            res.status(401).json({message:"Token Required!",status:false});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Error Happend!",status:false});
    }
}

module.exports=AuthAdmin;