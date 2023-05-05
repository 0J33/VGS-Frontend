import { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function GamePage() {

    const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl:"/ghosty2game/Ghosty2.loader.js",
        dataUrl:"/ghosty2game/Ghosty2.data",
        frameworkUrl:"/ghosty2game/Ghosty2.framework.js",
        codeUrl:"/ghosty2game/Ghosty2.wasm"
    });

    const [isGameOn, setIsGameOn] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    function handleResize() {
        console.log(isMobile);
        console.log(window.innerWidth);
        if (window.innerWidth < 1050) {
            setIsMobile(true);
            return;
        }
        setIsMobile(false);
    }


    window.addEventListener('resize', handleResize);
    

    return (
        <div style={{marginTop:"20%"}}>  
            <h1 style={{color:"white"}}>Cannot Play On Mobile</h1>
            {
                isGameOn ?  (
                <div>
                    <h2 style={{color:"white"}}>Ghosty 2</h2>
                    {!isLoaded && (<h2 style={{color:"white"}}>Loading ... {Math.round(loadingProgression*100)}%</h2>)}
                    <Unity unityProvider={unityProvider} 
                        style={{visibility: isLoaded ? "visible" : "hidden", width:"80%", height:"50%", margin:"3%"}}
                    />
                </div>
                ) : (
                    <div style={{margin:"10%"}}>
                        <h2 style={{color:"white"}}>Ghosty 2</h2>
                        <button onClick={e => setIsGameOn(true)}>Play Game</button>
                    </div>
                )
            }
        </div>
    )
}