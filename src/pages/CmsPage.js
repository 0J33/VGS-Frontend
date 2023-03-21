import { useState, useEffect } from "react";
import axios from "axios";
import { styled, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainWrapper = styled(Box) ({
    width:"100%",
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    justifyContent:"flex-start"
});

const gdd_url = "https://vgs-production.up.railway.app/api/gdd";

export default function CmsPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    async function getGDD() {
      await axios.get(gdd_url)
        .then(res => setData(res.data)) 
    }

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
        getGDD();
    }, []);

    return (
        <MainWrapper>
            {
                data.map((keys, idx) => {
                    return (
                        <div style={{display:"flex", flexDirection:"column", gap:"10px", border:"1px solid black"}} key={idx}>
                            <h1 key={idx+1}>{keys.resource_name}</h1>
                            <p key={idx+1}>{keys.resource_type}</p>
                            <a key={idx} href={keys.resource_data}>download</a>
                        </div>
                    );
                })
            }
        </MainWrapper>
    )
}