const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')
const mongoose = require('mongoose')
const Trainee = mongoose.model("Trainee")

module.exports =( req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must logged in"})
        }
        const {_id} = payload
        Trainee.findById(_id).then(traineedata=>{
          req.trainee = traineedata;
            next();
        })
    })
}