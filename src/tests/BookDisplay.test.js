import React from "react";
import ReactDOM from "react-dom";
import BookDisplay from "../routes/BookDisplay/BookDisplay";
import renderer from "react-test-renderer";
import App from "../App/App";
import { BrowserRouter } from "react-router-dom";

describe("bookdisplay component", () => {
	it("renders book display page", () => {
		const div = document.createElement("div");

		ReactDOM.render(
			<BrowserRouter>
				<App>
					<BookDisplay />
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
						<BookDisplay />
					</App>
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
