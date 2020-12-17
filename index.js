const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");
const taskRoute = require("./routes/taskRoute.js");

dotenv.config({
	path: "./config.env",
});

mongoose.connect(
	process.env.DB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	(err, connection) => {
		if (err) {
			console.log("Could not connect to Database.");
		}
		console.log("Connected to database Successfully.");
	}
);

const app = express();
app.use(express.json());

app.use("/todo/users", userRoute);
app.use("/todo", taskRoute);

app.listen(process.env.PORT, () => {
	console.log(`Server running on: ${process.env.PORT}`);
});
