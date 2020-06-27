import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";
import MyEditor from "../../components/MyEditor/MyEditor";
import "./EditBook.css";

class EditBook extends Component {
	static contextType = UnprintedContext;

	state = {
		section: this.props.match.params.section,
		content: "",
	};

	handleSubmit(content) {
		const newChapter = {
			section: parseInt(this.state.section),
			content: content,
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
		const currentBook = this.context.getCreatedBook(
			this.props.match.params.book_id
		);

		const currentIndex = this.context.createdLibrary.indexOf(currentBook);
		console.log(currentIndex);
		const bookSection = this.context.createdLibrary[currentIndex] ? (
			<div className="EditBook__section">
				<h1>{currentBook.title}</h1>
				<MyEditor
					handleSubmit={(e) => this.handleSubmit(e)}
					defaultValue={
						currentBook.content.filter(
							(content) =>
								content.section.toString() === this.props.match.params.section
						)[0].content
					}
				/>
			</div>
		) : (
			<></>
		);
		return <div className="EditBook">{bookSection}</div>;
	}
}

export default EditBook;
