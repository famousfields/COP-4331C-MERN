
const Token = require('../models/tokenModel');
const User = require('../models/userModel');

// route would be: 
//      app.get('/verify/:name/:token', confirmEmail)
// where 'confirmEmail' is the function below. 
const confirmEmail = async (req, res, next) => {
    try {
        // await will wait for the query to run and returns a document. 
        var token = await Token.findOne( {token: req.params.token });
        //.then() will take the promise returned by .findOne which is the token document. (but you need await...)
        if(!token) {
            return res.status(500).json({ 'msg': 'Verification link may have expired (token not found)'});
        }
        else {
            // user is a query , not the document... 
            //var user = User.findOne( {_id:token._userId, name: req.params.name});
            var user = await User.findOne( {_id:token._userId, name: req.params.name})  //await will give a document? = yes!
            //.then( (user) => { // .then not need if awaiting.

            if(!user) {
                return res.status(404).json({ 'msg': 'Unable to find user to verify'});
            }
            else if(user.isVerified) {
                return res.status(500).json({ 'msg': 'User already verified! Log in instead'});
            }
            else {
                //Now try to verify the user
                user.isVerified = true;
                //we can delete the token, it is no longer needed.
                Token.deleteOne({token:req.params.token});

                // this should be okay? (user.save().then(etc)), otherwise we can replace with User.updateOne() 
                // User.findByIdAndUpdate(token._userId, {isVerified: true}).exec() //if no callback (no longer supported!), only a query is returned
                //.save() is better as it does a full validation.
                await user.save().then( (usr) => {
                        console.log('Successfully confirmed user: ' + usr.name);
                        return res.status(200).json({'msg': 'Account successfully verified', name: usr.name, email: usr.email});
                    })
                    .catch((err) => {
                        if(err) {
                            return res.status(500).json({'msg': 'User.findByIdAndUpdate Error','err':err.message});
                        }
                        else {  //probably never reach... just saying.
                            return res.status(500).json({'msg': 'Account successfully verified'});
                        }
                    });
            }
            // }).catch( (err) => {
            //     return res.status(500).json({'msg': 'Error on User.findOne.exec()', 'err':err.message});
            // });
        }
        
    }
    catch (err) {
        return res.status(500).json({'msg': 'Find Token error (try-catch block)', 'err':err.message});
    }
}

module.exports = confirmEmail;