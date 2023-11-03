const express = require('express')
const app = express();
const PORT  = 5000;
const cors = require('cors')
//use this variable to store mongoDB/mongoose
//const db = 
app.use(cors());
app.use(express.json());

//connect db here

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

app.listen(PORT, ()=> {console.log(`Server running on port ${PORT}`)})