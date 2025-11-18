const express = require('express');
const router = express.Router();
const Todo = require('../models/todos');



router.get("/",async(req,res) => {
    const userEmail = req.query.email; 
    try{
        const todos = await Todo.find({ email: userEmail });
        res.json(todos);
    } catch (error) {
        console.log(error);
    }
})



router.post("/",async(req,res) => {
    const {todoTitle,todoCompleted,pinTodo,email} = req.body;
    try {
        const addingTodo = await Todo.create({todoTitle,todoCompleted,pinTodo,email});
        res.json("Successfully added");
    } catch(error) {
        console.log(error);
    }
});

router.delete("/", async (req, res) => {
  const userEmail = req.query.email;
  try {
    await Todo.deleteMany({ email: userEmail }); // correct function
    res.json({ message: "All todos deleted for user: " + userEmail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;