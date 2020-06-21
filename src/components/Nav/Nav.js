import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
	return (
		<div className="Nav">
			<Link to="/">unprinted</Link>
			<Link to="/about">About</Link>
			<Link to="/account">Account</Link>
			{/* make a login/logout for nav here */}
		</div>
	);
}

export default Nav;
