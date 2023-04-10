import { React, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Portofolio from "./pages/Portofolio";
import GamesPage from "./pages/GamesPage";
import CmsPage from "./pages/CmsPage";
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import AdminPage from "./pages/AdminPage";

export default function App({ showCms }) {
  const [loggedIn, setLoggedIn] = useState(false);

  function getCookie() {
    var cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        if(cookies.at(i).includes("sessionId")) {
            setLoggedIn(true);
            return;
        }
    }
}

  useEffect(() => {
      getCookie();
  }, []);

  return (
    <CookiesProvider>
      <Router>
        <Navbar showCms={loggedIn} />
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/cms" element={<CmsPage />} />
          <Route path="/portofolio" element={<Portofolio />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}
