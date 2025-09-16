const express = require('express');
const {Auth} = require("./middleware/auth")
const app = express();

app.use(express.json());

// CRUD
// Database array

const foodMenu = [
    {id:1, food: "Maggie", price: 130, category:"veg"},
    {id:2, food: "Butter Naan", price: 30, category:"veg"},
    {id:3, food: "Aloo Parantha", price: 50, category:"veg"},
    {id:4, food: "Paneer Parantha", price: 110, category:"veg"},
    {id:5, food: "Gobhi Parantha", price: 100, category:"veg"},
    {id:6, food: "Veg Biryani", price: 160, category:"veg"},
    {id:7, food: "Masala Dosa", price: 120, category:"veg"},
    {id:8, food: "Idli Sambhar", price: 80, category:"veg"},
    {id:9, food: "Chole Bhature", price: 140, category:"veg"},
    {id:10, food: "Pav Bhaji", price: 110, category:"veg"},
    {id:11, food: "Veg Burger", price: 90, category:"veg"},
    {id:12, food: "Veg Pizza", price: 200, category:"veg"},
    {id:13, food: "Paneer Tikka", price: 180, category:"veg"},
    {id:14, food: "Spring Rolls", price: 150, category:"veg"},
    {id:15, food: "Hakka Noodles", price: 130, category:"veg"},
    {id:16, food: "Manchurian", price: 140, category:"veg"},
    {id:17, food: "Dal Makhani", price: 120, category:"veg"},
    {id:18, food: "Shahi Paneer", price: 180, category:"veg"},
    {id:19, food: "Rajma Chawal", price: 100, category:"veg"},
    {id:20, food: "Kadhai Paneer", price: 190, category:"veg"},
    {id:21, food: "Aloo Tikki", price: 60, category:"veg"},
    {id:22, food: "Veg Sandwich", price: 70, category:"veg"},
    {id:23, food: "Stuffed Capsicum", price: 150, category:"veg"},
    {id:24, food: "Veg Pulao", price: 130, category:"veg"},
    {id:25, food: "Mix Veg Curry", price: 140, category:"veg"},
];


//admin

// authenticate admin here
// app.use('/admin', Auth);


app.post('/admin',  Auth, (req, res) => {
    

    if(Access){
        foodMenu.push(req.body);
        res.status(201).send("Items added sucessfully");
    }
})

app.delete('/admin/:id', Auth,  (req, res) => {
 

  
        const id = parseInt(req.params.id);

        const index = foodMenu.findIndex(info => info.id === id);

        

        if(index === -1){
            res.status(401).send("Doesn't exist");

        }else{
            foodMenu.splice(index, 1);
            res.status(201).send('sucessfully deleted');
        }

    } 
)

app.patch('/admin/:id', Auth, (req, res)=> {

         const id = parseInt(req.params.id);
        const foodData = foodMenu.find(item => item.id === id);

        if(foodData){

            if(req.body.food)
                foodData.food = req.body.food;
            if(req.body.category)
                foodData.category = req.body.category;
            if(req.body.price)
                foodData.price = req.body.price;

            
            return res.status(200).send({
                message: "Item updated successfully",
                updatedItem: foodData
            });


        }else{
            res.status(404).send("Item not exists");
        }
    })




//user

const userAddToCart = [];

app.get("/user/cart", (req, res) => {
    res.json(userAddToCart);
});


app.post("/user/:id", (req, res) => {
    
    const id = parseInt(req.params.id);

    const foodItem = foodMenu.find(info => info.id === id);

    if(foodItem){
        userAddToCart.push(foodItem);
        res.status(200).send("Item added successfully");

    }else{
        res.status(401).send("Item out of stock");
    }


})

app.delete("/user/:id", (req, res) => {

    const id = parseInt(req.params.id);

   const index = userAddToCart.findIndex(item => item.id === id);


    if(index != -1){
        userAddToCart.splice(index, 1);
        res.send("Item removed sucessfully");

    }else{
        res.send("No item is present in cart");
    }
})



app.get('/menu', (req, res) => {
    res.send(foodMenu);
})


app.listen(4000, () => {
    console.log("Server is running on port 4000");
})