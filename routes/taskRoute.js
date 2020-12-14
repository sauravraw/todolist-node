const router = require("express").Router();

const {
	getTasks,
	addTasks,
	updateTasks,
	getTaskById,
	deleteTaskById,
} = require("../controllers/taskController.js");

router.route("/tasks").get(getTasks).post(addTasks);

router
	.route("/tasks/:taskId")
	.get(getTaskById)
	.put(updateTasks)
	.delete(deleteTaskById);
module.exports = router;
