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
                                Want to start yout game development journey?
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
                    <h1 className="history-heading-text">OUR HISTORY</h1>
                    <div className="history-div">
                        <p className="history-paragraph-text">
                            A group of enthusiastic students formed Vector game
                            Studio (VGS) in 2018-2019 to pursue their shared
                            interest in video game development. Unfortunatley,
                            the club was unable to continue beyond its first year
                            due to COVID-19 and the graduation of its core members.
                            In 2021-2022, a group of friends united to reopen VGS
                            after it was officialy closed, and the club's closure
                            allowed them to focus on their repair work with confidence.
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
                <h1 className="our-committees-header-text"> OUR COMMITTEES</h1>
            </div>
            <div className="committee-section">
                <div className="committee-wrapper">
                    <h1 className="committee-name" style={{fontSize: 48}}>GAD</h1>
                    <div className="committee-box">
                        <h1 className="header-text">Game Art Design</h1>
                        <div>
                            <p className="description-text">
                              A beginner-friendly course that teaches students how to
                              create game-ready assets using Adobe Photoshop and
                              Illustrator. These assets can be used in multiple scenarios
                              such as  creating characters, environments, and game objects
                              for game-world building and storytelling.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="committee-wrapper">
                    <h1 className="committee-name" style={{fontSize: 48}}>GDD</h1>
                    <div className="committee-box">
                        <h1 className="header-text" style={{fontSize: 28, color:"#cd1a4f"}}>Game Development Design</h1>
                        <div>
                            <p className="description-text" style={{fontSize:"14px"}}>
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
            <div className="committee-section-mobile">
                <div className="committee-wrapper-mobile">
                    <h1 className="committee-name" style={{fontSize: 48}}>GAD</h1>
                    <div className="committee-box">
                        <h1 className="header-text">Game Art Design</h1>
                        <div>
                            <p className="description-text">
                              A beginner-friendly course that teaches students how to
                              create game-ready assets using Adobe Photoshop and
                              Illustrator. These assets can be used in multiple scenarios
                              such as  creating characters, environments, and game objects
                              for game-world building and storytelling.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="committee-wrapper-mobile">
                    <h1 className="committee-name" style={{fontSize: 48}}>GDD</h1>
                    <div className="committee-box">
                        <h1 className="header-text" style={{fontSize: 28, color:"#cd1a4f"}}>Game Development Design</h1>
                        <div>
                            <p className="description-text" style={{fontSize:"14px"}}>
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
                <div className="committee-wrapper-mobile">
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
                        <h1 style={{fontSize:62, color:"white", fontFamily:"sen", fontWeight:900, marginLeft:"25px"}}>MEET VGS' 2025 MENTORS</h1>
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
                                <>
                                    <div className="mentor-images-wrapper">
                                        <div className="single-mentor-image-wrapper">
                                            <h1 className="mentor-name">Khaled Korayem</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                        <div className="single-mentor-image-wrapper">
                                            <h1 className="mentor-name">Rahma Ahmed</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                        <div className="single-mentor-image-wrapper">
                                            <h1 className="mentor-name">Mohamed Zahran</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                    </div>
                                    <div className="mentor-images-wrapper-mobile">
                                        <div className="single-mentor-image-wrapper-mobile" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                            <h1 className="mentor-name">Khaled Korayem</h1>
                                            <img src="/images/placeholder.png" className="mentor-image-mobile" />
                                        </div>
                                        <div className="single-mentor-image-wrapper-mobile">
                                            <h1 className="mentor-name">Rahma Ahmed</h1>
                                            <img src="/images/placeholder.png" className="mentor-image-mobile" />
                                        </div>
                                        <div className="single-mentor-image-wrapper-mobile" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                            <h1 className="mentor-name">Mohamed Zahran</h1>
                                            <img src="/images/placeholder.png" className="mentor-image-mobile" />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            selectedCommittee === 1 && (
                                <>
                                    <div className="mentor-images-wrapper">
                                        <div className="single-mentor-image-wrapper">
                                            <h1 className="mentor-name">Ali-Eldin</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                        <div className="single-mentor-image-wrapper">
                                            <h1 className="mentor-name">Youssef Alaa</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                    </div>
                                    <div className="mentor-images-wrapper-mobile">
                                        <div className="single-mentor-image-wrapper-mobile">
                                            <h1 className="mentor-name">Ali-Eldin</h1>
                                            <img src="/images/placeholder.png" className="mentor-image-mobile" />
                                        </div>
                                        <div className="single-mentor-image-wrapper-mobile">
                                            <h1 className="mentor-name">Youssef Alaa</h1>
                                            <img src="/images/placeholder.png" className="mentor-image-mobile" />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                         {
                            selectedCommittee === 2 && (
                                <>
                                    <div className="mentor-images-wrapper">
                                        <div className="single-mentor-image-wrapper">
                                            <h1 className="mentor-name">Ahmed Wael</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                        <div className="single-mentor-image-wrapper">
                                            <h1 className="mentor-name">Hassan Ibrahim</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                        <div className="single-mentor-image-wrapper">
                                            <h1 className="mentor-name">Yomna Ismail</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                    </div>
                                    <div className="mentor-images-wrapper-mobile">
                                        <div className="single-mentor-image-wrapper-mobile">
                                            <h1 className="mentor-name">Ahmed Wael</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                        <div className="single-mentor-image-wrapper-mobile">
                                            <h1 className="mentor-name">Hassan Ibrahim</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                        <div className="single-mentor-image-wrapper-mobile">
                                            <h1 className="mentor-name">Yomna Ismail</h1>
                                            <img src="/images/placeholder.png" className="mentor-image" />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <div id="games" className="game-jam-section">
                <div className="game-jam-text-wrapper">
                    <h1 style={{color:"white", fontFamily:"sen", fontWeight:900, fontSize:62}}>GAME JAM</h1>
                    <div className="game-jam-div">
                        <h3 style={{color:"white", fontFamily:"sen", fontWeight:400, fontSize:24}}>
                            The VGS game jam borrows its original scheme from 
                            the idea of a game jam, where all club members are
                            brought together, grouped into teams, and are prompted
                            to create a fully functional game in under 72 hours.
                            The elongated time period respects the fact that most of them are beginner
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
            <div className="footer-section">
                <div className="games-section">  
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center", gap:"10px", padding:"0px"}}>
                        <div style={{backgroundColor:"white", height:"80px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <h1 className="footer-text" style={{color:"#cd1a4f"}}>
                                PLAY SOME OF 
                            </h1>
                        </div>
                        <div style={{backgroundColor:"white", display:"flex", height: "80px", justifyContent:"center", alignItems:"center"}}>
                            <h1 className="footer-text" style={{color:"#cd1a4f"}}>
                                OUR STUDENTS' 
                            </h1>
                        </div>
                        <div style={{backgroundColor:"white", display:"flex", height:"80px", justifyContent:"center", alignItems:"center"}}>
                            <h1 className="footer-text" style={{color:"#cd1a4f"}}>
                                CREATIONS
                            </h1>
                        </div>
                    </div>
                    <div className="games-button-wrapper" onClick={() => navigate("/games")}>
                        <h3 style={{fontFamily:"sen", fontWeight:400, color:"white"}}>PLAY GAMES</h3>
                    </div>             
                </div>
                {/* cms section bs mkasel a8ayar ay 7aga feeha*/}
                {/* <div id="cms" className="games-section">  
                    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center", gap:"10px", padding:"0px"}}>
                        <div style={{backgroundColor:"white", height:"80px", display:"flex", justifyContent:"center", alignItems:"center", padding:"0px 15px"}}>
                            <h1 className="footer-text" style={{color:"#33C4B1"}}>
                                CHECK OUT
                            </h1>
                        </div>
                        <div style={{backgroundColor:"white", display:"flex", height: "80px", justifyContent:"center", alignItems:"center", padding:"0px 15px"}}>
                            <h1 className="footer-text" style={{color:"#33C4B1"}}>
                                THE CONTENT
                            </h1>
                        </div>
                        <div style={{backgroundColor:"white", display:"flex", height:"80px", justifyContent:"center", alignItems:"center", padding:"0px 15px"}}>
                            <h1 className="footer-text" style={{color:"#33C4B1"}}>
                                ON OUR CMS
                            </h1>
                        </div>
                    </div>
                    <div className="cms-button-wrapper" onClick={() => navigate("/cms")}>
                        <h3 style={{fontFamily:"sen", fontWeight:400, color:"white"}}>EXPLORE CMS</h3>
                    </div>             
                </div> */}
            </div>
            <div id="contact" className="contacts-wrapper" style={{marginTop:"50px" ,height:"100px", backgroundColor:"#cd1a4f"}}>
                    <a href="https://www.facebook.com/vgsguc/"><svg className="contact-logo" style={{opacity:"1"}} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="500px" height="500px">    <path fill="#ffffff" d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"/></svg></a>
                    <a href="https://www.instagram.com/vgsguc/"><svg className="contact-logo" style={{opacity:"1"}} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="500px" height="500px">    <path fill="#ffffff" d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"/></svg></a>
                    <a href="mailto:vectorgamestudio2023@gmail.com"><svg className="contact-logo" style={{opacity:"1"}} xmlns="http://www.w3.org/2000/svg" width="514" height="362" viewBox="0 0 514 362"><path id="Mail" fill="#ffffff" d="M29,4c3.279-.311,9.544-1.273,12-3H437c17.608,0,36.737-.932,49,4-0.333.333-199,200-212,213-4.6,4.593-9.93,13.372-22,10-8.113-2.267-13.608-11.608-19-17C219.335,197.335,28.667,4.333,29,4ZM159,182L5,27c-5.268,22.7-4,56.326-4,85V255c0,18.89-4.018,67.657,4,78C5,333.667,159,182,159,182ZM509,27c0.76,4.886,4,4.9,4,14V260c0,17.245,3.393,69.459-6,75-37.33-37.663-152-155-152-155S508.333,27,509,27ZM180,203c6.121,2.239,9.74,8.74,14,13,17.894,17.894,44.695,55.326,83,39,13.118-5.591,33.465-29.466,44-40,4.006-4.006,7.207-9.887,13-12l90,90c14.833,14.833,29.167,30.167,44,45l18,18-1,1c-6.289,4.863-19.015,4-30,4H61c-11.508,0-25.4,1.118-32-4l-1-1,18-18c14.833-14.833,29.167-30.167,44-45Z"/></svg></a>
            </div>
        </>
    )
}