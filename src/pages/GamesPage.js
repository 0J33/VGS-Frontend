import "../css/games-page.css";
import { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function GamePage() {

    const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl:"/games/ghosty2game/Ghosty2.loader.js",
        dataUrl:"/games/ghosty2game/Ghosty2.data",
        frameworkUrl:"/games/ghosty2game/Ghosty2.framework.js",
        codeUrl:"/games/ghosty2game/Ghosty2.wasm"
    });

    const [isGameOn, setIsGameOn] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    return (
        <div className="games-page-body">  
            {
                isMobile ? (<h1 style={{color:"white", fontFamily:"sen", marginTop:"10%"}}> Cannot Play On Mobile</h1>) :

                isGameOn ?  (
                <div className="game-section-active">
                    <h1 className="game-name">Ghosty 2</h1>
                    {!isLoaded && (<h2 style={{color:"white", fontFamily:"sen"}}>Loading ... {Math.round(loadingProgression*100)}%</h2>)}
                    <Unity unityProvider={unityProvider} 
                        style={{visibility: isLoaded ? "visible" : "hidden", width: "80%", height:"80%", marginBottom:"5%"}}
                    />
                </div>
                ) : (
                    <div className="game-section">
                        <h1 className="game-name">Ghosty 2</h1>
                        <div className="play-button" onClick={() => setIsGameOn(true)}>
                            <p>Play</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}