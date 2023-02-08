import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppPage from "./pages/AppPage";
import FAQPage from "./pages/FAQPage";

import "./styling/app.css";

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<AppPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                </Routes>
            </Router>
        </>
    );
}
