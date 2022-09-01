//Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Pages
import GoalsGridPage from "../src/Components/Pages/GoalsGridPage/GoalsGridPage";
import GoalsTopologyPage from "./Components/Pages/GoalsTopologyPage/GoalsTopologyPage";
import GoalDetailsPage from "./Components/Pages/GoalDetailsPage/GoalDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/details" element={<GoalDetailsPage />} />
        <Route path="/topology" element={<GoalsTopologyPage />} />
        <Route path="/" element={<GoalsGridPage />} />
      </Routes>
    </Router>
  );
}

export default App;
