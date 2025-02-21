const { UUIDV4,DataTypes,Model } = require("sequelize");
const db=require("../db/connection");
const bcrypt=require("bcrypt");

const User=db.define("users",{
    id:{
        primaryKey:true,
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        allowNull:false
    },
    firstName:{
        allowNull:false,
        type:DataTypes.STRING
    },
    lastName:{
        allowNull:true,
        type:DataTypes.STRING
    },
    username:{
        allowNull:false,
        type:DataTypes.STRING,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{timestamps:true});

User.addHook("beforeCreate",async function(userModel){
    const salt=10;
    userModel.password=await bcrypt.hash(userModel.password,salt);
});


module.exports=User;