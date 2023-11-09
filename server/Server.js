var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var cors = require('cors');
const mongoose = require('mongoose');
var multer = require("multer");
const connectDB = require("./dbConn");
const { default: UserExpenses } = require('../front-end/src/Pages/UserExpenses');

var app = express();
const PORT  = 5000;

//use this variable to store mongoDB/mongoose
app.use(cors());
app.use(express.json());

//connect db here
connectDB();

mongoose.connection.once('open', ()=> {
    console.log("Mongo DB connection is succcessful");
    app.listen(PORT, () => console.log(`Server connected on port: ${PORT}`));
})


// app.get("/", (req,res) => {
//     res.json({"users": ["UserOne", "UserTwo", "UserThree"]})
// })

const user = new User({
    email:'test2@gmail.com',
    password:'test123'
})
app.get("/users",(request,response)=>{
    database.collection("users").find({}).toArray((error,result)=>{
        response.send(result);
    })
})

app.get("/api/expenses", async(request,response) => {
    const result = await UserExpense.find();
    response.send({"userExpenses": result});
})

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

