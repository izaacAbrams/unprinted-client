import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";

class BookReader extends Component {
	static contextType = UnprintedContext;

	state = {
		currentPage: 0,
	};

	handleNext(e) {
		e.preventDefault();
		this.setState({ currentPage: this.state.currentPage + 1 });
	}
	renderPages(current) {
		if (this.state.currentPage > 0) {
			return current.content.map((section) => {
				return (
					<div className="BookReader__chapter">
						<h1>Chapter {section.section}</h1>
						<p>{section.content}</p>
					</div>
				);
			});
		}
	}
	render() {
		const currentBook = this.context.getCurrentBook(
			this.props.match.params.book_id
		);
		const titlePage =
			currentBook && this.state.currentPage === 0 ? (
				<div className="BookReader__title">
					<h1>{currentBook.title}</h1>
					<p>{currentBook.author}</p>
					<img
						src={currentBook.cover_img}
						alt={`Cover for ${currentBook.title}`}
					/>
				</div>
			) : (
				<></>
			);
		return (
			<div className="BookReader">
				{titlePage}
				{this.renderPages(currentBook)}
				<button onClick={(e) => this.handleNext(e)}>Next</button>
			</div>
		);
	}
}

export default BookReader;
