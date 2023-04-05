import "../css/admin-page.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import App from "../App";

const S3_BUCKET = "vgs-website-resources/static";
const REGION = "us-east-1";
const ACCESS_KEY = "AKIA6C44BFWJBQXDULXD";
const SECRET_ACCESS_KEY = "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";

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    maxRetries: 1, // on upload fail retry to upload only once (default is 3 times)
    httpOptions: {
        timeout: 10000000, // set timeout to 10000000 milliseconds = 167 minutes
        connectTimeout: 10000000 // set timeout to 10000000 milliseconds = 167 minutes
        
    }
});

const adminApiEndpoint = "https://vgs-production.up.railway.app/api/profiles/admin";

export default function AdminPage() {
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    function checkIsAdmin() {
        var cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            if(cookies.at(i).includes("sessionId")) {
               const sessionId = cookies.at(i).split("=")[1];
               axios.post(adminApiEndpoint, {"session_id": sessionId})
                .then((response) => {
                    if (response.status == 200) {
                        if (response.data.success == "False" || response.data.is_admin == "False") {
                            navigate("/");
                        }
                    } else {
                        navigate("/");
                    }
                })
                .catch((err) => {
                    navigate("/");
                });
                setLoading(false);
               return;
            }
        }
    }

    const myBucket = new AWS.S3({
        params: {Bucket: S3_BUCKET},
        region: REGION
    });

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    function handleUpload(file) {
        const params = {
            Bucket: S3_BUCKET,
            Body: file,
            Key: file.name
        }
        
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded/evt.total)*100));
            })
            .on('complete', (evt) => {
                // send request to backend to add the resource link along with other info
            })
            .send((err) => {
                if (err) {
                    console.log(err);
                }
            });
    }

    useEffect(() => {
        checkIsAdmin();
    }, []);
    
    return (
        <div className="body">
            {
                loading ? (
                    <div className="loading-body"> 
                        <LoadingSpinner />
                        <h3>Please Wait while we verify your identity</h3>
                    </div>
                ) : (
                    <div className="form-wrapper">
                        <div className="form-body">
                            <h3 className="text">Admin Page : progress {progress}%</h3>
                           <div className="file-input">
                                <label className="label">
                                    <input type="file" required/>
                                    <span>Select a file</span>
                                </label>
                            </div>
                            <button className="btn" onClick={() => handleUpload(selectedFile)}>upload</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}