import React from "react";
import ReactDOM from "react-dom";
import Nav from "../components/Nav/Nav.js";
import renderer from "react-test-renderer";
import App from "../App/App";
import { BrowserRouter } from "react-router-dom";

describe("nav route", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(
			<BrowserRouter>
				<App>
					<Nav />
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
						<Nav />
					</App>
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
