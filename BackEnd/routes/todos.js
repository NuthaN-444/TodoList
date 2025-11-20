const express = require('express');
const router = express.Router();
const Todo = require('../models/todos');

// fetching todos from db
router.get("/", async (req, res) => {
  const userEmail = req.query.email;
  try {
    const todos = await Todo.find({ email: userEmail });
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
});

// adding new todo
router.post("/", async (req, res) => {
  const { todoTitle, todoCompleted, pinTodo, email } = req.body;

  try {
    await Todo.create({ todoTitle, todoCompleted, pinTodo, email });
    res.json("Successfully added");
  } catch (error) {
    console.log(error);
  }
});

// updating todo
router.put("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const updated = await Todo.findByIdAndUpdate(todoId, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Update failed" });
  }
});

// deleting single todo
router.delete("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const deleted = await Todo.findByIdAndDelete(todoId);

    if (!deleted) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted", deleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Delete failed" });
  }
});

// deleting all todos
router.delete("/", async (req, res) => {
  const userEmail = req.query.email;

  try {
    await Todo.deleteMany({ email: userEmail });
    res.json({ message: "All todos deleted for user: " + userEmail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
