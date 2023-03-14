import React from "react";
import Navbar2 from "./components/Navbar2";
import HomePage from "./pages/HomePage";
import Portofolio from "./pages/Portofolio";
import GamesPage from "./pages/GamesPage";
import CmsPage from "./pages/CmsPage";
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { CookiesProvider } from "react-cookie";

export default function App() {
  return (
    <CookiesProvider>
      <Router>
        <Navbar2 />
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/cms" element={<CmsPage />} />
          <Route path="/portofolio" element={<Portofolio />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}
