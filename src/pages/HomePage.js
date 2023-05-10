import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home-page.css";


export default function HomePage() {
    const navigate = useNavigate();

    const [selectedCommittee, setSelectedCommittee] = useState(0);
    
    return(
        <>
            <div id="about">
                <a name="about">
                    <div className="about-section-wrapper">
                    <div className="text-wrapper">
                        <div className="heading-text-wrapper">
                            <h1 className="heading-text">
                                THE PREMIER GAME DEVELOPMENT CLUB AT THE GUC
                            </h1>
                        </div>
                        <div className="paragraph-text-wrapper">
                            <p className="paragraph-text" style={{fontSize:18}}>
                                Want to start yout game development journey ?
                                Our community of passionate students will
                                provide you with the tools and support you need
                                to bring your game ideas to life.
                            </p>
                            <p className="paragraph-text" style={{fontSize:18}}>
                                With workshops, projects, and events
                                throughout the year, VGS is the perfect place to
                                hone your skills and make lasting connections 
                                in the gaming industry.
                            </p>
                            <p className="paragraph-text" style={{fontSize:18}}>
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
            <div className="history-section-wrapper">
                <div className="history-heading-text-wrapper">
                    <h1 className="history-heading-text" style={{fontSize: 48}}>OUR HISTORY</h1>
                    <div style={{width: 540, fontFamily: 'sen', fontWeight: 400, fontSize: 24}}>
                        <p className="history-paragraph-text">
                            A group of enthusiastic students formed Vector game
                            Studio (VGS) in 2018-2019 to pursue their shared
                            interest in video game development. Unfortunatley,
                            the club was unable to continue beyond its first year
                            due to COVID-19 and the graduation of its core members.
                            In 2021-2022, a group of freinds united to reopen VGS
                            after it was officialy closed, and the club's closure
                            allowd them to focus on their repair work with confidence.
                        </p>
                    </div>
                </div>
                <div className="history-images-wrapper">
                    <img className="history-image-one" src="images/img-01.png" />
                    <img className="history-image-two" src="images/img-02.png" />
                    <img className="history-image-three" src="images/old-vgs.jpeg" />
                </div>
            </div>
            <div className="main-color-rectangle"></div>
            <div className="our-committees-box">
                <h1 className="our-committees-header-text" style={{fontSize: 48}}> OUR COMMITTEES</h1>
            </div>
            <div className="committee-section">
                <div className="committee-wrapper">
                    <h1 className="committee-name" style={{fontSize: 48}}>GSD</h1>
                    <div className="committee-box">
                        <h1 className="header-text">Game Art Design</h1>
                        <div>
                            <p className="description-text">
                              A beginner-friendly course that teaches students how to
                              create game-ready assets using Adobe Photoshop and
                              Illustrator. These assets can be used in multiple scenarios
                              such as  creating characters, environments, and game objects
                              fot game-world building and storytelling.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="committee-wrapper">
                    <h1 className="committee-name" style={{fontSize: 48}}>GDD</h1>
                    <div className="committee-box">
                        <h1 className="header-text" style={{fontSize: 28, color:"#cd1a4f"}}>Game Development Design</h1>
                        <div>
                            <p className="description-text">
                              A beginner-friendly course to teach students game
                              development using mainstream industry tools, such as
                              Unity and Microsoft Visual Studio. It teaches people
                              to write scripts, edit them, and compile them using
                              Unity editor to create fully functional and publish-ready
                              games.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="committee-wrapper">
                    <h1 className="committee-name" style={{fontSize: 48}}>GSD</h1>
                    <div className="committee-box">
                        <h1 className="header-text" style={{fontSize: 28, color:"black"}}>Game Soundtrack Design</h1>
                        <div>
                            <p className="description-text">
                              A beginner-friendly course that teaches students the
                              basics of game soundtrack creation using FL Studio.
                              Students are taught a set of skills that will help them
                              create professional game-ready soundtracks for any genre of games.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="mentors" className="mentors-section">
                <div className="mentors-wrapper">
                    <div className="mentors-inner-wrapper">
                        <h1 style={{fontSize:62, color:"white", fontFamily:"sen", fontWeight:900}}>MEET VGS' 2023 MENTORS</h1>
                        <div className="committee-selection-box">
                            <div className={selectedCommittee === 0 ? "selected-committee-button-wrapper": "committee-button-wrapper"}
                                onClick={() => setSelectedCommittee(0)}
                            >
                                <p style={{color:"black", fontFamily:"sen", fontWeight:900}}>GDD</p>
                            </div>
                            <div className={selectedCommittee === 1 ? "selected-committee-button-wrapper": "committee-button-wrapper"}
                                onClick={() => setSelectedCommittee(1)}
                            >
                                <p style={{color:"black", fontFamily:"sen", fontWeight:900}}>GAD</p>
                            </div>
                            <div className={selectedCommittee === 2 ? "selected-committee-button-wrapper": "committee-button-wrapper"}
                                onClick={() => setSelectedCommittee(2)}
                            >
                                <p style={{color:"black", fontFamily:"sen", fontWeight:900}}>GSD</p>
                            </div>
                        </div>
                        {
                            selectedCommittee === 0 && (
                                <div className="mentor-images-wrapper">
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Youssef El Sharkawy</h1>
                                        <img src="/mentors-images/gdd/YoussefElSharkawy.jpg" className="mentor-image" />
                                    </div>
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Farah Ahmed</h1>
                                        <img src="/mentors-images/gdd/FarahAhmed.jpg" className="mentor-image" />
                                    </div>
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Youssef Korayem</h1>
                                        <img src="/mentors-images/gdd/YoussefKorayem.jpg" className="mentor-image" />
                                    </div>
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Ziad Alaa</h1>
                                        <img src="/mentors-images/gdd/ZiadAlaa.jpg" className="mentor-image" />
                                    </div>
                                </div>
                            )
                        }
                        {
                            selectedCommittee === 1 && (
                                <div className="mentor-images-wrapper">
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Mariam Tamer</h1>
                                        <img src="/mentors-images/gad/MariamTamer.jpg" className="mentor-image" />
                                    </div>
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Nada Tamer</h1>
                                        <img src="/mentors-images/gad/NadaTamer.jpg" className="mentor-image" />
                                    </div>
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Yara El Tantawy</h1>
                                        <img src="/mentors-images/gad/YaraElTantawy.jpg" className="mentor-image" />
                                    </div>
                                </div>
                            )
                        }
                         {
                            selectedCommittee === 2 && (
                                <div className="mentor-images-wrapper">
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Ibrahim Amr</h1>
                                        <img src="/mentors-images/gsd/IbrahimAmr.jpg" className="mentor-image" />
                                    </div>
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Omar Yasser</h1>
                                        <img src="/mentors-images/gsd/OmarYasser.jpg" className="mentor-image" />
                                    </div>
                                    <div className="single-mentor-image-wrapper">
                                        <h1 className="mentor-name">Ziad El Gendi</h1>
                                        <img src="/mentors-images/gsd/ZiadElGendi.jpg" className="mentor-image" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div id="games" className="game-jam-section">
                <div className="game-jam-text-wrapper">
                    <h1 style={{color:"white", fontFamily:"sen", fontWeight:900, fontSize:62}}>GAME JAM</h1>
                    <div style={{width: 500}}>
                        <h3 style={{color:"white", fontFamily:"sen", fontWeight:400, fontSize:24}}>
                            The VGS game jam borrows its original scheme from 
                            the idea of a game jam, where all club members are
                            brought together, grouped into teams, and are prompted
                            to create a fully functional game in under 72 hours.
                            The elongated time period respects the fact that most ofthem are beginner
                            game developers.
                        </h3>
                    </div>
                </div>
                <div className="game-jam-image-wrapper">
                    <img src="/images/game-jam-img.png" className="game-jam-img" />
                    <div className="white-box"></div>
                    <div className="black-box"></div>
                </div>
            </div>
            <div className="footer-section" style={{display:"flex", justifyContent:"center", maxHeight:"500px"}}>
                <div className="games-section" style={{display:"flex", flexDirection:"column", maxWidth:"600px", paddingRight:"50px"}}>  
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center", gap:"10px", padding:"0px"}}>
                        <div style={{backgroundColor:"white", height:"80px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <h1 style={{color:"#cd1a4f", fontFamily:"sen", fontSize:62, fontWeight:900, backgroundColor:"white", padding:"0px 15px"}}>
                                PLAY SOME OF 
                            </h1>
                        </div>
                        <div style={{backgroundColor:"white", display:"flex", height: "80px", justifyContent:"center", alignItems:"center"}}>
                            <h1 style={{color:"#cd1a4f", fontFamily:"sen", fontSize:62, fontWeight:900, padding:"0px 15px"}}>
                                OUR STUDENTS' 
                            </h1>
                        </div>
                        <div style={{backgroundColor:"white", display:"flex", height:"80px", justifyContent:"center", alignItems:"center"}}>
                            <h1 style={{color:"#cd1a4f", fontFamily:"sen", fontSize:62, fontWeight:900, padding:"0px 15px"}}>
                                CREATIONS
                            </h1>
                        </div>
                    </div>
                    <div className="games-button-wrapper" onClick={() => navigate("/games")}>
                        <h3 style={{fontFamily:"sen", fontWeight:400, color:"white"}}>PLAY GAMES</h3>
                    </div>             
                </div>
                {/* cms section bs mkasel a8ayar ay 7aga feeha*/}
                <div id="cms" className="games-section" style={{display:"flex", flexDirection:"column", maxWidth:"600px", paddingLeft:"50px"}}>  
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center", gap:"10px", padding:"0px"}}>
                        <div style={{backgroundColor:"white", height:"80px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <h1 style={{color:"#33B4C1", fontFamily:"sen", fontSize:60, fontWeight:900, backgroundColor:"white", padding:"0px 15px"}}>
                                JOIN OUR CLUB
                            </h1>
                        </div>
                        <div style={{backgroundColor:"white", display:"flex", height: "80px", justifyContent:"center", alignItems:"center", padding:"0px 15px"}}>
                            <h1 style={{color:"#33B4C1", fontFamily:"sen", fontSize:60, fontWeight:900}}>
                                TO GAIN ACCESS
                            </h1>
                        </div>
                        <div style={{backgroundColor:"white", display:"flex", height:"80px", justifyContent:"center", alignItems:"center", padding:"0px 15px"}}>
                            <h1 style={{color:"#33B4C1", fontFamily:"sen", fontSize:60, fontWeight:900}}>
                                TO THE CMS
                            </h1>
                        </div>
                    </div>
                    <div className="cms-button-wrapper" onClick={() => navigate("/cms")}>
                        <h3 style={{fontFamily:"sen", fontWeight:400, color:"white"}}>EXPLORE CMS</h3>
                    </div>             
                </div>
            </div>
        </>
    )
}