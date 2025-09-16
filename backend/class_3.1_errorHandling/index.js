const express = require('express');
const app = express();


app.get("/dummy", (req, res) => {


    try{
        JSON.parse('{"name": "ashii"}')
        // JSON.parse("Invalid json");
        res.send("Hello from try"); 
    }catch(err){
        res.send('Some error occured' + err);
    }
})


app.listen(4200, () => {
    console.log('Server is running on port 4200')
})