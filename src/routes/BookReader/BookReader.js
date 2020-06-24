import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";
import ReactMarkdown from "react-markdown";
import "./BookReader.css";

class BookReader extends Component {
	static contextType = UnprintedContext;

	state = {
		currentPage: 0,
	};

	handleNext(e) {
		e.preventDefault();
		this.setState({ currentPage: this.state.currentPage + 1 });
	}
	handleBack(e) {
		e.preventDefault();
		this.setState({ currentPage: this.state.currentPage - 1 });
	}
	handleFinish(e) {
		e.preventDefault();
		this.props.history.push("/book-list");
	}
	renderPages(current) {
		if (this.state.currentPage > 0) {
			return (
				<div className="BookReader__chapter">
					<h1>Chapter {current.content[this.state.currentPage - 1].section}</h1>
					<ReactMarkdown
						className="BookReader__chapter_content"
						source={current.content[this.state.currentPage - 1].content}
					/>
				</div>
			);
		}
	}
	renderButtons(current) {
		if (this.state.currentPage === 0) {
			return (
				<button
					className="BookReader__nextBtn"
					onClick={(e) => this.handleNext(e)}
				>
					Next
				</button>
			);
		} else if (current.content[this.state.currentPage] === undefined) {
			return (
				<div className="BookReader__btnGroup">
					<button onClick={(e) => this.handleBack(e)}>Back</button>
					<button onClick={(e) => this.handleFinish(e)}>Finish</button>
				</div>
			);
		} else {
			return (
				<div className="BookReader__btnGroup">
					<button onClick={(e) => this.handleBack(e)}>Back</button>
					<button onClick={(e) => this.handleNext(e)}>Next</button>
				</div>
			);
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
				{this.renderButtons(currentBook)}
			</div>
		);
	}
}

export default BookReader;
