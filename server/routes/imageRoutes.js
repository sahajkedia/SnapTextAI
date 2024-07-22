const express = require("express");
const router = express.Router();
const multer = require("multer");
const Tesseract = require("tesseract.js");
const ImageResult = require("../models/ImageResult");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), (req, res) => {
	const { text } = req.body;
	const image = req.file.buffer.toString("base64");

	Tesseract.recognize(Buffer.from(image, "base64"), "eng", {
		logger: (m) => console.log(m),
	})
		.then(({ data: { text: analysisResult } }) => {
			const newImageResult = new ImageResult({ text, image, analysisResult });
			newImageResult
				.save()
				.then((result) => res.json(result))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(500).json("OCR Error: " + err));
});

router.get("/results", (req, res) => {
	ImageResult.find()
		.then((results) => res.json(results))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
