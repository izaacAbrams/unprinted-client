import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";

class AddSection extends Component {
	static contextType = UnprintedContext;

	handleSubmit(e) {
		e.preventDefault();
		const newSection = {
			section: document.getElementById("AddSection__section").value,
			content: document.getElementById("AddSection__content").value,
		};
		this.context.addSection(newSection, this.props.match.params.book_id);
		this.props.history.push("/my-books");
	}

	render() {
		return (
			<form onSubmit={(e) => this.handleSubmit(e)} className="AddSection">
				<label htmlFor="AddSection__section">Section:</label>
				<input type="text" id="AddSection__section" />
				<label htmlFor="AddSection__content">Content:</label>
				<textarea id="AddSection__content"></textarea>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default AddSection;
