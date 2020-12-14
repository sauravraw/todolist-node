const router = require("express").Router();
const { signUpUser } = require("../controllers/userController.js");

router.route("/signup").post(signUpUser);

module.exports = router;
