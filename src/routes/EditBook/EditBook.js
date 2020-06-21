import React, { Component } from "react";
import UnprintedContext from "../../context/UnprintedContext";

class EditBook extends Component {
	static contextType = UnprintedContext;

	render() {
		const current = this.props.match.params.book_id;
		const currentBook = this.context.getCurrentBook(
			this.props.match.params.book_id
		);
		console.log(this.props.match.params.section);
		const bookSection = this.context.library[current] ? (
			<div className="EditBook__section">
				<h1>{currentBook.title}</h1>
				<p>
					{currentBook.content[this.props.match.params.section - 1].content}
				</p>
			</div>
		) : (
			<></>
		);
		return <div className="EditBook">{bookSection}</div>;
	}
}

export default EditBook;
