import Dashboard from "./pages/Dashboard";
import FooterNavbar from "./components/FooterNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/customers" element={<Customers />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/settings" element={<Settings />} /> */}
      </Routes>
      <FooterNavbar />
    </Router>
  );
}
export default App;