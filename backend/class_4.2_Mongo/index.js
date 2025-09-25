const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db.js");
const UserData = require("./models/user.js");
const validateUser = require("./utils/validateUser.js")

dotenv.config();

const app = express();

app.use(express.json());

app.get("/info", async (req, res) => {

    try{
         const result = await UserData.find();
         res.send(result);
    }catch(err){
        res.send("Error from get router : " + err.message)
    }
   
});

app.get("/info/:id", async (req, res) => {

    try{
        
        const data = await UserData.findById(req.params.id);
        res.send(data);

    }catch(err){
        res.send("error from get id route : " + err.message);
    }
})

app.post("/register", async (req, res) => {
    console.log("Request Body:", req.body); // Log the incoming request body to verify the keys

  

    try {


        await validateUser(req.body); // Validate user before saving
        // Create and save the new user data
        await UserData.create(req.body);
        res.status(200).send("User registered successfully");
    } catch (err) {
        console.log("Error in POST route:", err.message);
        res.status(500).send("Error registering user");
    }
});


app.patch("/update", async(req, res) => {

    try{

        const {_id, ...update} = req.body;
        await UserData.findByIdAndUpdate(_id, update, { runValidators: true});
        res.send("update sucessfully");


    }catch(err){
        res.send("Error from patch route : " + err.message);
    }
})

app.delete("/delete/:id", async (req, res) => {

    try{

        await UserData.findByIdAndDelete(req.params.id);
        res.send("deleted sucessfully");
    }catch(err){
        res.send("Error from delete route : " + err.message);

    }
})


// app.get("/get", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error fetching users");
//     }
// });

// app.post("/post", async(req, res) => {

//     // const ans = new User(req.body);
//     // await ans.save();

//     try{
//     await User.create(req.body);
//     res.send("Successfully created user");
//     }catch(err){
//         res.status(500).send(err + " error occured");
//     }
// });


// app.put("/put", async(req, res) => {

//     // const resp = await User.updateOne({name: "Harshit"}, {name: "harshitttttt"});
//        const resp = await User.updateOne({name: "harshitttttt"}, {email: "harshitttt888888@gmail.com"});
//     res.status(200).send(resp + "updated sucessfully")
// })

// app.delete("/delete", async(req, res) => {
//     await User.deleteOne({name: "nia"});
//     res.status(200).send("Deleted sucessfully")
// })


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully");
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });


        // mongo query
        // const resp = await User.find();
        // console.log(resp);

    } catch (error) {
        console.error("Failed to start server:", error);
        
    }
};

startServer();