import "./App.css";
import { Routes, Route } from "react-router-dom";
import InvytePortal from "./pages/InvytePortal";
import Profile from "./pages/Profile";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<InvytePortal />} />
				<Route path="/:UserId/profile" element={<Profile />} />
			</Routes>
		</>
	);
}

export default App;
