const mongoose = require("mongoose");
const uniqid = require("uniqid");

const taskSchema = new mongoose.Schema({
	taskId: {
		type: String,
		default: uniqid(),
		unique: true,
	},
	taskName: {
		type: String,
		required: [true, "Please input task"], // required in in-build validator
		validate: {
			validator: function () {
				// console.log("this is a task validator");
				return this.taskName.trim().length;
			},
			message: "Task name should not be empty",
		},
		validate: {
			validator: function () {
				let re = /<("[^"]?"|'[^']?'|[^'">])*>/;
				if (re.test(this.taskName)) {
					return false;
				}
			},
			message: "Task content cannot be HTML.",
		},
	},
	status: {
		type: String,
		default: "notStarted",
		enum: ["notStarted", "inProgress", "completed"],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	startedAt: {
		type: Date,
	},
	completedAt: {
		type: Date,
	},
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
