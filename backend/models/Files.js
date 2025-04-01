const { UUIDV4,DataTypes } = require("sequelize");
const db=require("../db/connection");
const User=require("./User");
const Contact = require("./Contact");

const Files=db.define("files",{
    id:{
        primaryKey:true,
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        allowNull:false
    },
    filePath:{
        allowNull:false,
        type:DataTypes.STRING
    },
    userId:{
        allowNull:false,
        type:DataTypes.UUID
    },
    sentTo:{
        allowNull:false,
        type:DataTypes.UUID
    },
    contactId:{
        allowNull:false,
        type:DataTypes.UUID
    },
    publicKey:{
        allowNull:false,
        type:DataTypes.TEXT
    },
    privateKey:{
        allowNull:false,
        type:DataTypes.TEXT
    },
    privateKeyIv:{
        allowNull:false,
        type:DataTypes.TEXT
    },
    fileType:{
        allowNull:false,
        type:DataTypes.STRING
    }
},{timestamps:true});


Files.belongsTo(User, {foreignKey:"userId", as:"file_sender"});
User.hasMany(Files,{foreignKey:"userId", as:"file_sender"});

Files.belongsTo(User,{foreignKey:"sentTo", as:"file_receiver"});
User.hasMany(Files,{foreignKey:"sentTo",as:"file_receiver"});

Files.belongsTo(Contact);
Contact.hasMany(Files);

module.exports=Files;