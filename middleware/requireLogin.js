const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')
const mongoose = require('mongoose')
const User = mongoose.model("User")
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
        const _id = payload["id"]
        User.findById(_id).then(userdata=>{
            
            req.user = userdata
           next()
        })
        Trainer.findById(_id).then(sellerdata=>{
            req.seller = sellerdata
            next()
        })
    })
}