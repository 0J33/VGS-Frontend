import { useEffect } from "react";
import { useState } from "react";
import { styled, Box, Typography, Button } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)(({theme}) => ({
    display:"none",
    [theme.breakpoints.up("md")]: {
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"50%",
    }
}));

const StyledButton = styled(Button)(({theme}) => ({
    variant:"contained",
    color:"white",
    backgroundColor:"rgb(25, 25, 26)",
    [theme.breakpoints.down("lg")]: {
        display:"none"
    }
}));

const MainWrapper = styled(Box)(({theme}) => ({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    width:"100%"
}));

const MobileOnlyText = styled(Typography)(({theme}) =>({
    fontFamily:"Courier New",
    color:"white",
    fontWeight:"900",
    margin:"10%",
    [theme.breakpoints.up("md")] : {
        display:"none"
    }
}));

const StyledH2Text = styled(Typography)(({theme}) => ({
    color:"white",
    fontFamily:"Courier New",
    fontWeight:"900"
}))

export default function GamePage() {
    const navigate = useNavigate();

    const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl:"/ghosty2game/Ghosty2.loader.js",
        dataUrl:"/ghosty2game/Ghosty2.data",
        frameworkUrl:"/ghosty2game/Ghosty2.framework.js",
        codeUrl:"/ghosty2game/Ghosty2.wasm"
    });

    const [isGameOn, setIsGameOn] = useState(false);

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

    return (
        <MainWrapper>  
            <MobileOnlyText Variant="h1">Cannot Play On Mobile</MobileOnlyText>
            {
                isGameOn ?  (
                <StyledBox>
                    <StyledH2Text variant="h3">Ghosty 2</StyledH2Text>
                    {!isLoaded && (<StyledH2Text variant="h2">Loading ... {Math.round(loadingProgression*100)}%</StyledH2Text>)}
                    <Unity unityProvider={unityProvider} 
                        style={{visibility: isLoaded ? "visible" : "hidden", width:"80%", height:"50%", margin:"3%"}}
                    />
                </StyledBox>
                ) : (
                    <StyledBox style={{margin:"10%"}}>
                        <StyledH2Text variant="h3">Ghosty 2</StyledH2Text>
                        <StyledButton onClick={e => setIsGameOn(true)}>Play Game</StyledButton>
                    </StyledBox>
                )
            }
        </MainWrapper>
    )
}