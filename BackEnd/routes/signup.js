const express = require('express');
const router = express.Router();

const Signup = require('../models/user');

router.get("/",async(req,res) => {
    res.send("from /signup");
});

// router.get("/:id",async(req,res) => {
//     res.json(message,"from /signup/:",req.params.id);
// });

// router.get("/all/" , async(req,res) => {
//     try {
//         const CreatingUser = await Signup.find({});
//         res.json(CreatingUser);
//     } catch (error) {
//         console.log("Error",error);
//     }
// });

//creating
router.post("/" , async(req,res) => {
    const {name,email,password} = req.body;
    try {
        const CreatingUser = await Signup.create({name,email,password});
        res.json("Signup Successful");
    } catch (error) {
        console.log("Error",error);
    }
});



// updating
router.put("/:email" , async(req,res) => {
    const {name,email,password} = req.body;
    try {
        const UpdatingUser = await Signup.findOneAndUpdate({email:req.params.email},{$set :{name,email,password}},{new:true});
        res.json(UpdatingUser);
    } catch (error) {
        console.log("Error",error);
    }
});


// deleting
router.delete("/:email" , async(req,res) => {
    try {
        const DeletingUser = await Signup.findOneAndDelete({email:req.params.email});
        res.json(DeletingUser);
    } catch (error) {
        console.log("Error",error);
    }
});


module.exports = router;