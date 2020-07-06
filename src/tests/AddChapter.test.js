import React from "react";
import ReactDOM from "react-dom";
import AddChapter from "../routes/AddChapter/AddChapter";
import renderer from "react-test-renderer";
import App from "../App/App";
import { BrowserRouter } from "react-router-dom";

describe("addchapter component", () => {
	it("renders add chapter page", () => {
		const div = document.createElement("div");

		ReactDOM.render(
			<BrowserRouter>
				<App>
					<AddChapter />
				</App>
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});
	it("renders the UI as expected", () => {
		const tree = renderer
			.create(
				<BrowserRouter>
					<App>
						<AddChapter />
					</App>
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
