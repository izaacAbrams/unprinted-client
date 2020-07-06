import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App from "../App/App";
import { BrowserRouter } from "react-router-dom";
import BookReader from "../routes/Bookreader/BookReader";

describe("bookreader component", () => {
	it("renders reader page", () => {
		const div = document.createElement("div");

		ReactDOM.render(
			<BrowserRouter>
				<App>
					<BookReader />
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
						<BookReader />
					</App>
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
