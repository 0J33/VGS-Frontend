import "../css/cms-page.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResourceCard from "../components/ResourceCard";
import LoadingSpinner from "../components/LoadingSpinner";

try {
    require('dotenv').config();
  } catch (e) {
    console.log('dotenv not found');
  }

const gdd_url = process.env.REACT_APP_BACKEND + "/gdd";
const gad_url = process.env.REACT_APP_BACKEND + "/gad";
const gsd_url = process.env.REACT_APP_BACKEND + "/gsd";

export default function CmsPage() {
    
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedCommittee, setSelectedCommittee] = useState(0);

    async function getGDD() {
        setIsLoading(true);
        await axios.get(gdd_url)
            .then(res => {setData(res.data); setIsLoading(false)}); 
    }

    async function getGAD() {
        setIsLoading(true);
        await axios.get(gad_url)
            .then(res => {setData(res.data); setIsLoading(false)}); 
    }

    async function getGSD() {
        setIsLoading(true);
        await axios.get(gsd_url)
            .then(res => {setData(res.data); setIsLoading(false)}); 
    }

    useEffect(() => {
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
                <div className="body" style={{justifyContent:"normal"}}>
                    <div className="committee-selection-box">
                        <div className={selectedCommittee === 0 ? "selected-committee-button-wrapper": "committee-button-wrapper"}
                            onClick={() => {
                                setSelectedCommittee(0);
                                getGDD();
                            }}
                        >
                            <p style={{color:"black", fontFamily:"sen", fontWeight:900}}>GDD</p>
                        </div>
                        <div className={selectedCommittee === 1 ? "selected-committee-button-wrapper": "committee-button-wrapper"}
                            onClick={() => {
                                setSelectedCommittee(1);
                                getGAD();
                            }}
                        >
                            <p style={{color:"black", fontFamily:"sen", fontWeight:900}}>GAD</p>
                        </div>
                        <div className={selectedCommittee === 2 ? "selected-committee-button-wrapper": "committee-button-wrapper"}
                            onClick={() => {
                                setSelectedCommittee(2);
                                getGSD();
                            }}
                        >
                            <p style={{color:"black", fontFamily:"sen", fontWeight:900}}>GSD</p>
                        </div>
                    </div><br></br>
                    {
                        data.map((keys, idx) => {
                            return (

                                <div>
                                    <ResourceCard key={idx} resource_name={keys.resource_name} resource_type={keys.resource_type} resource_link={keys.resource_link} />
                                </div>
                            );
                        })
                    }
                </div>
                )
            }
        </>
    )
}
