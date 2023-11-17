//File for sending and handling verification emails, and password resets
const Bcrypt = require('bcrypt');
const crypto = require('node:crypto');

const sgMail = require('@sendgrid/mail');
const Token = require('./models/tokenModel');
const User = require('./models/userModel');

const fs = require('node:fs');
//Key is orginally added to the environment and accessed that way (could be more secure)
key = fs.readFileSync('./sendGridAPIKey.txt', {'encoding':'utf-8'});
sgMail.setApiKey(key); //Get public key from the text file

// use POST. Requires JSON with email, name and password
signup = function(req, res, next) {
    User.findOne( {email: req.body.email })
        .then( (err, user) => {
            if(err) {
                return {msg: err.message};
            }
            // or if the user already exists
            else if (user) {
                return {msg:'Email already associated with an account'};
            }
            //register otherwise
            else {
                // hash the password
                req.body.password = Bcrypt.hashSync(req.body.password, 10);
                console.log('DEBUG: Password hashed...');

                user = new User({ name: req.body.name, email: req.body.email, password: req.body.password});
                user.save()
                .then( (err) => {
                    if(err) {
                        return {msg:err.message};
                    }
                    console.log('DEBUG: user saved successfully...');

                    // create token for this user (to verify them)
                    var token = new Token( {_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
                    token.save()
                    .then((err) => {
                        if(err){
                            return {msg:err.message};
                        }
                        console.log('DEBUG: token saved successfully...');

                        // send an email to verify user - don't see why email is needed in url. maybe name instead.
                        v_url = 'http://' + req.headers.host + '/verify/' + user.email + '/' + token.token;
                        const message = {
                            template_id: 'd-07d36665001b4f28bc9e07d335bf8f51', //template for email verification
                            dynamic_template_data: {
                                first_name: req.body.name,
                                verify_url: v_url    // google.com used for testing.
                            },
                            personalizations: [ {
                                to: [
                                    {
                                    email: req.body.email,
                                    name: req.body.name
                                    },
                                ],
                            } ],
                            from: {
                                email: 'mern.cop4331@gmail.com',
                                name: 'Mern Group 5'
                            },
                        };

                        sgMail.send(message)
                            .then( () => {
                                console.log('Email sent to ' + message.personalizations.to.email);
                            })
                            .catch( (error) => {
                                console.error(error)
                            })
                        return {msg:'Verification Email sent to ' + user.email};
                    });

                })
            
            }
        });
}
// route would be: 
//      app.get('/verify/:email/:token', confirmEmail)
// where 'confirmEmail' is the function below. 
confirmEmail = (req, res, next) => {
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
// use a POST method
resendLink = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then( (err, user) => {
            // first see if user is in DB
            if (!user) {
                return {msg: 'Unable to find user with that email'};
            }
            // check if already verified
            else if (user.isVerified) {
                return {msg:'Account already verified. Log In instead'};
            }
            else {
                //send a verification link - start by creating a new token
                console.log('DEBUG: User found to resend link...');

                var token = new Token( {_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
                    token.save()
                    .then((err) => {
                        if(err){
                            return {msg:err.message};
                        }
                        console.log('DEBUG: new token saved...');

                        // send an email to verify user
                        v_url = 'https://' + req.headers.host + '/verify/' + user.email + '/' + token.token;
                        const message = {
                            template_id: 'd-07d36665001b4f28bc9e07d335bf8f51', //template for email verification
                            dynamic_template_data: {
                                first_name: req.body.name,
                                verify_url: v_url    // google.com used for testing.
                            },
                            personalizations: [ {
                                to: [
                                    {
                                    email: req.body.email,
                                    name: req.body.name
                                    },
                                ],
                        
                            } ],
                            from: {
                                email: 'mern.cop4331@gmail.com',
                                name: 'Mern Group 5'
                            },
                        };

                        sgMail.send(message)
                            .then( () => {
                                console.log('Email sent to ' + message.personalizations.to.email);
                            })
                            .catch( (error) => {
                                console.error(error)
                            })
                        return {msg:'Verification Email sent to ' + user.email};
                    });
            }
        });
}

module.exports = signup, confirmEmail, resendLink;

// For reference
// A basic message
/*const msg = {
    to: 'da429145@ucf.edu',
    from: 'mern.cop4331@gmail.com',
    subject: 'Hello From SendGrid',
    text: 'sent from server.js using SendGrid',
    html: '<strong>sent from server.js using SendGrid</strong>',
};
sgMail.send(message)
    .then( () => {
        console.log('Email sent')
    })
    .catch( (error) => {
        console.error(error)
    })
//*/