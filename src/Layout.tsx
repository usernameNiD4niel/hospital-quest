import { Outlet } from "react-router-dom";
import BackgroundAudio from "./components/BackgroundAudio";

function Layout() {
	return (
		<div>
			<BackgroundAudio /> {/* This will keep playing on all pages */}
			<Outlet /> {/* This will render the routed page */}
		</div>
	);
}

export default Layout;
