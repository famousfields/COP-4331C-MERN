const express = require('express')
const app = express();
const PORT  = 5000;
const cors = require('cors')
//use this variable to store mongoDB/mongoose
//const db = 
app.use(cors());
app.use(express.json());

//connect db here
  //infrastructure for HTTPS, requires a key pair be created and then a cert.
const https = require('node:https');
const fs = require('node:fs');
// infrastructure for sending emails with sendgrid
/*  // Tested, and it worked. Albeit, it went to spam (or Junk)
    // to not go to spam, would require a custom domain email. which would cost extra $$$.
const sgMail = require('@sendgrid/mail');
//Key is orginally added to the environment and accessed that way (could be more secure)
key = fs.readFileSync('./sendGridAPIKey.txt', {'encoding':'utf-8'});
sgMail.setApiKey(key); //Get public key from 

const msg = {
    to: 'da429145@ucf.edu',
    from: 'mern.cop4331@gmail.com',
    subject: 'Hello From SendGrid',
    text: 'sent from server.js using SendGrid',
    html: '<strong>sent from server.js using SendGrid</strong>',
};
sgMail.send(msg)
    .then( () => {
        console.log('Email sent')
    })
    .catch( (error) => {
        console.error(error)
    })
*/

/*const options = {
    key: fs.readFileSync('path_to_key.pem'),
    cert: fs.readFileSync('path_to_cert.pem'),
};*/
//otherwise
const options = {
    pfx: fs.readFileSync('./mern.pfx'),
    passphrase: 'mernProj',
};


app.get("/", (req,res) => {
    res.json({"users": ["UserOne", "UserTwo", "UserThree"]})
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

//http.createServer(app).listen(80) //for non http requests
https.createServer(options, app).listen(443);   //or use port. 

//app.listen(PORT, ()=> {console.log(`Server running on port ${PORT}`)})