const asyncHendler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
};

const createContact = asyncHendler(async (req, res) => {
    console.log(`the body is : ${req.body}`);
    const {name, email, phone } = req.body;
    if(!name || !email ||!phone){
        res.status(400);
        throw new Error("All fields are mendatory !");
    }
    const connect = await Contact.create({
        name, 
        email,
        phone,
    });
    res.status(201).json(connect);
});

const getContact =  asyncHendler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found !");
    }
    res.status(200).json(contact);
});

const updateContact =  asyncHendler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found !");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updateContact);
});

const deleteContact = asyncHendler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id); 
    if(!contact){
        res.status(404);
        throw new Error("Contact not found !");
    }
    res.status(200).json(contact);
});

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };