var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var cors = require('cors');
const mongoose = require('mongoose');
var multer = require("multer");
const connectDB = require("./dbConn");
const UserModel = require("./models/userModel");
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


// For production  / front-end and backend together
const buildPath = 'E:\\01 VS Code\\COP-4331C-MERN\\front-end\\build'
app.use(express.static(buildPath));

// all routes from the react/front-end must be sent to the index.html, hence the wildcard.
app.get("/*", (req, res) => {
   // res.json({"users": ["UserOne", "UserTwo", "UserThree"]})
    //res.send("\nHello from the server homepage");
    res.sendFile( buildPath + '\\index.html');
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

app.get("/expenses", async (req, res) => {
    try {
        const expense = await Expense.find();
        response.json(expense);
    } catch (error) {
        console.error(error);
        console.log("Error getting expenses");
    }
})

app.post("/users", async (req, res) => {
     UserModel.create(req.body)
     .then(users => res.json(users))
     .catch(err => res.json(err));
})

// adds an expense id to the user expense array (tested and works)
app.post("/users/add_expense", async (req, res) => {
    try{
        const user = await User.findOneAndUpdate({_id: req.body.user_id}, {$push: {"expenses": req.body.exp_id}}, {new: true});
        res.json(user);
        
    } catch(error) {
        console.error(error.message);
        res.status(500).json({message: error.message});
    }
})

// Route to get all users
// app.get("/users", async (request, response) => {
//     try {
//         const users = user.find();
//         response.json(users);
//     } catch (error) {
//         console.error(error);
//         console.log("Internal Server Error");
//     }
    
// })

// Handle a post for a new user
app.post('/signup', async (req, res, next) => {
    output = await signup(req, res, next);  //await was the missing piece (it waits on the function to complete before moving on)
    //res.json(output); // when awaiting function,we can modify res in the function !
    next()
},
(req, res) => {
    console.log('Successfully completed Signup route');
});


// Handle verification of the user given along with the token. Oddity with JSON output.
app.get('/verify/:name/:token', async (req, res, next) => {
    output = await confirmEmail(req, res, next);    //updates res in function
    //console.log('Verify output:' + output);
    next();
}, 
(req, res, next) => {
    console.log('Successfully completed Confirm Email route');
    next()
});

// resend has been tested and works. 
app.post('/resend/', async (req, res, next) => {
    output = await resendLink(req, res, next);
    //res.json(output);
    next()
}, (req, res, next) => {
    console.log('Successfully finished resend route');
});

// Route allows us to have the route string in one location and then chain HTTP methods underneath it.
app.route('/login')
    .get( (req, res) => {
        //res.sendFile(buildPath + '')
    })
    .post(async (req, res, next) => {
        output = await login(req, res, next);
        //console.log(output);  //don't log this, it is very long
        //res.json(output); //handled in the function
        next();
    }, (req, res, next) => {
        console.log('Successfully completed login handler');
        next();
    })

/*
app.get("/api/expenses", async(request,response) => {
    const result = await UserExpense.find();
    response.send({"userExpenses": result});
})
*/

/* //delete by id
app.post("/user/delete/:id", async(req,res) => {
    const result = await User.findByIdAndDelete(req.params.id);

    res.json(result);
})*/

// delete by email: a bit easier to use in my opinion
app.post("/user/delete/:email", async(req, res) => {
    const result = await User.findOneAndDelete({email:req.params.email});

    res.status(200).json(result);
    console.log(`Deleted a user`);
})

