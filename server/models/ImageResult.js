const mongoose = require("mongoose");

const ImageResultSchema = new mongoose.Schema({
	text: { type: String, required: true },
	image: { type: String, required: true },
	analysisResult: { type: String },
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ImageResult", ImageResultSchema);
