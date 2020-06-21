import config from "../config";

const ImageApiService = {
	postImage(imageData) {
		let headers = new Headers();
		headers.append("api_key", config.REACT_APP_IMG_API_KEY);
		headers.append("api_secret", config.REACT_APP_IMG_API_SECRET);
		headers.append("Content-type", "application/x-www-form-urlencoded");

		let formData = new FormData();
		formData.append("file", imageData);
		formData.append("upload_preset", config.REACT_APP_IMG_UPLOAD_PRESET);
		const requestOptions = {
			method: "POST",
			headers: headers,
			body: formData,
		};
		return fetch(config.REACT_APP_IMG_API_ENDPOINT, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	},
	getImageData(result) {
		return result;
	},
};

export default ImageApiService;
