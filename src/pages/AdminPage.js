import "../css/admin-page.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import App from "../App";

try {
    require('dotenv').config();
} catch (e) {
    console.log('dotenv not found');
}

const BACKEND = process.env.REACT_APP_BACKEND;

const AWS_RES = process.env.REACT_APP_AWS_RES;
const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.REACT_APP_AWS_REGION;
const AWS_BUCKET_NAME = process.env.REACT_APP_AWS_BUCKET_NAME;
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

export default function AdminPage() {

    const [user_username, setUserUsername] = useState("");
    const [user_name, setUserName] = useState("");
    const [user_type, setUserType] = useState("");
    const [user_committee, setUserCommittee] = useState("");

    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [resourceName, setResourceName] = useState("");
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [committee, setCommittee] = useState("GDD"); // GDD set as the default value

    const navigate = useNavigate();

    async function checkIsAdmin() {
        const username = sessionStorage.getItem("username");
        console.log(username);
        if (username === null || username === "") {
            console.log("user not logged in");
            navigate("/login");
            return;
        } else {
            console.log("user logged in");
            setLoading(false);

            setUserUsername(sessionStorage.getItem("username"));
            setUserName(sessionStorage.getItem("name"));
            setUserType(sessionStorage.getItem("type"));
            setUserCommittee(sessionStorage.getItem("committee").toUpperCase());
            console.log(user_username);
            console.log(user_name);
            console.log(user_type);
            console.log(user_committee);
        }
    }

    function handleCommitteeSelect(e) {
        setCommittee(e.target.value);
    }

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
        setSelectedFileName(e.target.files[0].name);
    }

    function formatResourceName(fileName) {
        const fileNameArray = fileName.split(" ");
        if (fileNameArray.length === 0) {
            return fileName;
        }
        var formattedFileName = "";
        for (let i = 0; i < fileNameArray.length; i++) {
            if (i === fileNameArray.length-1) {
                formattedFileName += fileNameArray.at(i);
                break;
            }
            formattedFileName += fileNameArray.at(i)+"+";
        }
        return formattedFileName;
    }

    function uploadDataToBackend(db_data) {
        fetch(`${BACKEND}/addFile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(db_data)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                console.log("Data Uploaded to Database Successfully");
                window.location.reload();
            } else {
                setError(true);
                setErrorMessage("Error Uploading Data to Database");
            }
        })
    }

    function handleUpload(file) {
        if (file == null) {
            setError(true);
            setErrorMessage("Please Choose a file to be uploaded");
            return;
        }
        if (resourceName.trim() === "") {
            setError(true);
            setErrorMessage("Please Provide a name for the resource");
            return;
        }

        console.log("generating random id");

        var randomId  = "";
        fetch(`${BACKEND}/generateFileId`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            randomId = data.toString();
        
            console.log("random id generated");
        
            const formattedFileName = formatResourceName(selectedFileName);
            const fullS3ResourceLink = AWS_RES + randomId + "/" + formattedFileName;
            const db_data = {
                "committee": committee,
                "title": resourceName,
                "name": selectedFileName,
                "id": randomId,
                "aws_url": fullS3ResourceLink
            };
        
            setProgress(0);
            setShowProgress(true);
        
            const params = {
                Bucket: AWS_BUCKET_NAME,
                Key: randomId + "/" + formattedFileName,
                Body: file,
                ACL: "public-read",
            };
        
            console.log("uploading file to s3");

            console.log(params);
        
            s3.upload(params, function (err, data) {
                if (err) {
                    console.log(err);
                    setError(true);
                    setErrorMessage("Error Uploading File to S3");
                    return;
                }
        
                console.log(`File uploaded successfully. ${data.Location}`);
                setShowProgress(false);
                setProgress(0);
                uploadDataToBackend(db_data);

                console.log("file uploaded to s3");

            }).on("httpUploadProgress", function (progress) {
                setProgress(Math.round((progress.loaded / progress.total) * 100));
            });

        });        

    }

    useEffect(() => {
        checkIsAdmin();
    }, []);
    
    return (
        <div className="body">
            {
                error && (
                    <h3 className="error">{errorMessage}</h3>
                )
            }
            {
                loading === true ? (
                    <div className="loading-body"> 
                        <LoadingSpinner />
                        <h3 style={{fontFamily:"sen", color: "white"}}>Please Wait while we verify your identity</h3>
                    </div>
                ) : 
                
                    (user_type === "admin" || user_type === "mentor") ?
                    (
                        <div className="form-wrapper">
                            <div className="form-body">
                                <label className="text-label">Committee Name</label>      
                                <div className="select-wrapper">
                                    <label>
                                        <select style={{fontFamily:"sen"}} onChange={handleCommitteeSelect}>
                                            {
                                                user_type === "admin" ? (
                                                    <>
                                                    <option value="GDD" >GDD</option>
                                                    <option value="GAD" >GAD</option>
                                                    <option value="GSD" >GSD</option>
                                                    </>
                                                ) : (
                                                    <option value={user_committee} >{user_committee}</option>
                                                )
                                            }
                                        </select>
                                    </label>
                                </div>
                                <label className="text-label">File Title</label>
                                <input type="text" style={{fontFamily:"sen", width: "-webkit-fill-available", minWidth: "300px"}} onChange={(event) => setResourceName(event.target.value)} placeholder="Enter a name for your file" />
                                <div className="file-input-wrapper">
                                    <div className="file-input">
                                        <label className="label">
                                            <input type="file" onChange={handleFileInput} />
                                            <span>SELECT A FILE</span>
                                        </label>
                                        <p className="text">{selectedFileName}</p>
                                    </div>
                                </div>
                                <div className="upload-button-wrapper">
                                    <button className="btn" style={{fontFamily:"sen"}} onClick={() => handleUpload(selectedFile)}>UPLOAD</button>
                                    {
                                        showProgress && (
                                            <p className="text">upload progress : {progress}%</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ) : user_type === "social media" &&
                    (
                        <div>
                            <p className="wip-text">Work in progress... 🛠️🏗️🚧</p>
                        </div>
                    )
                    
                    // user form

                    // game form

            }
        </div>
    )
}
