import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home-page.css";


export default function HomePage() {
    const navigate = useNavigate();

    function getCookie() {
        var cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            if(cookies.at(i).includes("sessionId")) {
                return;
            }
        }
        navigate("/login");
    }

    useEffect(() => {
        getCookie();
    }, []);
    
    return(
        <>
            <div id="about">
                <a name="about">
                    <div className="about-section-one-wrapper">
                    <div className="text-wrapper">
                        <div className="heading-text-wrapper">
                            <h1 className="heading-text">
                                THE PREMIER GAME DEVELOPMENT CLUB AT THE GUC
                            </h1>
                        </div>
                        <div className="paragraph-text-wrapper">
                            <p className="paragraph-text">
                                Want to start yout game development journey ?
                                Our community of passionate students will
                                provide you with the tools and support you need
                                to bring your game ideas to life.
                            </p>
                            <p className="paragraph-text">
                                With workshops, projects, and events
                                throughout the year, VGS is the perfect place to
                                hone your skills and make lasting connections 
                                in the gaming industry.
                            </p>
                            <p className="paragraph-text">
                                Don't miss out on this exciting opportunity to level
                                up your game development skills!
                            </p>
                        </div>
                    </div>
                    <div className="logos-section">
                        <img className="vgs-logo" src="/Vertical_ColorWhite.svg" />
                    </div>
                    </div>
                </a>
            </div>
            <div className="triangle"></div>
            <div className="about-section-two-wrapper">

            </div>
        </>
    )
}