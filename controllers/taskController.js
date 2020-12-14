const mongoose = require("mongoose");
const Task = require("../models/taskSchema.js");
const sendResponse = require("../helpers/sendResponse.js");
const sendErrorMessage = require("../helpers/sendError");
const AppError = require("../helpers/appError.js");
const sendError = require("../helpers/sendError");

const getTasks = async (req, res) => {
	const allTasks = await Task.find();
	sendResponse(200, "Success", allTasks, req, res);
};

const addTasks = async (req, res) => {
	const { taskName } = req.body;

	let newTask = new Task({ taskName });
	try {
		newTask = await newTask.save();
		sendResponse(200, "Task addded successfully", newTask, req, res);
	} catch (err) {
		sendError(
			400,
			"Adding of task failed",
			err.errors.taskName.message,
			req,
			res
		);
	}
};
const getTaskById = async (req, res) => {
	const { taskId } = req.params;

	try {
		let task = await Task.find({ taskId });
		sendResponse(200, "Successfull", task, req, res);
	} catch (err) {
		sendError(
			401,
			"Cannot get task by given id",
			err.errors.taskName.message,
			req,
			res
		);
	}
};
const updateTasks = async (req, res) => {
	const { taskId } = req.params;

	const re = /<("[^"]?"|'[^']?'|[^'">])*>/;

	if (re.test(req.body.taskName)) {
		sendError(400, "unsuccessful", "Taskname cannot be HTML", req, res);
	} else {
		try {
			let task = await Task.updateOne(
				{ taskId: taskId },
				{ $set: { taskName: req.body.taskName } }
			);
			sendResponse(200, "Success", task, req, res);
		} catch (err) {
			sendError(400, "Cannot update task by given id", err, req, res);
		}
	}
};

const deleteTaskById = async (req, res) => {
	const { taskId } = req.params;

	try {
		let deletedTask = await Task.deleteOne({ taskId });
		sendResponse(200, "Task Deleted", deletedTask, req, res);
	} catch (err) {
		sendError(
			400,
			"task can't be deleted",
			err.errors.taskName.message,
			req,
			res
		);
	}
};
module.exports = {
	getTasks,
	addTasks,
	updateTasks,
	getTaskById,
	deleteTaskById,
};
