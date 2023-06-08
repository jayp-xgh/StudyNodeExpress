const asyncHendler = require('express-async-handler');
const bcriypt = require('bcrypt');
const User = require('../models/userModel');
const registerUser = asyncHendler(async (req, res) => {
    const { username, email, passaword } = req.body;
    if(!username || !email || !passaword){
        res.status(400);
        throw new Error("All fields are mendatory !");
    }
    const userAvalibler = await User.findOne({email});
    if(userAvalibler){
        res.status(400);
        throw new Error("User already registered!");
    }
    const hashPassaword = await bcriypt.hash(passaword, 10);
    const user = await User.create({
        username,
        email,
        passaword: hashPassaword,
    })
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else {
        res.status(400);
        throw new Error("User date as not valid!");
    }
    console.log(user);
    res.json({message: "register the user"});
});

const loginUser = asyncHendler(async (req, res) => {
    res.json({message: "login user"});
});

const currentUser = asyncHendler(async (req, res) => {
    res.json({message: "Current user information"});
});

module.exports = { registerUser, loginUser, currentUser    };