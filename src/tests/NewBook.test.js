import React from "react";
import ReactDOM from "react-dom";
import NewBook from "../routes/NewBook/NewBook";
import renderer from "react-test-renderer";
import App from "../App/App";
import { BrowserRouter } from "react-router-dom";

describe("newbook component", () => {
	it("renders new book page", () => {
		const div = document.createElement("div");

		ReactDOM.render(
			<BrowserRouter>
				<App>
					<NewBook />
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
						<NewBook />
					</App>
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
