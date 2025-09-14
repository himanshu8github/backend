const express = require("express");
const app = express();

app.use(express.json());



// you can send only one res but multiple miuddleware
app.use("/user", (req, res,next) =>{

    console.log("first");
    // res.send("Hello")
    next();
},
(req, res, next) => {
    console.log("second");
    // res.send("Hello")
    next();
},
(req, res) => {
    console.log("third");
    res.send("Hello")

},

)


app.listen(4000, () => {
    console.log(`Server is running on port 4000`)
})