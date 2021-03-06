const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')
const mongoose = require('mongoose')
const Trainer = mongoose.model("Trainer")

module.exports =( req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must logged in"})
        }
        const {_id} = payload
        Trainer.findById(_id).then(trainerdata=>{
          req.trainer = trainerdata;
            next();
        })
    })
}