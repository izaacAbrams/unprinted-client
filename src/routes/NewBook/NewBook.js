import React, { Component } from "react";
import "./NewBook.css";

class NewBook extends Component {
	state = {
		title: "",
		author: "",
		summary: "",
		cover_art: "",
	};
	handleSubmit(e) {
		e.preventDefault();
	}
	handleCoverArt(imageData) {
		console.log(imageData);
	}
	handleFile(e) {
		const file = e.target.files[0];
		//creates reader to convert file to base64 encoded code for api upload
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			this.setState({
				cover_art: reader.result,
			});
		};
	}
	render() {
		const image = this.state.cover_art ? (
			<img src={this.state.cover_art} />
		) : (
			<></>
		);
		return (
			<form onSubmit={(e) => this.handleSubmit(e)} className="NewBook">
				<label htmlFor="NewBook__title">Title:</label>
				<input type="text" id="NewBook__title" />
				<label htmlFor="NewBook__author">Author:</label>
				<input type="text" id="NewBook__author" />
				<label htmlFor="NewBook__summary">Description:</label>
				<input type="text" id="NewBook__summary" />
				<label htmlFor="NewBook__cover_art">Cover Art:</label>
				<input
					type="file"
					accept="image/x-png,image/jpeg"
					onChange={(e) => this.handleFile(e)}
					id="NewBook__cover_art"
				/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default NewBook;
