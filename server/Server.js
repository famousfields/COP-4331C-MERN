const express = require('express')
const app = express();
const PORT  = 5000;
const cors = require('cors')
const { MongoClient } = require('mongodb');
app.use(cors());
app.use(express.json());

async function main() {
    // Connecting to the database
    const uri = "mongodb+srv://merngroup:merngroup123@merndb.fk1jibv.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        // Adding test data into database
        await createUser(client, {
            name: "Mr. E",
            email: "testi123@gmail.com",
            username: "testiboi",
            password: "brauts"

        })
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createUser(client, newUser) {
    const result = await client.db("mernProjectDB").collection("users").insertOne(newUser);

    console.log(`New user created with the following id: ${result.insertedID}`);

}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);

    });
}

app.get("/", (req,res) => {
    res.json({"users": ["UserOne", "UserTwo", "UserThree"]})
})

app.get("/users", async(req,res)=>{
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