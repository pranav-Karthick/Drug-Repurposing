import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Chatbot from "./pages/Chatbot";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/results" element={<Results />} />
                <Route path="/chat" element={<Chatbot />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
