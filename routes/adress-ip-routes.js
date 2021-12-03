
const express = require('express')
const router = express.Router();
const adressipSchema = require("../models/ipadress")

// CRUD API FOR IP ADRESS

// Save new IP ADRESS
router.post("/adresse/add",(req,res)=>{
    const adressip = new adressipSchema(req.body);
    adressip.save().then((response)=>{
        res.status(201).json({
            message: req.body.adresseIP+" added to DB",
            result: response,
        });
    }).catch(error=>{
        res.status(500).json({
            error: error
        });
    })
})

// Delete ip adress by id
router.post("/adresse/delete/:id",(req,res)=>{
    adressipSchema.findByIdAndDelete(req.params.id,(error,data)=>{
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

//update vm state
//Actif
router.post('/actif/:id',(req,res)=>{
    adressipSchema.findByIdAndUpdate(req.params.id,
        {$set:  {'etat':'demarrée'}},(error,data)=>{
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
//Passif
router.post('/passif/:id',(req,res)=>{
    adressipSchema.findByIdAndUpdate(req.params.id,
        {$set:  {'etat':'arretée'}},(error,data)=>{
            if (error) {
                console.log(error);
            } else {
                res.status(200).json({
                    msg: data
                })
            }
        })
})


// get all ip adress
router.route('/adresses').get((req,res)=>{
    adressipSchema.find((error,response)=>{
        if(error){
            return next(error)
        }
        else{
            res.status(200).json(response)
        }
    })
})

// get single ipAdress BY ID
router.route('/adresses/:id').get((req,res)=>{
    adressipSchema.findById(req.params.id,(error,data)=>{
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

module.exports = router
