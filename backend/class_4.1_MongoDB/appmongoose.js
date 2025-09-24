const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const User = require("./models/User.js");

dotenv.config();

const app = express();

app.use(express.json());





app.get("/get", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching users");
    }
});

app.post("/post", async(req, res) => {

    // const ans = new User(req.body);
    // await ans.save();

    try{
    await User.create(req.body);
    res.send("Successfully created user");
    }catch(err){
        res.status(500).send(err + " error occured");
    }
});


app.put("/put", async(req, res) => {

    // const resp = await User.updateOne({name: "Harshit"}, {name: "harshitttttt"});
       const resp = await User.updateOne({name: "harshitttttt"}, {email: "harshitttt888888@gmail.com"});
    res.status(200).send(resp + "updated sucessfully")
})

app.delete("/delete", async(req, res) => {
    await User.deleteOne({name: "nia"});
    res.status(200).send("Deleted sucessfully")
})


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully");
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });


        // mongo query
        const resp = await User.find();
        console.log(resp);

    } catch (error) {
        console.error("Failed to start server:", error);
        
    }
};

startServer();