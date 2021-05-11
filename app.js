const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT=5000
const {MONGOURI}= require('./key')
const cors = require('cors')
app.use(cors())
//btrPlpqOKmAIyqeG

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeah")
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting", err)
})

require('./models/Trainee')
require('./models/Trainer')
require('./models/Training')
require('./models/SportType')

const auth = require('./routes/TraineeAuth')
const trainingAuth = require('./routes/trainingAuth')
const sportTypeAuth = require('./routes/sportTypeAuth')

app.use(express.json())
app.use(auth, trainingAuth, sportTypeAuth)

app.listen(PORT,()=>{
    console.log("server is running on", PORT)
})