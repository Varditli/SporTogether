const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const SportType = mongoose.model("SportType")

Router.post('/addSportType',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(422).json({error:"please add all the fields"}) //if the trainee didn't insert the required fields
    }
    SportType.findOne({name:name})
    .then((addSportType)=>{
        if(addSportType){
            return res.status(422).json({error:"This sport already exist"})
        }

        const sportType = new SportType ({name})
            sportType.save(err => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }
                res.json({message:"sportType saved successfully"})
        })
    })

    .catch(err=>{
        console.log(err)
    })
})


Router.get("/allSportTypes",(req,res)=>{
    SportType.find({})
      .then((sportTypes)=>{
        res.json({sportTypes})  //returns json of all the sport types
  })
  .catch((err)=>{
    res.json(err)
  })
  })
module.exports = Router   //exports all the routers