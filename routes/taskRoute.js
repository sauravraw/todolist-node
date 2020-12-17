const router = require("express").Router();

const {
	getTasks,
	addTasks,
	updateTasks,
	getTaskById,
	deleteTaskById,
	deleteByQuery,
} = require("../controllers/taskController.js");

router.route("/tasks").get(getTasks).post(addTasks);

router
	.route("/tasks/:id")
	.get(getTaskById)
	.put(updateTasks)
	.delete(deleteTaskById);

router.route("/tasks").delete(deleteByQuery);
module.exports = router;
