// const mongodb = require('../dbConn');
const mongoose = require('mongoose');

//basic user schema that allows for email verification
const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    isVerified: {type: Boolean, default: false }, 
    password: String, 
	expenses: [String],
    monthlyBudget: { type:Number, default: 0 }
});

// Executed before a save (part of validation).
// userSchema.pre( function (user) {
//     if(user.monthlyBudget < 0) {
//         //error!
//     }
// });

const User = mongoose.model("User", userSchema)

module.exports = User;
