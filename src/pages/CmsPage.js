import "../css/cms-page.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResourceCard from "../components/ResourceCard";
import LoadingSpinner from "../components/LoadingSpinner";

const gdd_url = "https://vgs-production.up.railway.app/api/gdd";

export default function CmsPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    async function getGDD() {
        setIsLoading(true);
      await axios.get(gdd_url)
        .then(res => {setData(res.data); setIsLoading(false)}); 
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
        <>
            {
                isLoading ? (
                    <div className="body">
                        <LoadingSpinner />
                    </div>
                ) : (
                <div className="body">
                    {
                        data.map((keys, idx) => {
                            return (
                                <ResourceCard key={idx} resource_name={keys.resource_name} resource_type={keys.resource_type} resource_link={keys.resource_link} />
                            );
                        })
                    }
                </div>
                )
            }
        </>
    )
}