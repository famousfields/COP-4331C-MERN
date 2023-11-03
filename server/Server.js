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