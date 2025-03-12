const { request, response } = require("express");
const User = require("../models/User");
const Contact = require("../models/Contact");
const Invite = require("../models/Invite");




exports.addContact = async (req = request, res = response) => {
    try {
        const { id } = req.body;
        const inviteData = await Invite.findOne({ where: { id, sentTo: req.userId } });
        if (inviteData) {
            const userData = await User.findOne({ where: { id: inviteData.userId } });
            if (userData) {
                const newContactData = { userId: req.userId, contactPersonId: inviteData.userId };
                const new2ContactData = { userId: inviteData.userId , contactPersonId:req.userId };
                await Contact.create(newContactData);
                await Contact.create(new2ContactData);

                await inviteData.update({ status: "accepted" });
                res.status(201).json({ message: "created successfully!", status: true });
            } else {
                res.status(400).json({ message: "Invalid Contact!", status: false });
            }
        } else {
            res.status(400).json({ message: "Invalid Invite!", status: false });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.viewAllContacts = async (req, res) => {
    try {
        const contactsData = await Contact.findAll({
            where: { userId: req.userId },
            include: [
                {
                    model: User, as: "contact", attributes: ["id","firstName","lastName","username"],
                    where:{isActive:true},
                    required:true
                },
            ]
        });
        res.status(200).json({ data: contactsData, status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}