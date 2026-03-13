import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/Category/CategoryPage";
import PersonPage from "./pages/Person/PersonPage";
import TransactionPage from "./pages/Transaction/TransactionPage";
import ReportPage from "./pages/Report/ReportPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/persons" element={<PersonPage />} />
                <Route path="/transactions" element={<TransactionPage />} />
                <Route path="/reports" element={<ReportPage />} />
                <Route path="/" element={<PersonPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;