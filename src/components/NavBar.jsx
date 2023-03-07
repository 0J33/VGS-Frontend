import { React, useState} from "react";
import MenuIcon from "@mui/icons-material/Menu"
import {AppBar, Toolbar, Typography, Link, styled, Box, Menu, MenuItem, Button} from "@mui/material";

const StyledAppBar = styled(AppBar)(({theme}) => ({
    backgroundColor: "rgb(25, 25, 26)", 
    display:"flex", 
    height: "80px", 
    justifyContent:"center"
}))

const StyledLink =  styled(Link)(({theme}) => ({
    textDecoration:"none",
    fontFamily: "Courier New",
    fontSize:"20px",
    fontWeight:"900",
    margin: "10px",
    color:"white",
    "&:hover": {
        color:"gray"
    },
}));

const MenuLink = styled(Link)(({theme}) => ({
    textDecoration:"none",
    fontWeight:"900",
    color:"black",
    "&:hover": {
        color:"gray"
    },
}));

const StyledDiv = styled(Box)(({theme}) => ({
    display:"none",
    [theme.breakpoints.up("sm")]: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    }
}));

const SmDiv = styled(Box)(({theme}) =>({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    [theme.breakpoints.up("sm")]: {
        display:"none"
    }
}))

export default function NavBar() {
    const [menuStatus, setMenuStatus] = useState(false);
    return(
        <StyledAppBar position="sticky">
           <Toolbar>
                <img className="logo" src="https://i.ibb.co/QrkLL3P/VGS-Logo.png" />
                <SmDiv>
                    <MenuIcon onClick={e => setMenuStatus(true)} />
                    <Menu open={menuStatus}
                        onClose={e => setMenuStatus(false)}
                        anchorOrigin={{vertical:"top", horizontal:"right"}}
                        transformOrigin={{vertical:"top", horizontal:"right"}}
                    >
                        <MenuItem onClick={e => setMenuStatus(false)}><MenuLink href="/">Home</MenuLink></MenuItem>
                        <MenuItem onClick={e => setMenuStatus(false)}><MenuLink href="/cms">CMS</MenuLink></MenuItem>
                        <MenuItem onClick={e => setMenuStatus(false)}><MenuLink href="/portofolio">Portofolio</MenuLink></MenuItem>
                        <MenuItem onClick={e => setMenuStatus(false)}><MenuLink href="/games">Games</MenuLink></MenuItem>
                    </Menu>
                </SmDiv>
                <StyledDiv>
                    <StyledLink href="/">Home</StyledLink>
                    <StyledLink href="/cms">CMS</StyledLink>
                    <StyledLink href="/portofolio">Portofolio</StyledLink>
                    <StyledLink href="/games">Games</StyledLink>
                </StyledDiv>
           </Toolbar>
        </StyledAppBar>
    )
}
