
const express = require('express')
const router = express.Router();
const userSchema = require("../models/user")


// GET ALL
router.route('/').get((req,res)=>{
    userSchema.find((error,response)=>{
        if(error){
            return next(error)
        }
        else{
            res.status(200).json(response)
        }
    })
})

// GET SINGLE USER BY ID
router.route('/:id').get((req,res)=>{
    userSchema.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }
        else {
            res.status(200).json({
                data
            })
        }
    })
})
// Save USER
router.post("/add",(req,res)=>{
    const user = new userSchema(req.body);
    user.save().then((response)=>{
        res.status(201).json({
            message: req.body.name+" added to DB",
            result: response,
        });
    }).catch(error=>{
        res.status(500).json({
            error: error
        });
    })
})

module.exports = router
