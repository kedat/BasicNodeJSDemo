import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-yb8l6fr6pu5d8zju.us.auth0.com"
			clientId="VGlFNN7PvkuUfBqPrmz3Y5UxthafpQwb"
			authorizationParams={{
				redirect_uri: "https://basic-node-js-demo-opal.vercel.app/",
			}}
			audience="https://dev-yb8l6fr6pu5d8zju.us.auth0.com/api/v2/"
			scope="openid profile email"
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);
