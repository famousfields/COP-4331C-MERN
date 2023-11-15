
const Token = require('../models/tokenModel');
const User = require('../models/userModel');

// route would be: 
//      app.get('/verify/:name/:token', confirmEmail)
// where 'confirmEmail' is the function below. 
const confirmEmail = async (req, res, next) => {
    try {
    uToken = await Token.findOne( {token: req.params.token });
    //.then() will take the promise returned by .findOne which is the token document.
        /*.then( (err, token) => {
            // if token not found, it may have expired
            if(!token) {
                return {msg: 'Verification link may have expired. Click Resend Email'};
            }
            // otherwise see if the user associated is valid.
            else {
                User.findOne({_id: token._userId, name: req.params.name })
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

        });*/
        if(!uToken) {
            return { 'msg': 'Verification link may have expired'};
        }
        else {
            user = await User.findOne( {_id:token._userId, name: req.params.name});
            
            if(!user) {
                return { 'msg': 'Unable to find user to verify'};
            }
            else if(user.isVerified) {
                return { 'msg': 'User already verified! Login in instead'};
            }
            else {
                //Now try to verify the user
                user.isVerified = true;
                //we can delete the token, it is no longer needed.
                Token.deleteOne( { 'token': req.params.token});

                user.save().thne( (err) => {
                    if(err) {
                        return {'err':err.message};
                    }
                    else {
                        return {'msg': 'Account successfully verified'};
                    }
                })
            }
        }
    }
    catch (err) {
        return {'err':err};
    }
}

module.exports = confirmEmail;