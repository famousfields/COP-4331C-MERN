const mongodb = require('../dbConn');

//basic user schema that allows for email verification
const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    isVerified: {type: Boolean, default: false }, 
    password: String, 
});

const User = mongoose.model("User", userSchema)

module.exports = User;
