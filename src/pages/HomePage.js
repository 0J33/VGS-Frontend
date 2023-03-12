import { useEffect } from "react";
import { Box, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)(({theme}) => ({
    width:"100%",
    height: "30rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"rgb(25, 25, 26)"
}));

const StyledH2Text = styled(Typography)(({theme}) => ({
    fontFamily: "Courier New",
    fontWeight: "900",
    color: "white",
    margin: "5%"
}));

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
        <StyledBox>
            <img className="body-logo" src="https://i.ibb.co/QrkLL3P/VGS-Logo.png" />
            <StyledH2Text variant="h2">Welcome to VGS</StyledH2Text>
        </StyledBox>
    )
}