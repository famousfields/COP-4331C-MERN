var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var cors = require('cors');
const mongoose = require('mongoose');
var multer = require("multer");
const connectDB = require("./dbConn");
const User = require("./models/userModel");
const Expense = require('./models/expenseModel');

// const { default: UserExpenses } = require('../front-end/src/Pages/UserExpenses');

var app = express();
const PORT  = 5000;
const PORT_S = 433;

// Neccessary packages for accepting json data
app.use(cors());
app.use(express.json());

// Global middleware function (logs the time, along with request method and route)
app.use( (req, res, next) => {
    //date = new Date().
    //strTime = 
    //console.log('Time:', Date.now(), '; Request Type:', req.method);
    console.log('Request Type:', req.method, ', Route:', req.path);
    next()
})
//connect db here
  //infrastructure for HTTPS, requires a key pair be created and then a cert.
const https = require('node:https');
const http = require('node:http');
const fs = require('node:fs');
//const { signup, confirmEmail, resendLink } = require('./emailHandler');

//const signup = require('./emailHandler/signup');
const resendLink = require('./emailHandler/signup');
//const confirmEmail = require('./emailHandler/confirmEmail');

/*const options = {
    key: fs.readFileSync('path_to_key.pem'),
    cert: fs.readFileSync('path_to_cert.pem'),
};*/
//otherwise
const options = {
    pfx: fs.readFileSync('./mern.pfx'),
    passphrase: 'mernProj',
};

// infrastructure for sending emails with sendgrid moved to ./emailHandler/

app.get("/", (req,res) => {
   // res.json({"users": ["UserOne", "UserTwo", "UserThree"]})
    res.send("\nHello from the server homepage");
})
connectDB();

mongoose.connection.once('open', ()=> {
    console.log("Mongo DB connection is succcessful");
    app.listen(PORT, () => console.log(`Server connected on port: ${PORT}`));
})

app.post("/expenses", async(req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(200).json(expense);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// Route to get all users
app.get("/users", async (request,response) => {
    try {
        const users = await User.find();
        response.json(users);
    } catch (error) {
        console.error(error);
        console.log("Internal Server Error");
    }
    
})

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

// Handle a post for a new user
app.post('/signup', (req, res, next) => {
    output = signup(req, res, next);
    res.json(output);
    next()
},
    (req, res) => {
        console.log('Successfully completed Signup route')
    });

const confirmEmail = (req, res, next) => {
    Token.findOne( {token: req.params.token })
        .then( (err, token) => {
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

        });
}

// Handle verification of the email given along with the token.
app.get('/verify/:name/:token', (req, res, next) => {
    output = confirmEmail(req, res, next);
    res.json(output);
    next();
}, 
    (req, res, next) => {
        console.log('Successfully completed Confirm Email route');
    });

app.post('/resend/', (req, res, next) => {
    output = resendLink(req, res, next);
    res.json(output);
    next()
}, (req, res, next) => {
    console.log('Successfully finished resend route');
});

/*
app.get("/api/expenses", async(request,response) => {
    const result = await UserExpense.find();
    response.send({"userExpenses": result});
})
*/
app.post("/login", async (request,response)=>{
        const {email,password} = request.body;
        try{
            const check = await collection
        }catch{

        }
    }
    
)
app.post("/user/delete/:id", async(req,res) => {
    const result = await User.findByIdAndDelete(req.params.id);

    res.json(result);
})

