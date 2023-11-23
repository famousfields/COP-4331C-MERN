const mongoose = require('mongoose');

// End of the string is the sub DB. /test is for testing
var connecionString ="mongodb+srv://merngroup:merngroup123@merndb.fk1jibv.mongodb.net/test" 

const connectDB = async()=>{
    try {
        await mongoose.connect(connecionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch(error) {
        console.error(error);
    }
}

module.exports = connectDB