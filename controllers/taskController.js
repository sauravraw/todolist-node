const mongoose = require("mongoose");
const Task = require("../models/taskSchema.js");

const getTasks = async (req, res) => {
	const allTasks = await Task.find();
	res.send(allTasks);
};

const addTasks = async (req, res) => {
	const { taskName } = req.body;

	let newTask = new Task({ taskName });
	try {
		newTask = await newTask.save();
	} catch (err) {
		console.log(err);
	}

	res.send("data added Succesfully");
};
const getTaskById = async (req, res) => {
	const { taskId } = req.params;

	try {
		let task = await Task.find({ taskId });
		console.log(task);
		res.send(task);
	} catch (err) {
		console.error(err);
	}
};
const updateTasks = async (req, res) => {
	const { taskId } = req.params;
	console.log(req.body);
	try {
		let task = await Task.updateOne(
			{ taskId: taskId },
			{ $set: { taskName: req.body.taskName } }
		);
		res.send(task);
	} catch (err) {
		console.log(err);
	}
};

const deleteTaskById = async (req, res) => {
	const { taskId } = req.params;

	try {
		await Task.deleteOne({ taskId });
		res.send("task deleted successfully");
	} catch (err) {
		console.error(err);
	}
};
module.exports = {
	getTasks,
	addTasks,
	updateTasks,
	getTaskById,
	deleteTaskById,
};
