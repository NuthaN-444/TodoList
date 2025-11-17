const express = require('express');
const router = express.Router();

const Todo = require('../models/todos');

router.get("/",(req,res) => {
    res.send("hello from todo");
})



module.exports = router;