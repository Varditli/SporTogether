const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Training = mongoose.model("Training")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')
const requireLogin = require('../middleware/requireLogin')

Router.post('/createNewTraining',(req,res)=>{
    const {name, capacity,type, time, intensity, limitations, gender, age_group, recurring, free_text} = req.body
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
        free_text,
        trainerCreate: req.trainer,
        create_at: Date.now()
    })
    training.save()
    .then((result) => {
        console.log(result);
      return  res.json({ training: result });
      })
      .catch((err) => {
        return console.log(err);
      });
      
});
module.exports = Router