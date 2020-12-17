const mongoose = require("mongoose");
const Task = require("../models/taskSchema.js");
const sendResponse = require("../helpers/sendResponse.js");
const AppError = require("../helpers/appError.js");
const sendError = require("../helpers/sendError");

const getTasks = async (req, res) => {
	if (req.query) {
		let findTask = await Task.find(req.query);
		if (findTask < 1) {
			sendError(
				404,
				"Unsuccessful",
				"Task not found try with another query",
				req,
				res
			);
		} else {
			sendResponse(200, "Successful", findTask, req, res);
		}
	} else {
		const allTasks = await Task.find();
		sendResponse(200, "Successful", allTasks, req, res);
	}
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
	const { id } = req.params;

	try {
		let task = await Task.find({ taskId: id });
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
	const { id } = req.params;

	const re = /<("[^"]?"|'[^']?'|[^'">])*>/;

	if (re.test(req.body.taskName)) {
		sendError(400, "unsuccessful", "Taskname cannot be HTML", req, res);
	} else {
		try {
			let task = await Task.updateOne(
				{ taskId: id },
				{ $set: { taskName: req.body.taskName } },
				{ runValidators: true }
			);
			sendResponse(200, "Success", task, req, res);
		} catch (err) {
			sendError(400, "Cannot update task by given id", err, req, res);
		}
	}
};

const deleteTaskById = async (req, res) => {
	try {
		let deletedTask = await Task.deleteOne({ taskId: id });
		sendResponse(200, "Task Deleted Successfully", deletedTask, req, res);
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

const deleteByQuery = async (req, res) => {
	if (req.query) {
		let deletedTask = await Task.deleteMany(req.query);
		sendResponse(
			200,
			"Task Deleted Successfully by Query Parameter",
			deletedTask,
			req,
			res
		);
	} else {
		sendError(404, "Unsuccessful", "Task cannot be deleted", req, res);
	}
};
module.exports = {
	getTasks,
	addTasks,
	updateTasks,
	getTaskById,
	deleteTaskById,
	deleteByQuery,
};
