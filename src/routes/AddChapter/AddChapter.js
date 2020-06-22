import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";

class AddChapter extends Component {
	static contextType = UnprintedContext;

	handleSubmit(e) {
		e.preventDefault();
		const newChapter = {
			section: document.getElementById("AddChapter__chapter").value,
			content: document.getElementById("AddChapter__content").value,
		};
		this.context.addSection(newChapter, this.props.match.params.book_id);
		this.props.history.push("/my-books");
	}

	render() {
		return (
			<form onSubmit={(e) => this.handleSubmit(e)} className="AddChapter">
				<label htmlFor="AddChapter__chapter">Chapter:</label>
				<input type="text" id="AddChapter__chapter" />
				<label htmlFor="AddChapter__content">Content:</label>
				<textarea id="AddChapter__content"></textarea>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default AddChapter;
