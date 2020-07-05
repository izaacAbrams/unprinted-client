import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import "./MyEditor.css";

class MyEditor extends Component {
	state = {
		text: this.props.defaultValue,
	};

	handleText(e) {
		this.setState({
			text: e.target.innerText,
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.handleSubmit(this.state.text);
	}

	render() {
		return (
			<form className="MyEditor" onSubmit={(e) => this.handleSubmit(e)}>
				<div
					onKeyUp={(e) => this.handleText(e)}
					className="MyEditor__textarea"
					contentEditable="true"
					suppressContentEditableWarning={true}
				>
					{this.props.defaultValue}
				</div>
				<p className="MyEditor__preview_header">Preview:</p>
				<ReactMarkdown className="MyEditor__preview" source={this.state.text} />
				<p className="MyEditor__p">
					This editor supports markdown, for a general cheatsheet check out{" "}
					<a href="https://commonmark.org/help/" target="#blank">
						this link.
					</a>
				</p>
				<button className="MyEditor__submit" type="submit">
					Submit
				</button>
			</form>
		);
	}
}

export default MyEditor;
