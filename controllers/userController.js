const User = require("../models/userModel.js");

const signUpUser = (req, res, next) => {
	const { username, mail, password } = req.body;
	const newUser = new User(username, email, password);
	res.send(newUser);
};

module.exports.signUpUser = signUpUser;
