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
const addResourceApiEndpoint = "https://vgs-production.up.railway.app/api/resources";

export default function AdminPage() {
    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [resourceName, setResourceName] = useState("");
    const [committee, setCommittee] = useState("GDD"); // GDD set as the default value
    const [selectedFileType, setSelectedFileType] = useState("IMAGE");

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

    function handleCommitteeSelect(e) {
        setCommittee(e.target.value);
    }

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
        setSelectedFileName(e.target.files[0].name);
    }

    function handleFileTypeChange(e) {
        setSelectedFileType(e.target.value);
    }

    function formatResourceName(fileName) {
        const fileNameArray = fileName.split(" ");
        if (fileNameArray.length == 0) {
            return fileName;
        }
        var formattedFileName = "";
        for (let i = 0; i < fileNameArray.length; i++) {
            if (i == fileNameArray.length-1) {
                formattedFileName += fileNameArray.at(i);
                break;
            }
            formattedFileName += fileNameArray.at(i)+"+";
        }
        return formattedFileName;
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
        const formattedFileName = formatResourceName(selectedFileName);
        const fullS3ResourceLink = "https://vgs-website-resources.s3.amazonaws.com/static/" + formattedFileName;
        const data = {
            "committee": committee,
            "resource_type": selectedFileType,
            "resource_name": resourceName,
            "resource_link": fullS3ResourceLink
        }
        const params = {
            Bucket: S3_BUCKET,
            Body: file,
            Key: file.name
        }
        
        setProgress(0);
        setShowProgress(true);

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded/evt.total)*100));
            })
            .on('complete', (evt) => {
                // send request to backend to add the resource link along with other info
                axios.post(addResourceApiEndpoint, data);
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
                error && (
                    <h3 className="error">{errorMessage}</h3>
                )
            }
            {
                loading ? (
                    <div className="loading-body"> 
                        <LoadingSpinner />
                        <h3>Please Wait while we verify your identity</h3>
                    </div>
                ) : (
                    <div className="form-wrapper">
                        <div className="form-body">
                            <label className="text-label">Committee Name</label>      
                            <div className="select-wrapper">
                                <label>
                                    <select onChange={handleCommitteeSelect}>
                                        <option value="GDD" >GDD</option>
                                        <option value="GAD" >GAD</option>
                                    </select>
                                </label>
                            </div>
                            <label className="text-label">Resource Type</label>      
                            <div className="select-wrapper">
                                <label>
                                    <select onChange={handleFileTypeChange}>
                                        <option value="IMAGE">IMAGE</option>
                                        <option value="VIDEO">VIDEO</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                </label>
                            </div>
                            <label className="text-label">Resource Name</label>
                            <input type="text" onChange={(event) => setResourceName(event.target.value)} placeholder="Enter a name for your file" />
                            <div className="file-input-wrapper">
                                <div className="file-input">
                                    <label className="label">
                                        <input type="file" onChange={handleFileInput} />
                                        <span>Select a file</span>
                                    </label>
                                </div>
                                <p className="text">{selectedFileName}</p>
                            </div>
                            <div className="upload-button-wrapper">
                                <button className="btn" onClick={() => handleUpload(selectedFile)}>upload</button>
                                {
                                    showProgress && (
                                        <h3 className="text">upload progress : {progress}%</h3>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}