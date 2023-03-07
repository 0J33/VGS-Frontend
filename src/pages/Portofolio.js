import React from "react";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { styled, Box, Typography } from "@mui/material";

const MainWrapper = styled(Box)(({theme}) => ({
    display:"flex",
    textAlign:"center",
    justifyContent:"center",
}));

export default function Portofolio() {
    const images = [
        "https://images.all-free-download.com/images/graphicwebp/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.webp",
        "https://images.all-free-download.com/images/graphicwebp/aires_ix_rocket_launch_pad_216982.webp",
        "https://images.all-free-download.com/images/graphicwebp/cellar_x_566119.webp"
    ]
    return (
        <div style={{width:"100%", display:"flex", flexDirection:"cloumn", alignItems:"center", justifyContent:"center"}}>
            <div style={{width:"50%", textAlign:"center"}}>
                <Typography variant="h2" style={{color:"white", fontWeight:"900", fontFamily:"Courier New"}}>Images</Typography>
                <Carousel autoPlay={true} 
                    fullHeightHover={true}
                    indicators={true} 
                    navButtonAlwaysVisible={true}
                    navButtonsProps={{style:{backgroundColor:"cornflowerblue"}}}
                    navButtonsWrapperProps={{style:{color:"black"}}}
                    NextIcon={<ArrowForwardIosIcon />}
                    PrevIcon={<ArrowBackIosNewIcon />}
                >
                    {
                        images.map( (image, idx) => <img key={idx} src={image} /> )
                    }
                </Carousel>
            </div>
        </div>
    )
}
