const express = require('express')
const app = express();
const PORT  = 5000;
const PORT_S = 433;
const cors = require('cors')
//use this variable to store mongoDB/mongoose
//const db = 
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
/*
// Tested, and it worked. Albeit, it went to spam (or Junk) initially
const sgMail = require('@sendgrid/mail');
//Key is orginally added to the environment and accessed that way (could be more secure)
key = fs.readFileSync('./sendGridAPIKey.txt', {'encoding':'utf-8'});
sgMail.setApiKey(key); //Get public key from the text file

// Template ID: d-07d36665001b4f28bc9e07d335bf8f51 for E-mail verification.
// Will create another Template for password reset.
const message = {
    template_id: 'd-07d36665001b4f28bc9e07d335bf8f51',
    dynamic_template_data: {
        first_name: "David",
        verify_url: "google.com"    // google.com used for testing.
    },
    personalizations: [
    {
        to: [
            {
            email: 'da429145@ucf.edu',
            name: 'David Patenaude'
        },
        ],

    }
    ],
    from: {
        email: 'mern.cop4331@gmail.com',
        name: 'Mern Group 5'
    },
};
// A basic message
const msg = {
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
    res.end("\nHello from the server homepage");
})

app.get("/users",async(req,res)=>{
    const allUsers = await User.find();

    res.json(allUsers);
})

app.post("/user/new", (req,res)=>{
    const newUser = new User(req.body.text);

    newUser.save();
    res.json(newUser);
})

app.post("/user/delete/:id", async(req,res) => {
    const result = await User.findByIdAndDelete(req.params.id);

    res.json(result);
})

http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
}); //for non http requests
https.createServer(options, app).listen(PORT_S, () => {
    console.log(`HTTPS Server running on port ${PORT_S}`);
});   //or use port. 

//app.listen(PORT, ()=> {console.log(`Server running on port ${PORT}`)})