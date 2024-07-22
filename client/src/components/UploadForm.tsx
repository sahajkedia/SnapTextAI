// src/components/UploadForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const UploadForm: React.FC = () => {
	const [text, setText] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [result, setResult] = useState("");

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		if (image) {
			formData.append("image", image);
		}
		formData.append("text", text);

		try {
			const response = await axios.post(
				"http://localhost:5000/api/images/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			setResult(response.data.analysisResult);
		} catch (error) {
			console.error("There was an error uploading the file!", error);
		}
	};

	return (
		<div>
			<h1>SnapText AI</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Text:</label>
					<input
						type="text"
						value={text}
						onChange={handleTextChange}
					/>
				</div>
				<div>
					<label>Image:</label>
					<input
						type="file"
						onChange={handleImageChange}
					/>
				</div>
				<button type="submit">Upload</button>
			</form>
			{result && (
				<div>
					<h2>Analysis Result</h2>
					<p>{result}</p>
				</div>
			)}
		</div>
	);
};

export default UploadForm;
