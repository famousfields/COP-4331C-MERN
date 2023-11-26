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

const signup = async function(req, res, next) {
    try {
        var userQ = await User.findOne( {email: req.params.email});
        // write to a file as console.log disappears into the void...
        fs.writeFile('./userQ.txt', ('Time: ' + Date.now().toString() + '\n' + userQ.toString() + '\n'), {encoding:'utf8', flag:'a'}, (err) => {
            if(err) 
                return res.status(500).send({msg:'Error writing log file', err: err.message});
        });
        // need to figure out proper way to handle this... it is doing it for all emails! Soln: check if email is not null
        if(userQ != null && userQ.email != null && userQ.email === req.params.email) {
            return res.status(500).send({msg: 'Email already associated!'});
        }
        else {
            // hash the password
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
            // console.log('DEBUG: Password hashed...');
            // hashing using built-in node:crypto
            
            // const hash = crypto.createHash('sha256');   //creates hash object
            // hash.update(req.body.password);     // updates text to hash
            // req.body.password = hash.digest('hex'); // gives the computed hash.

            // So, User.create creates AND saves to the DB!
            User.create({name:req.body.name, email:req.body.email, password: req.body.password})
                .then( (user) => {
                    //For a successful .create() 
                    // console.log('DEBUG: User saved successfully');
                    
                    //create token for verification
                    Token.create( {_userId: user._id, token: crypto.randomBytes(16).toString('hex') })
                        .then( (token) => {
                            // successfully saved - send an email
                            // UPDATE to https when nearing completion.
                            v_url = 'http://' + req.headers.host + '/verify/' + user.name + '/' + token.token;
                            const message = {
                                template_id: 'd-07d36665001b4f28bc9e07d335bf8f51', //template for email verification
                                // data for the dynamic template
                                dynamic_template_data: {
                                    first_name: req.body.name,
                                    verify_url: v_url    // google.com used for testing.
                                },
                                personalizations: [ {
                                    to: [ {
                                            email: req.body.email,
                                            name: req.body.name
                                    }, /*add additional emails here!*/],
                                } ],
                                from: {
                                    email: 'mern.cop4331@gmail.com',
                                    name: 'Mern Group 5'
                                },
                                //maybe add mern.cop4331@gmail.com as a BCC (not yet tested)
                                bcc: [{
                                    email: 'mern.cop4331@gmail.com'
                                }]
                            };

                            sgMail.send(message)
                                .then( () => {
                                    console.log('Email sent to ' + user.email);
                                }).catch( (error) => {
                                    console.error(error);
                                    return res.status(500).send({msg: 'Error sending mail', err: error.message})
                                });
                            return res.status(200).json(
                                {
                                    msg:'Verification email sent to ' + user.email,
                                    email: req.params.email,
                                    name: req.params.email,
                                    user_id: user._id
                                });
                            //{'msg':'Verification email sent to ' + user.email};
                        })
                        .catch( async (err)=> {
                            //if an error occured
                            console.log('Error during token saving: ' + err);
                            await User.deleteOne({_id:user._id});
                            console.log('Deleting the user');
                            
                            return res.status(500).send({msg: 'Error during saving token', 'err':err.message}); //{'err': err};
                        });

                }).catch(async (err) => {
                    console.log('Error during user creation: ' + err);
                    return res.status(500).send({'msg':'error while creating user', 'err':err.message});
                });
        }

    } catch(err) {
        return res.status(500).send({'msg': 'try-catch error in signup.js','err':err.message});;
    }
}

module.exports = signup;