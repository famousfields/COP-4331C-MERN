
const Token = require('../models/tokenModel');
const User = require('../models/userModel');

// route would be: 
//      app.get('/verify/:email/:token', confirmEmail)
// where 'confirmEmail' is the function below. 
const confirmEmail = (req, res, next) => {
    Token.findOne( {token: req.params.token })
        .then( (err, token) => {
            // if token not found, it may have expired
            if(!token) {
                return {msg: 'Verification link may have expired. Click Resend Email'};
            }
            // otherwise see if the user associated is valid.
            else {
                User.findOne({_id: token._userId, email: req.params.email })
                    .then( (err, user) => {
                    // first check if not valid
                    if(!user) {
                        return {msg:'Unable to find user for this verification.'};
                    }
                    //check if already verified
                    else if (user.isVerified) {
                        return {msg:'User already verified, login instead'};
                    }
                    else {
                        // Verify the user
                        user.isVerified = true;
                        //token no longer needed, delete it
                        Token.deleteOne({token:req.params.token})

                        user.save()
                        .then((err) => {
                            if(err) {
                                return {msg: err.message};
                            }
                            else {
                                return {msg:'Account successfully verified'};
                            }
                        })
                    }
                })
            }

        });
}

module.exports = confirmEmail;