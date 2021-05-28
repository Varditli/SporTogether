const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const Trainee = mongoose.model("Trainee")
const Trainer = mongoose.model("Trainer")
const Training = mongoose.model("Training")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')
const requireLoginTrainer = require('../middleware/requireLoginTrainer')
const requireLoginTrainee = require('../middleware/requireLoginTrainee')

mongoose.set("useFindAndModify", false);


Router.post('/createNewTraining',requireLoginTrainer,(req,res)=>{
    const {name, capacity,type, time, price, intensity, location, zoom, limitations, gender, age_group, additional_info} = req.body
    if(!name || !zoom || !type || !time || !price){
        return res.status(422).json({error:"Please fill all the required fields"})
    }
    Training.findOne({name:name})
    .then((saveTraining)=>{
        if(saveTraining){
            return res.status(422).json({error:"Training already exist with this name"})
        }
        console.log(req.trainer)
        //console.log(name, capacity,type, time, intensity, location, zoom, limitations, gender, age_group, additional_info)
        const training = new Training({
        name,
        created_at: Date.now(),
        capacity,
        type,
        location,
        zoom,
        time,
        price,
        intensity,
        limitations,
        gender,
        age_group,
        additional_info,
        trainerId: req.trainer._id,
        trainerUsername: req.trainer.username,
        })
        training.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return 
          }
          return res.json({message:"Saved training successfully",training: training})
        })
   })
  .catch(err=>{
    console.log(err)
})

});


Router.get("/allTrainings",(req,res)=>{
  Training.find()
    .populate("trainingCreator")
    .then((trainings)=>{
      res.json({trainings})
})
.catch((err)=>{
  res.json(err)
})
});



//trainee like
Router.put("/like", requireLoginTrainee, (req, res) => {
  Training.findByIdAndUpdate(
    req.body.trainingId,
    {
      $push: { mylikes: req.trainee._id },
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


//trainee unlike
Router.put("/unlike", requireLoginTrainee, (req, res) => {
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

  //show the trainings that the trainee likes
Router.get("/myLikes", requireLoginTrainee, (req, res) => {
  Training.find({ mylikes: req.trainee })
    .populate("mylikes", "_id name")
    .then((myLike) => {
      res.json({ myLike });
    })
    .catch((err) => {
      console.log(err);
    });
});


//show all the trainings the trainee registered to
Router.get("/myTrainingsTrainee", requireLoginTrainee, (req, res) => {
  Training.find({ trainingBy: req.trainee })
    .populate("trainingBy", "_id name")
    .then((myTraining) => {
      res.json({ myTraining });
    })
    .catch((err) => {
      console.log(err);
    });
});




  //show all the trainings that the trainer created
  Router.get("/myTrainingsTrainer", requireLoginTrainee, (req, res) => {
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

//adds the trainee to the participants list of the training
Router.put("/regTrainingAddTrainee", requireLoginTrainee, (req, res) => {
  const {trainingId} = req.body
  Training.findByIdAndUpdate(
    trainingId, 
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
      res.json(result);   //returns training
      console.log("Added trainee to training");
    }
  });

});

//removes the trainee from the participants list of the training
Router.put("/unRegTrainingRemoveTrainee", requireLoginTrainee, (req, res) => {
  const {trainingId} = req.body
  Training.findByIdAndUpdate(
    trainingId,
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