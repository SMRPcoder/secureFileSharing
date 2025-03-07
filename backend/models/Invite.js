const { UUIDV4,DataTypes } = require("sequelize");
const db=require("../db/connection");
const User = require("./User");

const Invite=db.define("invites",{
    id:{
        primaryKey:true,
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        allowNull:false
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false
    },
    sentTo:{
        type:DataTypes.UUID,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"pending" //"pending"|"rejected"|"accepted"
    }
},{timestamps:true});

Invite.belongsTo(User, {foreignKey:"userId", as:"sender"});
User.hasMany(Invite,{foreignKey:"userId", as:"sender"});

Invite.belongsTo(User,{foreignKey:"sentTo", as:"receiver"});
User.hasMany(Invite,{foreignKey:"sentTo",as:"receiver"});

module.exports=Invite;