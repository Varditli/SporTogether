const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Training = mongoose.model("Training")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')
const requireLogin = require('../middleware/requireLogin')

Router.post('/createNewTraining',(req,res)=>{
    const {name, capacity, type, time, intensity, limitations, gender, age_group, recurring, free_text} = req.body
    
    if(!name || !capacity || !type || !time || !recurring){
        return res.status(422).json({error:"please fill all the required fields"})
    }

    const training = new Training({
        name,
        capacity,
        type,
        time,
        intensity,
        limitations,
        gender,
        age_group,
        recurring,
        free_text
    })

    training.save(err => {
        if (err) {
            res.status(500).send({ message: err })
                return
            }
            res.json({message:"saved successfully"})
    })

    .catch(err=>{
        console.log(err)
    })
})
module.exports = Router