import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Portofolio from "./pages/Portofolio";
import GamesPage from "./pages/GamesPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portofolio" element={<Portofolio />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
    </Router>
  );
}
