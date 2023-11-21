// file that houses the login function
const Bcrypt = require('bcrypt')
const { createHash, } = require('node:crypto');
const User = require("./models/userModel")

const login = async (req, res, next) => {
    try {
        // wait to get a user document back
        var user = await User.findOne({ email:req.body.email }); // , (err, user) => {
            
        // check if user is null (did not find email.)
        if(!user) {
            return res.status(401).json({ msg:('User email "' + req.body.email + '" not found') });
        }
        // then compare password hashes
        //!compareHash(req.body.password, user.password)
        else if( !Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({ msg: 'Wrong Password!' });
        }
        // finally, check if verified
        else if(!user.isVerified) {
            return res.status(401).json({ msg:'Email not yet verified! Check your spam folder for link' });
        }
        // otherwise, all good!
        else {
            // send name and user_id after successful login for frontend to handle.
            return res.status(200).json(
                { 
                    msg:'Successful log in!',
                    name: user.name,
                    user_id: user._id
                }              
                );
            //Probably need some other stuff here to tell server that user is authenticated, like a session token/cookie
        }
    } catch(err) {
        return res.status(500).json({ msg:'login function error' ,'err': err.message });
    }
}
// Function to compare userPass as a hash to the password from the request
function compareHash(reqPass, userPass) {
    // first hash the reqPass
    const hash = createHash('sha256');
    //console.log(`Req Pass: ${reqPass}`);
    hash.update(reqPass);
    hashedReq = hash.digest('hex');
    console.log(`hashedReq: ${hashedReq}\nuserPass: ${userPass}`);
    return (hashedReq == userPass);    // return the comparison
}

module.exports = login;