import React from "react";
import ReactDOM from "react-dom";
import BooksList from "../routes/BooksList/BooksList";
import renderer from "react-test-renderer";
import App from "../App/App";
import { BrowserRouter } from "react-router-dom";

describe("books list route", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(
			<BrowserRouter>
				<App>
					<BooksList />
				</App>
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});

	it("renders UI as expected", () => {
		const tree = renderer
			.create(
				<BrowserRouter>
					<App>
						<BooksList />
					</App>
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
