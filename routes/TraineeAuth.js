const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const Trainee = mongoose.model("Trainee");
const Trainer = mongoose.model("Trainer");
const Training = mongoose.model("Training");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../key");
const requireLogin = require("../middleware/requireLoginTrainee");
const requireLoginTrainee = require("../middleware/requireLoginTrainee");

Router.post("/signupTrainee", (req, res) => {
	const { username, email, password, age, tel } = req.body;
	if (!email || !password || !username || !age || !tel) {
		return res.status(422).json({ error: "please add all the fields" });
	}
	Trainee.findOne({ email: email })
		.then((savedTrainee) => {
			if (savedTrainee) {
				return res
					.status(422)
					.json({ error: "Trainee already exist with that email" });
			}
			bcrypt.hash(password, 12).then((hashedpassword) => {
				const trainee = new Trainee({
					email,
					password: hashedpassword,
					age,
					tel,
					username,
				});
				trainee.save((err) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}
					res.json({ message: "saved successfully" });
				});
			});
		})

		.catch((err) => {
			console.log(err);
		});
});

Router.post("/forgotPassword", (req, res) => {
	const { email, password, tel } = req.body;
	if (!email || !password || !tel) {
		return res
			.status(422)
			.json({ error: "please add email or password or Tell" });
	}
	Trainee.findOne({ email, tel }).then((savedTrainee) => {
		if (!savedTrainee) {
			return res.status(422).json({ error: "Invalid email or tell" });
		}
		bcrypt.hash(password, 12).then((hashedpassword) => {
			savedTrainee.password = hashedpassword;
			savedTrainee.save((err) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				res.json({ message: "saved successfully" });
			});
		});
	});
});


Router.post("/signinTrainee", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: "please add email or password" });
	}
	Trainee.findOne({ email: email }).then((savedTrainee) => {
		if (!savedTrainee) {
			return res.status(422).json({ error: "Invalid email or password" });
		}
		bcrypt
			.compare(password, savedTrainee.password)
			.then((doMatch) => {
				if (doMatch) {
					const token = jwt.sign({ _id: savedTrainee._id }, JWT_SECRET);
					const { _id, username, email, tel, age, password } =
						savedTrainee;
					res.json({
						token,
						trainee: { _id, username, email, tel, age, password },
					});
				} else {
					return res
						.status(422)
						.json({ error: "Invalid email or password" });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

Router.get("/TraineeDetails", (req, res) => {
	Trainee.find({ _id: req.body })
		.populate("-password")
		.then((traineeDetails) => {
			res.json({ traineeDetails });
		})
		.catch((err) => {
			res.json(err);
		});
});

Router.post("/editTraineeProfile", (req, res) => {
	const { username, email, age, tel } = req.body;
	if (!username || !email || !age || !tel) {
		return res.status(422).json({ error: "please add all the fields" });
	}
	Trainee.findOne({ email: email }).then((savedTrainee) => {
		if (!savedTrainee) {
			return res.status(422).json({ error: "Trainee not found" });
		}
		savedTrainee.username = username;
		savedTrainee.age = age;
		savedTrainee.tel = tel;

		savedTrainee
			.save()
			.then((trainee) => {
				console.log('trainee',trainee);
				res.json({ message: "Updated trainee profile successfully" });
			})
			.catch((err) => {
				res.json({ message: err });
			});
	});
});

module.exports = Router;
