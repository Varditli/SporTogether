const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const SportType = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const trainerSchema = mongoose.model(
	"Trainer",
	new mongoose.Schema({
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		tel: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		sportType: [SportType],
		experience: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: false,
		},

		// resetToken: String,
		// expireToken: Date,
		mylike: [{ type: ObjectId, ref: "Training" }],
		// roles: [
		//     {
		//       type: mongoose.Schema.Types.ObjectId,
		//       ref: "Role"
		//     }
		// ],
	})
);
module.exports = trainerSchema;
