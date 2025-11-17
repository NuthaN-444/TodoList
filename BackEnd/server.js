require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB  = require('./db/db');
const app = express();
const port = process.env.PORT || 5000;


const signup = require('./routes/signup');
const login = require('./routes/login');
const todos = require('./routes/todos')

connectDB();

app.use(cors());
app.use(express.json());


app.get("/",(req,res) => {
    res.send("hello");
});

app.use("/signup",signup);

app.use("/login",login);

app.use("/todos",todos);


app.listen(port,() => {
    console.log(`Server is listening at ${port}`)
})

