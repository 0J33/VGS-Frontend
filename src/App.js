import { React, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import CmsPage from "./pages/CmsPage";
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import AdminPage from "./pages/AdminPage";

export default function App() {

  const [username , setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  async function checkIsAdmin() {
    const username = sessionStorage.getItem("username");
    if (username === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }

  return (
    <CookiesProvider>
      <Router>
        <Navbar loggedIn={loggedIn} />
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/cms" element={<CmsPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/login" element={<LoginPage 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}
