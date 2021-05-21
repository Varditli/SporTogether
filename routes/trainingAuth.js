const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const Trainee = mongoose.model("Trainee")
const Training = mongoose.model("Training")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')
const requireLoginTrainer = require('../middleware/requireLoginTrainer')
const requireLoginTrainee = require('../middleware/requireLoginTrainee')

mongoose.set("useFindAndModify", false);

Router.post('/createNewTraining',(req,res)=>{
    const {name, capacity,type, time, intensity, location, zoom, limitations, gender, age_group, additional_info} = req.body
    if(!name || !zoom || !capacity || !type || !time ){
        return res.status(422).json({error:"please fill all the required fields"})
    }
    console.log(name, capacity,type, time, intensity, location, zoom, limitations, gender, age_group, additional_info)
    const training = new Training({
        name,
        trainingCreator: req.trainer,
        created_at: Date.now(),
        capacity,
        type,
        location,
        zoom,
        time,
        intensity,
        limitations,
        gender,
        age_group,
        additional_info,
    })
    training.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return 
      }
      return res.json({message:"saved successfully"})
    })
      
})



Router.get("/all-trainings",(req,res)=>{
  Training.find()
    .populate("trainingCreator")
    .then((trainings)=>{
      res.json({trainings})
})
.catch((err)=>{
  res.json(err)
})
})

Router.put("/like-training", requireLoginTrainee, (req, res) => {
  Training.findByIdAndUpdate(
    req.body.trainingId,
    {
      $push: { likes: req.trainee._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });

  
  Router.put("/unlike-training", requireLoginTrainee, (req, res) => {
    Training.findByIdAndUpdate(
      req.body.trainingId,
      {
        $pull: { likes: req.trainee._id },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
  });

  //show all the trainings that the trainer created
  Router.get("/mytrainings", requireLoginTrainee, (req, res) => {
    Deal.find({ trainingCreator: req.trainee })
      .populate("trainingCreator", "_id name")
      .then((mydeal) => {
        res.json({ mydeal });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

Router.put("/reg-training", requireLoginTrainee, (req, res) => {
  Training.findByIdAndUpdate(
    req.body.trainingId, 
    {
      $push: { participants: req.trainee._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });

  Trainee.findByIdAndUpdate(
    req.body.trainerId, 
    {
      $push: { mytrainings: req.body.trainingId},
    },
    {
      new: true,
    }
  ).exec((err, resu) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(resu);
    }
  });

});

Router.put("/unreg-training", requireLoginTrainee, (req, res) => {
  Training.findByIdAndUpdate(
    req.body.trainingId, 
    {
      $pull: { participants: req.trainee._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});
module.exports = Router