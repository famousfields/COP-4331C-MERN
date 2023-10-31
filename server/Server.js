const express = require('express')
const app = express();
const PORT  = 5000;
//use this variable to store mongoDB
//const db = 

app.get("/", (req,res) => {
    res.json({"users": ["UserOne", "UserTwo", "UserThree"]})
})
app.get("/users",(req,res)=>{
    db.query("SELECT * from users", (req,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
})

app.post("/create", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    db.query([email,password],(err, result)=>
    {
        if(err){
            console.log(err);
        }
        else
        {
            result.send("You have successfully registered");
        }
    }

    )
})

app.listen(PORT, ()=> {console.log(`Server running on port ${PORT}`)})