import process from "process";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import "./global-styles.scss";

const isDevelopment: boolean =
	!process.env.NODE_ENV || process.env.NODE_ENV === "development";
if (isDevelopment) {
	console.warn("remember to remove my phone number from my resume");
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
