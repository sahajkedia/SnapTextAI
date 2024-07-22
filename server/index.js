// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const imageRoutes = require("./routes/imageRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/images", imageRoutes);

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		console.log("MongoDB database connection established successfully")
	)
	.catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
