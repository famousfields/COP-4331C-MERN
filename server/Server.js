
//var express = require('express');
const express = require('express');
//var MongoClient = require("mongodb").MongoClient;

const mongodb = require('mongodb');
var cors = require('cors');
const mongoose = require('mongoose');
var multer = require("multer");
const connectDB = require("./dbConn");
const User = require("./models/userModel");
const Expense = require('./models/expenseModel');
const bcrypt = require("bcrypt");
const Token = require("./models/tokenModel");
//const bcrypt = require('bcrypt');

var app = express();
const PORT  = 5000;     //main port for HTTP / testing
const PORT_S = 433;     //httpS port.

// Neccessary packages for accepting json data
app.use(cors());
app.use(express.json());
app.set('view engine', 'pug');  //view engine for verify page.

// Global middleware function (logs the time, along with request method and route)
app.use( (req, res, next) => {
    //date = new Date().
    //strTime = 
    //console.log('Time:', Date.now(), '; Request Type:', req.method);
    console.log('Request Type:', req.method, ', Route:', req.path);
    next()
})

  //infrastructure for HTTPS, requires a key pair be created and then a cert.
const https = require('node:https');
const http = require('node:http');
const fs = require('node:fs');

// Email Verification
const signup = require('./emailHandler/signup');
const resendLink = require('./emailHandler/resendLink');
const confirmEmail = require('./emailHandler/confirmEmail');
const login = require('./login');

/*const options = {
    key: fs.readFileSync('path_to_key.pem'),
    cert: fs.readFileSync('path_to_cert.pem'),
};*/
//otherwise
const options = {
    pfx: fs.readFileSync('./mern.pfx'),
    passphrase: 'mernProj',
};

app.get('/', (req, res) => {
    res.send('\nHello from the backend server Homepage!');
})

connectDB(); //connects the db

// log that the mongoose connection was successful and display server port connection
mongoose.connection.once('open', ()=> {
    console.log("Mongo DB connection is succcessful");
    //mongoose.Collection.createIndex( {"expireAt":1}, { expireAfterSeconds:15});
    //mongoose.mongodb.C .createIndex( {"expireAt":1}, { expireAfterSeconds:15})
    //Token.createIndexes({key: { expireAt: 1}, expireAfterSeconds: 15});

    //https.createServer(options, app).listen(PORT_S);    //does the trick, doesn't print to console though...
    app.listen(PORT, () => console.log(`Server connected on port: ${PORT}`));
})

// route for '/expenses'
app.route('/expenses')
    // the post route = create a new expense (from req.body)
    .post(async(req, res) => {
        try {
            const { userID, type, quantity, price } = req.body;

            if (!userID || !type || !quantity || !price) {
                return res.status(400).json({ message: 'User ID, type, quantity, and price are required.'});
            }

            const expense = await Expense.create({
                user_id: userID,
                type,
                quantity,
                price,
            });
            
            res.status(200).json(expense);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    })
    // the get route = get all expenses
    // MARKED for DELETION (not needed on frontend side)
    .get(async (req, res) => {
        try {
            const expense = await Expense.find();
            res.json(expense);
        } catch (error) {
            console.error(error);
            console.log("Error getting expenses");
        }
    })
    //.delete() - in progress
    .put(async (req, res, next) => {
        //Update an expense
        const expense = await Expense.findOne({_id:req.body._id});  //gets the expense
        // update contents
        if(!expense) {
            console.log('Could not find Expense while Updating');
            res.status(404).json({msg:'Could not find expense'});
            next()
        }
        expense.type = req.body.type;
        expense.quantity = req.body.quantity;
        expense.price = req.body.price;

        // catch any error during save.
        await expense.save().catch ( (err) => {
            console.error("Error saving expense after update:\n" + err.message);
            res.status(500).json({msg:'Error while saving expense', err:err.message});
        });
        // saved successfully
        console.log('Successfully Updated Expense: ' + expense.type);   //type is equivalent to its name.
        res.status(200).json({msg:'Successfully Updated Expense!'});
    });
    app.delete('/expenses/:id', async (req, res) => {
        try {
            const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

            if (!deletedExpense) {
                return res.status(500).json({message: error.message});
            }

            res.json({ message: 'Expense deleted successfully', deletedExpense })
        } catch (error) {
            console.error(error.message);
            res.status(500).json({message: error.message});
        }
    });

app.get("/user_expenses", async (req, res) => {
    try {
        const userId = req.query._id; // Retrieve user_id from query parameters

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const expenses = await Expense.find({ user_id: userId });
        res.send(expenses);
    } catch (error) {

        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route to get all users
// MARKED for DELETION (not needed on frontend)
app.get("/users", async (request, response) => {
    try {
        const users = await User.find();    //must await when there is anything with the DB
        response.send(users);
    } catch (error) {
        console.error(error);
        console.log("Internal Server Error");
    }
})

// gets a specific user
app.get("/user", async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body._id});    
        res.send(user);
    } catch (error) {
        console.error(error);
        console.log("Internal Server Error");
    }
    
})

// Handle a post for a new user => could consolidate under POST /user ? 
app.post('/signup', async (req, res, next) => {
    output = await signup(req, res, next);  //await was the missing piece (it waits on the function to complete before moving on)
    // returns name, email and user_id as json.
    //res.json(output); // when awaiting function,we can modify res in the function !
    next()
},
(req, res) => {
    console.log('Successfully completed Signup route');
});

// renders the verify.pug with some dummy values for testing the styling.
app.get('/fakeVerify', async (req, res, next) => {
    // Render the verify page, with dummy data.
    res.render('verify', {title: 'Fake Verify', userMessage: 'Hello Fake User!', 
        message: 'Test Page for Verify Template', err:'Optional error text would go here.'});
    next();
});

// Handle verification of the user given along with the token. Oddity with JSON output.
app.get('/verify/:name/:token', async (req, res, next) => {
    output = await confirmEmail(req, res, next)    //updates res in function - now renders in function
    // returns name and email along with a message.
    
    //console.log('Verify output:' + output);
    next();
}, 
(req, res, next) => {
    console.log('Successfully completed Confirm Email route');
    next()
});

// resend has been tested and works. 
app.post('/resend', async (req, res, next) => {
    output = await resendLink(req, res, next);  // returns status: 'success' on success.
    //res.json(output);
    next()
}, (req, res, next) => {
    console.log('Successfully finished resend route');
});

// Route allows us to have the route string in one location and then chain HTTP methods underneath it.
app.route('/login')
    .get( (req, res) => {
        //res.sendFile(buildPath + '')
        res.end('server-side login page');
    })
    .post(async (req, res, next) => {
        output = await login(req, res, next);   // returns user_id and name in json
        //console.log(output);  //don't log this, it is very long
        //res.json(output); //handled in the function
        next();
    }, (req, res, next) => {
        console.log('Successfully completed login handler');
        next();
    })

// delete by email: a bit easier to use in my opinion
app.post("/user/delete/:email", async(req, res) => {
    const result = await User.findOneAndDelete({email:req.params.email});

    res.status(200).json(result);
    console.log(`Deleted a user`);
})

