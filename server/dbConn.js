const mongoose = require('mongoose');
var connecionString ="mongodb+srv://merngroup:merngroup123@merndb.fk1jibv.mongodb.net/" 
const connectDB = async()=>{
    try {
        await mongoose.connect(connecionString, {
            useUnifiedTopology: false,
            useNewURLParser: false
        });
    } catch(error) {
        console.error(error);
    }
}

module.exports = connectDB