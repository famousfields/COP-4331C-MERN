const Bcrypt = require('bcrypt');
const crypto = require('node:crypto');

const sgMail = require('@sendgrid/mail');
const Token = require('../models/tokenModel');
const User = require('../models/userModel');

const fs = require('node:fs');
//Key is orginally added to the environment and accessed that way (could be more secure)
key = fs.readFileSync('./sendGridAPIKey.txt', {'encoding':'utf-8'});
sgMail.setApiKey(key); //Get public key from the text file

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