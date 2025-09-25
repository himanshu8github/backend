const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db.js");
const UserData = require("./models/user.js");
const validateUser = require("./utils/validateUser.js")

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());



app.get("/info", async (req, res) => {

    try{
         const payload = jwt.verify(req.cookies.token,  "123456789Himanshu");
        const data = await UserData.findById(payload._id);
        res.send(data);

    }catch(err){
        res.send("error from get id route : " + err.message);
    }
})

app.post("/register", async (req, res) => {
    console.log("Request Body:", req.body); // Log the incoming request body to verify the keys

    req.body.password = await bcrypt.hash(req.body.password, 10);

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

app.get("/info", async (req, res) => {

    try{

        //validate the user first

        const payload = jwt.verify(req.cookies.token,  "123456789Himanshu");
         console.log(payload);
         const result = await UserData.find();
         res.send(result);
    }catch(err){
        res.send("Error from get router : " + err.message)
    }
   
});

//login
app.post("/login", async (req, res) => {


    try{
    

        const identify = await UserData.findOne({email:req.body.email});
        
        if(!(req.body.email === identify.email))
            throw new Error ("Invalid credentials"); 

        const isAllowed = await bcrypt.compare(req.body.password, identify.password);

        if(!(isAllowed))
            throw new Error("Invalid credentials");

        //jwt token 
        const token = jwt.sign({_id:identify._id, email:identify.email}, "123456789Himanshu", {expiresIn: "10"}); // time is in seconds
        res.cookie("token", token);
        res.send("Login sucess");

    }catch(err){
        res.send(err.message + "error coming from login post route");
    }
})

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