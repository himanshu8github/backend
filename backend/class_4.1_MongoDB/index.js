const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const User = require("./models/User.js");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.post("/users/postroute", async (req, res) => {
  try {
    const user = new User(req.body); // { name, age, email }
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/users/getroute", async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/users/put/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated doc
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/delete/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/get", (req, res) => {
    res.send("Hello from get route")
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

