import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "../routes/LoginPage/LoginPage";
import renderer from "react-test-renderer";
import App from "../App/App";
import { BrowserRouter } from "react-router-dom";

describe("login component", () => {
	it("renders login page", () => {
		const div = document.createElement("div");

		ReactDOM.render(
			<BrowserRouter>
				<App>
					<LoginPage />
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
						<LoginPage />
					</App>
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
