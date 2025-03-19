import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import OnBoarding from "./on-boarding/OnBoarding";
import Maps from "./maps/Maps";
import Layout from "./Layout";
import Map from "./maps/map/Map";

const rootEl = document.getElementById("root");

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />}>
			<Route index element={<App />} />
			<Route path="on-boarding" element={<OnBoarding />} />
			<Route path="maps" element={<Maps />} />
			<Route path="maps/:department" element={<Map />} />
		</Route>,
	),
);

if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>,
	);
}
