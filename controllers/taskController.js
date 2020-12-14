const mongoose = require("mongoose");
const Task = require("../models/taskSchema.js");

const getTasks = async (req, res, next) => {
	const allTasks = await Task.find();
	res.send(allTasks);
};

const addTasks = async (req, res, next) => {
	const { taskName } = req.body;

	let newTask = new Task({ taskName });
	try {
		newTask = await newTask.save();
	} catch (err) {
		console.log(err);
	}

	res.send("data added Succesfully");
};

module.exports = { getTasks, addTasks };
