const express = require('express')
const app = express();
const PORT  = 5000;

app.get("/users", (req,res) => {
    res.json({"users": ["UserOne", "UserTwo", "UserThree"]})
})

app.listen(PORT, ()=> {console.log(`Server running on port ${PORT}`)})