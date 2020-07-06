import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";
import MyEditor from "../../components/MyEditor/MyEditor";
import "./AddChapter.css";

class AddChapter extends Component {
	static contextType = UnprintedContext;

	handleSubmit(content) {
		const newChapter = {
			section: document.getElementById("AddChapter__chapter").value,
			content: content,
		};
		this.context.addSection(newChapter, this.props.match.params.book_id);
		this.props.history.push("/my-books");
	}

	render() {
		return (
			<div className="AddChapter">
				<h1 className="AddChapter__title">Add Chapter</h1>
				<div className="AddChapter__chapter">
					<label className="AddChapter__label" htmlFor="AddChapter__chapter">
						Chapter:
					</label>
					<input
						type="text"
						className="AddChapter__input"
						id="AddChapter__chapter"
					/>
				</div>
				<MyEditor handleSubmit={(content) => this.handleSubmit(content)} />
			</div>
		);
	}
}

export default AddChapter;
