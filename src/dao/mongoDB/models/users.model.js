import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	age: {
		type: String,
		default: 0,
	},
	password: {
		type: String,
		required: true,
	},
	associatedCart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Carts",
	},
	rol: {
		type: String,
		default: "Usuario",
	},
	failedLoginAttempts: {
    type: Number,
    default: 0,
  }
});

const githubUserSchema = new mongoose.Schema({
	userID: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Users" },
	githubId: String,
	githubToken: String,
});

userSchema.pre("find", function (next) {
	this.populate("associatedCart");
	next();
});

export const usersModel = mongoose.model("Users", userSchema);
export const githubUserModel = mongoose.model("GithubUser",githubUserSchema)
