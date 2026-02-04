require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB  = require('./db/db');
const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.send("OK"));

const signup = require('./routes/signup');
const login = require('./routes/login');
const todos = require('./routes/todos')




app.get("/",(req,res) => {
    res.send("hello");
});

app.use("/api/signup",signup);

app.use("/api/login",login);

app.use("/api/todos",todos);


app.listen(port,() => {
    console.log(`Server is listening at ${port}`)
})

