const express = require('express');
const app = express();


const BookArr = [
    {id:1, name:"harry liun", author:"harry"},
    {id:2, name:"atomicity", author:"einstein"},
     {id:3, name:"brooklyn", author:"rathore"},
    {id:4, name:"lifesays", author:"milsion"},
      {id:5, name:"Thoughts", author:"milsion"},
        {id:6, name:"love", author:"milsion"},

]

app.use(express.json());

app.get('/allBook', (req, res) => {
    res.send(BookArr);
})

app.get('/book', (req, res) => {
    console.log(req.query);

    const book = BookArr.filter(info => info.author === req.query.author);
    res.send(book);
})

app.get("/book/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const data = BookArr.find(info => info.id === id);
    res.send(data);
    // console.log(req.params);
    // res.send("success")
})

app.post('/book', (req, res) => {
    BookArr.push(req.body);
    res.send("saved successfully");
})

app.patch('/book', (req, res) =>{
    console.log(req.body);
    const Book = BookArr.find(infor => infor.id === req.body.id);
    Book.author= req.body.author;
})


app.put("/book", (req, res) => {

    const Book = BookArr.find(info => info.id === req.body.id);

    Book.author = req.body.author;
    Book.name = req.body.name;
    
    res.send("Changes saved");

})

app.delete("/book/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const index = BookArr.find(info => info.id === id);

    BookArr.splice(index, 1);
    res.send("deleted successfully")
})


app.listen(4000, () => {
    console.log(`Server is running on port 4000`)
});