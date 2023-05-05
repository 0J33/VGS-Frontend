import { useState } from "react";
import "../css/navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({ showCms }) {
    const [activePage, setActivePage] = useState(0);

    const navigate = useNavigate();

    return (
        <div className={showCms ? "navbar" : "navbar-login"}>
            <svg className="vgs-icon" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 522.75 640"><polyline points="522.75 57.38 475.26 96.42 427.77 135.47 380.27 174.18 332.78 213.22 284.95 252.26 284.95 329.68 284.95 407.43 284.61 484.84 332.11 445.79 379.94 407.09 427.43 368.04 474.92 329 474.92 406.41 427.09 445.45 379.6 484.5 332.11 523.54 284.61 562.59 284.27 640 331.77 600.96 379.6 561.91 427.09 523.2 474.58 484.16 522.07 445.11 522.41 367.7 522.41 289.95 522.75 212.54 474.92 251.59 427.43 290.29 379.94 329.34 332.44 368.38 332.44 290.97 380.27 251.93 427.77 212.88 475.26 173.84 522.75 134.79 522.75 57.38"/><polygon points="522.75 0 262.22 213.9 0 0 104.48 0 261.88 128.34 418.27 0 522.75 0"/><polyline points="239.84 252.26 192 213.22 144.17 174.18 96.34 135.47 48.51 96.42 0.68 57.38 0.34 135.13 0.34 212.54 0 289.95 0 367.7 0 445.11 47.83 484.16 95.66 523.2 143.49 561.91 191.32 600.96 239.16 640 239.5 562.59 239.5 484.84 239.84 407.43 191.66 368.38 143.83 329.34 96 290.29 96 368.04 143.83 407.09 191.66 445.79 191.66 523.54 143.49 484.5 95.66 445.45 47.83 406.41 48.17 329 48.17 251.59 48.51 173.84 96.34 212.88 144.17 251.93 192 290.97 239.84 329.68 239.84 252.26"/></svg>
            <div className="nav-items">
                <a className="nav-item-anchor" href="#about" onClick={() => setActivePage(0)}>
                    <div className={activePage === 0 ? 'nav-item-active' : "nav-item"}>
                        <h3 className={activePage === 0 ? 'nav-item-active-text' : "nav-item-text"}>About</h3>
                    </div>
                </a>
                <a className="nav-item-anchor" href="#mentors" onClick={() => setActivePage(3)}>
                    <div className={activePage === 3 ? 'nav-item-active' : "nav-item"}>
                        <h3 className={activePage === 3 ? 'nav-item-active-text' : "nav-item-text"}>Mentors</h3>
                    </div>
                </a>
                <a className="nav-item-anchor" href="#games" onClick={() => setActivePage(1)}>
                    <div className={activePage === 1 ? 'nav-item-active' : "nav-item"}>
                        <h3 className={activePage === 1 ? 'nav-item-active-text' : "nav-item-text"}>Games</h3>
                    </div>
                </a>    
                <a className="nav-item-anchor" href="#cms" onClick={() => setActivePage(2)}>
                    <div className={activePage === 2 ? 'nav-item-active' : "nav-item"}>
                        <h3 className={activePage === 2 ? 'nav-item-active-text' : "nav-item-text"}>CMS</h3>
                    </div>
                </a>        
            </div>
            {
                !showCms && (
                    <div className="login-button" onClick={() => navigate("/login")}>
                        <p>log in</p>
                    </div>
                ) 
            }
        </div>
    )
}
