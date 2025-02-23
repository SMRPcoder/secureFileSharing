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

Invite.belongsTo(User);
User.hasMany(Contact);

Invite.belongsTo(User,{foreignKey:"sentTo"});
User.hasMany(Contact,{foreignKey:"sentTo"});

module.exports=Invite;