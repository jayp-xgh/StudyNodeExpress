const asyncHendler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHendler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHendler && authHeader.startsWith("Bearer")){
        token = authHeader.split("")[1];        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized!");
            }
       });
    }
});