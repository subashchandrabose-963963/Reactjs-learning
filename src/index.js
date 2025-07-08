import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import CrudPage from "./pages/CrudPage";
import './index.css'; // Importing Tailwind CSS

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/crud" element={<CrudPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

