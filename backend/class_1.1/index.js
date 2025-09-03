const express = require('express');
const app = express();

app.use('/detail/:id/:user', (req, res) => {
    console.log(req.params);
    res.json({name : "himanshu"})
});

// app.get('/', (req, res) => {
//     res.send("hi there....");
// });

// app.get('/home', (req, res) => {
//     res.send("homepage");
// });

// app.get('/about', (req, res) => {
//     res.send("about page");
// });

// app.get('/contact', (req, res) => {
//     res.send("contact page");
// });

// app.use('/detail', (req, res) => {
//     res.json({name : "himanshu"})
// });

app.listen(4000, () => {
    console.log("server is running on port 4000");
});
