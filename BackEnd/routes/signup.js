const express = require('express');
const router = express.Router();

const Signup = require('../models/user');

router.get("/",async(req,res) => {
    res.send("from /signup");
});


//creating user account
router.post("/" , async(req,res) => {
    const {name,email,password} = req.body;
    try {
        const CreatingUser = await Signup.create({name,email,password});
        res.json({message:"Signup Successful"});
    } catch (error) {
        res.json({message:"User with this email already exists."});
    }
});



// updating user account
router.put("/:email" , async(req,res) => {
    const {name,email,password} = req.body;
    try {
        const UpdatingUser = await Signup.findOneAndUpdate({email:req.params.email},{$set :{name,email,password}},{new:true});
        res.json(UpdatingUser);
    } catch (error) {
         res.json({message:error});
    }
});


// deleting
router.delete("/:email" , async(req,res) => {
    try {
        const DeletingUser = await Signup.findOneAndDelete({email:req.params.email});
        res.json(DeletingUser);
    } catch (error) {
         res.json({message:error});
    }
});


module.exports = router;