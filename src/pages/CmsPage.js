import { useState, useEffect } from "react";
import axios from "axios";
import { styled, Box } from "@mui/material";

const MainWrapper = styled(Box) ({
    width:"100%",
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    justifyContent:"flex-start"
});

const gdd_url = "http://127.0.0.1:8000/api/gdd";

export default function CmsPage() {
    const [data, setData] = useState([]);

    async function getGDD() {
      await axios.get(gdd_url)
        .then(res => setData(res.data)) 
    }

    useEffect(() => {
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