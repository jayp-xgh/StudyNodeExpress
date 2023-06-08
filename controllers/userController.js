const asyncHendler = require('express-async-handler');
const bcriypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = asyncHendler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mendatory !");
    }
    const userAvalibler = await User.findOne({email});
    if(userAvalibler){
        res.status(400);
        throw new Error("User already registered!");
    }
    const hashPassword = await bcriypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    })
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else {
        res.status(400);
        throw new Error("User date as not valid!");
    }
    res.json({message: "register the user"});
});

const loginUser = asyncHendler(async (req, res) => {
    const { email , password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mendatory !");    
    }    
    const user = await User.findOne({ email });
    if(user && (await bcriypt.compare(password, user.password))){
        const accesToken = jwt.sign({ 
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1m' 
            }
        );
        res.status(200).json({ accesToken });
    }
    else {
        res.status(401);
        throw new Error("Email or password is not valid !");
    }
});

const currentUser = asyncHendler(async (req, res) => {
    res.json({message: "Current user information"});
});

module.exports = { registerUser, loginUser, currentUser };