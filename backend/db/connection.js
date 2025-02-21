const {Sequelize}=require("sequelize");

const db=new Sequelize({username:"postgres",database:"sft",host:"localhost",port:5432,password:"root"});

db.authenticate().then(()=>{
    console.log("authenticated success!");
}).catch((error)=>{
    console.log(error);
});


module.exports=db;