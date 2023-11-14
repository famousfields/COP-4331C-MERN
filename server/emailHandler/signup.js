const Bcrypt = require('bcrypt');
const crypto = require('node:crypto');

const sgMail = require('@sendgrid/mail');
const Token = require('../models/tokenModel');
const User = require('../models/userModel');

const fs = require('node:fs');
//Key is orginally added to the environment and accessed that way (could be more secure)
key = fs.readFileSync('./sendGridAPIKey.txt', {'encoding':'utf-8'});
sgMail.setApiKey(key); //Get public key from the text file

// use POST. Requires JSON with email, name and password
const signup = function(req, res, next) {
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
module.exports = signup;