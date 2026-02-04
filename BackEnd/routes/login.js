const express = require('express');
const router = express.Router();

const Login = require('../models/user');


router.post("/",async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await Login.findOne({email});
        if (!user) return res.json("No such user with this email !");
        if(user.password !== password) return res.json("Wrong password");
        res.json("Login Successful");
    } catch (error) {
        res.json("message",error);
    }
});


module.exports = router;