import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";

class EditBook extends Component {
	static contextType = UnprintedContext;

	state = {
		section: this.props.match.params.section,
		content: "",
	};

	handleSubmit(e) {
		e.preventDefault();
		const newChapter = {
			section: parseInt(this.state.section),
			content: this.state.content,
		};
		const book_id = this.props.match.params.book_id;
		const chapter = this.props.match.params.section;
		this.context.editChapter(book_id, chapter, newChapter);
		this.props.history.push("/my-books");
	}
	handleText(e) {
		this.setState({
			content: e.target.value,
		});
	}

	render() {
		const currentBook = this.context.getCurrentBook(
			this.props.match.params.book_id
		);

		const currentIndex = this.context.library.indexOf(currentBook);
		const bookSection = this.context.library[currentIndex] ? (
			<div className="EditBook__section">
				<h1>{currentBook.title}</h1>
				<textarea
					defaultValue={
						currentBook.content.filter(
							(content) =>
								content.section.toString() === this.props.match.params.section
						)[0].content
					}
					onChange={(e) => this.handleText(e)}
				/>
			</div>
		) : (
			<></>
		);
		return (
			<form onSubmit={(e) => this.handleSubmit(e)} className="EditBook">
				{bookSection}
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default EditBook;
