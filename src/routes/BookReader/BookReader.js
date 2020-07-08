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
					<h1 className="BookReader__chapter_heading">
						Chapter {current.content[this.state.currentPage - 1].section}
					</h1>
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
					<button
						className="BookReader__btnLeft"
						onClick={(e) => this.handleBack(e)}
					>
						&#8249;
					</button>
					<button
						className="BookReader__btnFinish"
						onClick={(e) => this.handleFinish(e)}
					>
						Finish
					</button>
				</div>
			);
		} else {
			return (
				<div className="BookReader__btnGroup">
					<button
						className="BookReader__btnLeft"
						onClick={(e) => this.handleBack(e)}
					>
						&#8249;
					</button>
					<button
						className="BookReader__btnRight"
						onClick={(e) => this.handleNext(e)}
					>
						&#8250;
					</button>
				</div>
			);
		}
	}
	render() {
		let currentBook =
			this.context.ownedLibrary !== null
				? this.context.getOwnedBook(this.props.match.params.book_id)
				: this.context.getCreatedBook(this.props.match.params.book_id);

		const titlePage =
			currentBook && this.state.currentPage === 0 ? (
				<div className="BookReader__title">
					<h1 className="BookReader__heading">{currentBook.title}</h1>
					<p className="BookReader__author">{currentBook.author}</p>
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
				{this.renderButtons(currentBook)}
				{this.renderPages(currentBook)}
			</div>
		);
	}
}

export default BookReader;
