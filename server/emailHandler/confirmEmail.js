
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
            //return res.status(500).json({ 'msg': 'Verification link may have expired (token not found)'});
            return res.render('verify', {title: 'Email Verification', userMessage: 'Hello ' + req.params.name, 
                message: 'Verification link may have expired (token not found)'});
        }
        else {
            // user is a query , not the document... 
            //var user = User.findOne( {_id:token._userId, name: req.params.name});
            var user = await User.findOne( {_id:token._userId} )  //await will give a document? = yes!
            //.then( (user) => { // .then not need if awaiting.

            if(!user) {
                // return res.status(404).json({ 'msg': 'Unable to find user to verify'});
                return res.render('verify', {title: 'Email Verification', userMessage: 'Hello ' + req.params.name,
                    message: 'Unable to find user to verify'});
            }
            else if(user.isVerified) {
                // return res.status(500).json({ 'msg': 'User already verified! Log in instead'});
                // delete the token as it is not needed
                Token.deleteOne({_id:token._id});
                return res.render('verify', {title: 'Email Verification', userMessage: 'Hello ' + req.params.name, 
                        message: 'User already verified! Log in instead.'});
            }
            else {
                //Now try to verify the user
                user.isVerified = true;
                //we can delete the token, it is no longer needed.
                Token.deleteOne({token:req.params.token});

                // this should be okay? (user.save().then(etc)), otherwise we can replace with User.updateOne() 
                // User.findByIdAndUpdate(token._userId, {isVerified: true}).exec() //if no callback (no longer supported!), only a query is returned
                //.save() is better as it does a full validation.
                try {
                    await user.save();  //wait for the user to be saved
                } catch(err) {
                    console.log('User.save() Error!\n' + err.message);

                }
                console.log('Successfully confirmed user: ' + user.name);
                return res.render('verify', {title: 'Email Verification', userMessage: `Hello ${user.name},`, 
                        message: 'User Successfully Confirmed! Please Log in:'});

                // user.save().then( (usr) => {
                //         console.log('Successfully confirmed user: ' + usr.name);
                //         // return res.status(200).json(
                //         //     {
                //         //         msg: 'Account successfully verified',
                //         //         name: usr.name,
                //         //         email: usr.email
                //         //     });
                //         try {
                //             return res.render('verify', {title: 'Email Verification', userMessage: 'Hello ' + usr.name + ',',
                //                 message: 'User Successfully Confirmed! Please Log in:'});
                //         } catch(err) {
                //             // usr.isVerified = false;
                //             // usr.save();   // is this step really necesary?
                //             return res.render('verify', {title:'Email Verification Error', userMessage:'an Error Occured', err: err.message});
                //         }
                //     })
                //     .catch((err) => {
                //         if(err) {
                //             console.log('Error! \n:' + err.message);
                //             // return res.status(500).json({'msg': 'User.findByIdAndUpdate Error', 'err':err.message});
                //             return res.render('verify', {title: 'Email Verification',
                //                 message: 'user.save() error', err: err.message});
                //         }
                //         else {  //probably never reach... just saying.
                //             // return res.status(500).json({'msg': 'Account successfully verified'});
                //             return res.render('verify', {title: 'Email Verification', userMessage: 'Hello ' + user.name, 
                //                 message: 'Should not be reached. User Account Successful'});
                //         }
                //     });
            }
            // }).catch( (err) => {
            //     return res.status(500).json({'msg': 'Error on User.findOne.exec()', 'err':err.message});
            // });
        }
    }
    catch (err) {
        // return res.status(500).json({'msg': 'Find Token error (try-catch block)', 'err':err.message});
        return res.render('verify', {title: 'Email Verification', userMessage: 'Hello ' + req.params.name, 
            message: 'Find Token error (try-catch block)', err: err.message});
    }
}

module.exports = confirmEmail;