import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";
import "./NewBook.css";
import BookApiService from "../../services/book-api-services";
import TokenService from "../../services/token-service";

class NewBook extends Component {
	static contextType = UnprintedContext;

	state = {
		title: "",
		author: "",
		summary: "",
		cover_img: "",
		price: "",
		created_by: TokenService.readJwtToken().user_id,
		error: null,
	};
	handleSubmit(e) {
		e.preventDefault();
		const { title, author, summary, cover_img, price, created_by } = this.state;
		const newBook = {
			title,
			author,
			summary,
			cover_img,
			content: [],
			price,
			created_by,
		};
		this.context.addBook(newBook);
		BookApiService.postBook(newBook);
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
		this.setState({
			cover_img: file,
		});
	}
	handlePrice(e) {
		if (parseInt(e.target.value) >= 15) {
			this.setState({
				error: "Please enter a price between $1 - $15",
			});
		} else if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 15) {
			this.setState({
				price: parseFloat(e.target.value),
				error: null,
			});
		} else {
			this.setState({
				error: "Please enter a numeric price between $1 and $15",
			});
		}
	}
	render() {
		const error = this.state.error ? (
			<p className="error">{this.state.error}</p>
		) : (
			<></>
		);
		return (
			<form onSubmit={(e) => this.handleSubmit(e)} className="NewBook">
				<label htmlFor="NewBook__title">Title:</label>
				<input
					type="text"
					onChange={(e) => this.handleTitle(e)}
					id="NewBook__title"
					className="NewBook__input"
				/>
				<label htmlFor="NewBook__author">Author:</label>
				<input
					type="text"
					onChange={(e) => this.handleAuthor(e)}
					id="NewBook__author"
					className="NewBook__input"
				/>
				<label htmlFor="NewBook__summary">Summary:</label>
				<input
					type="text"
					onChange={(e) => this.handleSummary(e)}
					id="NewBook__summary"
					className="NewBook__input"
				/>
				<label htmlFor="NewBook__cover_art">Cover Art:</label>
				<input
					type="file"
					accept="image/x-png,image/jpeg"
					onChange={(e) => this.handleFile(e)}
					id="NewBook__cover_art"
					className="NewBook__input"
				/>
				<label htmlFor="NewBook__price">Price:</label>
				<input
					type="text"
					onChange={(e) => this.handlePrice(e)}
					id="NewBook__price"
					className="NewBook__input"
				/>
				<button type="submit" disabled={!!this.state.error}>
					Submit
				</button>
				{error}
			</form>
		);
	}
}

export default NewBook;
