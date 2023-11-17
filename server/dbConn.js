const mongoose = require('mongoose');
var connecionString ="mongodb+srv://merngroup:merngroup123@merndb.fk1jibv.mongodb.net/mernProjectDB" 
const connectDB = async()=>{
    try {
        await mongoose.connect(connecionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch(error) {
        console.error(error);
    }
}

module.exports = connectDB