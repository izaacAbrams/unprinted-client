import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";
import { v4 as uuidv4 } from "uuid";
import "./NewBook.css";

class NewBook extends Component {
	static contextType = UnprintedContext;

	state = {
		id: uuidv4(),
		title: "",
		author: "",
		summary: "",
		cover_img: "",
	};
	handleSubmit(e) {
		e.preventDefault();
		const { id, title, author, summary, cover_img } = this.state;
		const newBook = {
			id,
			title,
			author,
			summary,
			cover_img,
		};
		this.context.addBook(newBook);
		this.props.history.push("/book-list");
	}
	handleTitle(e) {
		this.setState({
			title: e.target.value,
		});
	}
	handleAuthor(e) {
		this.setState({
			author: e.target.value,
		});
	}
	handleSummary(e) {
		this.setState({
			summary: e.target.value,
		});
	}
	handleFile(e) {
		const file = e.target.files[0];
		//creates reader to convert file to base64 encoded code for api upload
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			this.setState({
				cover_img: reader.result,
			});
		};
	}
	render() {
		return (
			<form onSubmit={(e) => this.handleSubmit(e)} className="NewBook">
				<label htmlFor="NewBook__title">Title:</label>
				<input
					type="text"
					onChange={(e) => this.handleTitle(e)}
					id="NewBook__title"
				/>
				<label htmlFor="NewBook__author">Author:</label>
				<input
					type="text"
					onChange={(e) => this.handleAuthor(e)}
					id="NewBook__author"
				/>
				<label htmlFor="NewBook__summary">Summary:</label>
				<input
					type="text"
					onChange={(e) => this.handleSummary(e)}
					id="NewBook__summary"
				/>
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
