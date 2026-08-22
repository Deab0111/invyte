import "./App.css";
import { Routes, Route } from "react-router-dom";
import InvytePortal from "./pages/InvytePortal";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<InvytePortal />} />
			</Routes>
		</>
	);
}

export default App;
