const mongoose = require('mongoose');
const userShecma = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Plase add the user name"],
    },
    email: {
        type: String,
        require: [true, "Plase add the address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        require: [true, "Plase add the user password"],
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userShecma);