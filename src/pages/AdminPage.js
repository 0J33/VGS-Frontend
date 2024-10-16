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

    const [userFormType, setUserFormType] = useState("");
    const [userFormCommittee, setUserFormCommittee] = useState("");
    const [userFormUsername, setUserFormUsername] = useState("");
    const [userFormPassword, setUserFormPassword] = useState("");

    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [resourceName, setResourceName] = useState("");
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [committee, setCommittee] = useState("");
    const [session, setSession] = useState("");

    const [users, setUsers] = useState([]);
    const [resouces, setResources] = useState([]);
    const [posts, setPosts] = useState([]);

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

    function handleSessionSelect(e) {
        setSession(e.target.value);
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
                "session": session,
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

                alert("File Uploaded Successfully");
                window.location.reload();

            }).on("httpUploadProgress", function (progress) {
                setProgress(Math.round((progress.loaded / progress.total) * 100));
            });

        });        

    }

    function deleteFile(file) {
        // TODO: finish this function
        return false;
    }

    function handleAddUser() {

        if (userFormUsername.trim() === "" || userFormPassword.trim() === "") {
            setError(true);
            setErrorMessage("Please fill all the fields");
            return;
        }

        const user_data = {
            "username": userFormUsername,
            "password": userFormPassword,
            "type": userFormType,
            "committee": userFormCommittee
        };

        console.log(user_data);

        fetch(`${BACKEND}/addUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user_data)
        })
        .then((response) => {
            response.json()
            if (response.status === 200) {
                console.log("User Added to Database Successfully");
                alert("User Added Successfully");
                window.location.reload();
            } else {
                setError(true);
                setErrorMessage("Error Adding User to Database");
            }
        })
            
    }

    useEffect(() => {
        checkIsAdmin();
    }, []);

    useEffect(() => {
        if (user_type === "admin") {
            fetch(`${BACKEND}/getUsers`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUsers(data);
            })

            fetch(`${BACKEND}/getFiles`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setResources(data);
            })

            fetch(`${BACKEND}/getPosts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
        }
    }, [user_type]);
    
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
                        <LoadingSpinner type="1" />
                        <h3 style={{fontFamily:"sen", color: "white"}}>Please Wait while we verify your identity</h3>
                    </div>
                ) : (

                <div className="admin-page">
                
                    {/* User Form */}
                    <div>

                    {(user_type === "admin") ? (
                        <div className="form-wrapper">

                        <p className="form-title">Add a User</p>
                        <div className="form-body">
                            <label className="text-label">Type</label>  
                            <div className="select-wrapper">
                                <label>
                                    <select style={{fontFamily:"sen", width: "300px"}} onChange={(event) => {setUserFormType(event.target.value); console.log(event.target.value)}}>
                                        <option value="none" disabled selected>Select a Type</option>
                                        <option value="mentor" >Mentor</option>
                                        <option value="social media" >Social Media</option>
                                    </select>
                                </label>
                            </div>
                            <label className="text-label">Committee</label>
                            <div className="select-wrapper">
                                <label>
                                    <select style={{fontFamily:"sen", width: "300px"}} onChange={(event) => setUserFormCommittee(event.target.value)}>
                                        <option value="none" disabled selected>Select a Committee</option>
                                        <option value="gdd" >GDD</option>
                                        <option value="gsd" >GAD</option>
                                        <option value="gad" >GSD</option>
                                        <option value="none" >None (social media)</option>
                                    </select>
                                </label>
                            </div>
                            <label className="text-label">Username</label>
                            <input type="text" style={{fontFamily:"sen", width: "-webkit-fill-available", minWidth: "300px"}} onChange={(event) => setUserFormUsername(event.target.value)} placeholder="username" />
                            <label className="text-label">Password</label>
                            <input type="password" style={{fontFamily:"sen", width: "-webkit-fill-available", minWidth: "300px"}} onChange={(event) => setUserFormPassword(event.target.value)} placeholder="********" />
                            <div className="upload-button-wrapper">
                                <button className="btn" style={{fontFamily:"sen"}} onClick={() => handleAddUser()}>ADD USER</button>
                            </div>
                        </div>
                            
                        <br />
                        <div className="divider">
                        _____________________________________________
                        </div>
                        <br />
                       
                        <p className="form-title">Remove a User</p>
                        <div className="form-body">
                            {
                            <table>
                                <tbody>
                                    {
                                        users.map((user) => {
                                            return (
                                                <tr key={user.username}>
                                                    <td>{user.username}</td>
                                                    <td>
                                                        <button className="btn" onClick={() => {
                                                            fetch(`${BACKEND}/deleteUser`, {
                                                                method: "DELETE",
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                },
                                                                body: JSON.stringify({"username": user.username})
                                                            })
                                                            .then((response) => response.json())
                                                            .then((data) => {
                                                                if (data.status === 200) {
                                                                    console.log("User Deleted Successfully");
                                                                    window.location.reload();
                                                                } else {
                                                                    setError(true);
                                                                    setErrorMessage("Error Deleting User");
                                                                }
                                                            })
                                                        }}>X</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            }
                        </div>

                        </div>
                    ) : null}

                    </div>

                    {/* CMS Form */}
                    <div>
                    {(user_type === "admin" || user_type === "mentor") ? (
                            <>
                            <div className="form-wrapper">

                                <p className="form-title">Upload a Resource<br />to the CMS</p>
                                <div className="form-body">
                                    <label className="text-label">Committee Name</label>      
                                    <div className="select-wrapper">
                                        <label>
                                            <select style={{fontFamily:"sen", width: "300px"}} onChange={handleCommitteeSelect}>
                                                {
                                                    user_type === "admin" ? (
                                                        <>
                                                        <option value="none" disabled selected>Select a Committee</option>
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
                                    <label className="text-label">Session</label>      
                                    <div className="select-wrapper">
                                        <label>
                                            <select style={{fontFamily:"sen", width: "300px"}} onChange={handleSessionSelect}>
                                                <option value="none" disabled selected>Select a Session</option>
                                                <option value="1" >1</option>
                                                <option value="2" >2</option>
                                                <option value="3" >3</option>
                                                <option value="4" >4</option>
                                                <option value="5" >5</option>
                                                <option value="6" >6</option>
                                                <option value="7" >7</option>
                                                <option value="8" >8</option>
                                                <option value="9" >9</option>
                                                <option value="10" >10</option>
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

                                {/* get file names and add x button next to each deleting using _id */}
                                <br />
                                <div className="divider">
                                _____________________________________________
                                </div>
                                <br />

                                <p className="form-title">Remove a Resource</p>
                                <div className="form-body">
                                    {
                                    <table>
                                        <tbody>
                                            {
                                                resouces.map((resource) => {
                                                    return (
                                                        <tr key={resource._id}>
                                                            <td>{resource.title}</td>
                                                            <td>
                                                                <button className="btn" onClick={() => {
                                                                    if (deleteFile(resource.id)) {
                                                                        fetch(`${BACKEND}/deleteFile`, {
                                                                            method: "DELETE",
                                                                            headers: {
                                                                                "Content-Type": "application/json",
                                                                            },
                                                                            body: JSON.stringify({"_id": resource._id})
                                                                        })
                                                                        .then((response) => response.json())
                                                                        .then((data) => {
                                                                            if (data.status === 200) {
                                                                                console.log("Resource Deleted Successfully");
                                                                                window.location.reload();
                                                                            } else {
                                                                                setError(true);
                                                                                setErrorMessage("Error Deleting Resource");
                                                                            }
                                                                        })
                                                                    }
                                                                }}>X</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    }
                                </div>

                            </div>
                            </>
                    ) : null}
                    </div>

                    {/* Blog Form */}
                    <div>

                    {(user_type === "social media" || user_type === "admin" ) ? (
                        <div className="form-wrapper">
                            <p className="form-title">Add a Post<br />to the Blog</p>
                            <div className="form-body">
                                <p className="wip-text">Work in progress... 🛠️🏗️🚧</p>
                                {/* title / description / media */}
                            </div>
                        </div>
                    ) : null}

                    </div>

                    {/* Games Form */}
                    <div>
                        
                        {(user_type === "admin") ? (
                        
                        <div className="form-wrapper">
                            <p className="form-title">Add a Game</p>
                            <div className="form-body">
                                <p className="wip-text">Work in progress... 🛠️🏗️🚧</p>
                            </div>
                        </div>

                        ) : null}

                    </div>

                </div>

                )
            }
        </div>
    )
}
