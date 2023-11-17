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
const resendLink = async (req, res, next) => {
    User.findOne({email: req.body.email})
        .then( (user) => {
            // first see if user is in DB
            if (!user) {
                return res.status(404).json({msg: 'Unable to find user with that email'});
            }
            // check if already verified
            else if (user.isVerified) {
                return res.status(200).json({msg:'Account already verified. Log In instead'});
            }
            else {
                //send a verification link - start by creating a new token
                console.log('DEBUG: User found to resend link...');

                //create token for verification
                Token.create( {_userId: user._id, token: crypto.randomBytes(16).toString('hex') })
                //After token created and saved
                    .then( (token) => {
                        
                        console.log('DEBUG: new token saved...');

                        // send an email to verify user
                        v_url = 'http://' + req.headers.host + '/verify/' + user.name + '/' + token.token;
                        
                        const message = {
                            template_id: 'd-07d36665001b4f28bc9e07d335bf8f51', //template for email verification
                            dynamic_template_data: {
                                first_name: user.name,
                                verify_url: v_url    // google.com used for testing.
                            },
                            personalizations: [ {
                                to: [ {
                                        email: req.body.email,  //only  email is passed
                                        name: user.name
                                    },
                                    // Add extras here (if so desired)
                                ],
                        
                            } ],
                            from: {
                                email: 'mern.cop4331@gmail.com',
                                name: 'Mern Group 5'
                            },
                            // perhaps mern email as BCC.
                        };

                        sgMail.send(message)
                            .then( () => {
                                console.log('Email sent to ' + user.email);
                            })
                            .catch( (error) => {
                                console.error(error)
                            })
                        return res.status(200).json( 
                            {
                                msg:'Verification Email sent to ' + user.email,
                                status: 'success'
                            });
                    }).catch( (err) => {
                        return res.status(500).json( {'msg':err.message} );
                    });
            }
        }).catch( (err) => {
            return res.status(500).json( {'err':err.message} ) ;
        });
}
module.exports = resendLink;