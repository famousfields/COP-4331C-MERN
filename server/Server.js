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

//connect db here
  //infrastructure for HTTPS, requires a key pair be created and then a cert.
const https = require('node:https');
const http = require('node:http');
const fs = require('node:fs');

/*const options = {
    key: fs.readFileSync('path_to_key.pem'),
    cert: fs.readFileSync('path_to_cert.pem'),
};*/
//otherwise
const options = {
    pfx: fs.readFileSync('./mern.pfx'),
    passphrase: 'mernProj',
};

// infrastructure for sending emails with sendgrid
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

