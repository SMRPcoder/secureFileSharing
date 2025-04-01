const { request, response } = require("express");
const User = require("../models/User");
const { Op, Sequelize } = require("sequelize");
const { faker } = require("@faker-js/faker");
const Files = require("../models/Files");
const Contact = require("../models/Contact");
const db = require("../db/connection");
const fs = require("fs");
const path = require("path");


exports.showUserList = async (req, res) => {
    try {
        console.log(req.userId);
        const UserListData = await User.findAll({ where: { isActive: true, id: { [Op.ne]: req.userId } }, attributes: ["id", "username"], raw: true });
        // console.log(UserListData);
        res.status(200).json({ data: UserListData, status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.seeder = async (req, res) => {
    let NewUsersData = [];
    for (let i = 10; i > 0; i--) {
        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();
        let UserData = {
            firstName,
            lastName,
            username: faker.internet.email({ firstName, lastName }).toLowerCase(),
            password: "123456789"
        };
        NewUsersData.push(UserData);
        await User.create(UserData);
    }
    res.status(200).json({ message: "Seeeder Success", status: false });
}

exports.sendFile = async (req, res) => {
    const ta = await db.transaction();
    try {
        const { contactId, sentTo,publicKey,privateKey,privateKeyIv,fileType } = req.body;
        const userId = req.userId;
        const contactData = await Contact.findOne({ where: { id: contactId } });
        const filePath = req.file.path;
        if (contactData) {
            await Files.create({ 
                contactId, userId, sentTo, 
                filePath,publicKey,privateKey,
                privateKeyIv,fileType }, { transaction: ta });
            await ta.commit();
            res.status(200).json({ message: "Stored And Saved Sucessfully!", status: true });
        } else {
            if (filePath) fs.unlink(filePath);
            res.status(200).json({ message: "Invalid Data Given!", status: false });
        }
    } catch (error) {
        await ta.rollback();
        // if (req.file) fs.unlink(req.file.path);
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.viewAllForContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contactData = await Contact.findOne({ where: { id: contactId } });
        const FilesContactData=await Contact.findOne({where:{ userId:contactData.contactPersonId,
            contactPersonId:contactData.userId}});
        const filesData = await Files.findAll({ where: { contactId:{[Op.in]:[contactId,FilesContactData.id]} }, order: [["createdAt", "ASC"]] });
        res.status(200).json({ data: filesData, status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.getFileForDownload = async (req, res=response) => {
    try {
        const { id } = req.params; // or req.params.id if sent via URL params
        const fileData = await Files.findOne({ where: { id } });

        if (!fileData) {
            return res.status(404).json({ message: "File not found!", status: false });
        }

        res.status(200).json({data:fileData,status:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.deleteFile=async (req,res)=>{
    try {
        const { id } = req.params;
        const fileData = await Files.findOne({ where: { id } });

        if (!fileData) {
            return res.status(404).json({ message: "File not found!", status: false });
        }
        fs.unlink(fileData.filePath,(err)=>{
            console.log(err);
        });
        await fileData.destroy();
        res.status(200).json({message:"Deleted Successfully!",status:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}