import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import "../css/changepassword-page.css";
import * as App from "../App";

try {
    require('dotenv').config();
} catch (e) {
    console.log('dotenv not found');
}

const BACKEND = process.env.REACT_APP_BACKEND;

export default function ChangePasswordPage() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [password2 , setPassword2] = useState("");

    const navigate = useNavigate();

    const [showSpinner, setShowSpinner] = useState(false);

    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    function changePassword() {

        // Check if passwords are not empty
        if (!password || !password2) {
            setError(true);
            setErrMsg("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            setError(true);
            setErrMsg("Password must be at least 8 characters long.");
            return;
        }

        if (password !== password2) {
            setError(true);
            setErrMsg("Passwords do not match.");
            return;
        }

        // Show loading spinner while making the request
        setShowSpinner(true);
            
        // Make a POST request to the login endpoint
        fetch(`${BACKEND}/changePassword`, {
            method: "PUT",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username: sessionStorage.getItem("username"),
            password: password
            })
        })
        .then((res) => {
            // Check if the request was successful
            if (res.ok) {
            // Redirect or perform other actions on successful login
            navigate('/admin'); // You might want to navigate to a different page
            return res.json();
            } else {
            // Handle unsuccessful login (display an error message, etc.)
            setError(true);
            setErrMsg("An error occurred.");
            }
        })
        .catch((err) => {
            console.error(err);
            // Handle any unexpected errors
            setError(true);
            setErrMsg("Error.");
        })
        .finally(() => {
            // Hide the loading spinner
            setShowSpinner(false);
        });
        }      

    function closeErrorBox() {
        setError(false);
    }

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        if (username === null || username === "") {
            setLoggedIn(false);
            navigate("/login");
        } else {
            setLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        function handleKeyDown(event) {
          if (event.keyCode === 13) {
            // Enter key
            changePassword();
          }
        }
    
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      });  

    return (
        <div className="body-wrapper">
            {
                error && (
                    <div className="err-box">
                        <h1 className="err-msg">
                            {errMsg}
                        </h1>
                        <div className="close-icon" onClick={closeErrorBox}>
                            <h3 className="close-icon-text" style={{fontSize:"30px"}}>×</h3>
                        </div>
                    </div>
                )
            }
            <div className={error ? "white-card-error" : "white-card"}>
                <div className="left-card-cp">
                  <div className="left-card-body">
                    <div className="top-text">
                        <svg className="text-logo" fill="#ffffff" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 489.54"><path d="M651.85,163.33h27.81L639.38,327.71H587.12L546.84,163.33h27.81l32.61,140.86h12Z"/><path d="M778.44,306.11l6.71-.72.48,19.44q-27.33,5.51-48.43,5.52-26.61,0-38.24-14.64t-11.63-46.79q0-63.83,52-63.83,50.34,0,50.35,55L788,278.75H713.7q.24,14.89,6.48,21.84t23.25,7Q760.46,307.55,778.44,306.11ZM764.05,258.6q0-17.76-5.63-24.84t-19.06-7.08q-13.44,0-19.54,7.44t-6.36,24.48Z"/><path d="M859.71,205.09a159.92,159.92,0,0,1,30,3.36l6,1.2-1,20.63q-18.93-1.92-28.05-1.92-18.21,0-24.45,8.16T836,267.24q0,22.56,6,31.19t24.93,8.64L895,305.15l.71,20.88q-24.21,4.32-36.44,4.32-27.33,0-38.48-14.76T809.6,267.24q0-33.6,11.75-47.87T859.71,205.09Z"/><path d="M985.34,230H952.25v52.79q0,14.64,2.16,19.44t11,4.8l19.66-.72,1.2,20.88q-16.06,3.11-24.46,3.12-20.39,0-27.93-9.36t-7.55-35.28V230H911V207.73h15.35v-34.8h25.89v34.8h33.09Z"/><path d="M1013.27,220.69q12.35-15.6,41.11-15.6t41.12,15.6q12.35,15.6,12.35,46.79t-12,47q-12,15.84-41.48,15.84t-41.47-15.84q-12-15.84-12-47T1013.27,220.69Zm19.54,78q5.51,9.6,21.57,9.6t21.58-9.6q5.52-9.59,5.51-31.43t-5.87-31q-5.88-9.12-21.22-9.12t-21.21,9.12q-5.88,9.12-5.88,31T1032.81,298.67Z"/><path d="M1133.74,327.71v-120h25.89v14.39q20.38-13.19,40.76-17v26.15q-20.62,4.09-35.24,10.56l-5.28,2.16v83.75Z"/><path d="M1343,264.84V241.32h46.75v83.51q-6.48,1.68-26.25,3.6t-28.65,1.92q-37.41,0-51.55-20.64T1269.19,245q0-44,14.51-64.19t50.23-20.15q21.09,0,47.47,4.79l8.39,1.68-1,21.12a400.55,400.55,0,0,0-52-3.84q-23,0-31.52,13t-8.51,48q0,35,8,48.35t32.48,13.32q17.51,0,26.14-2.16V264.84Z"/><path d="M1508.7,244.68v54.71q.24,5.28,2.76,7.8t7.79,3.24l-.72,19.92q-20.61,0-31.88-8.88a91.16,91.16,0,0,1-38.6,8.88q-35.73,0-35.73-38.16,0-18.22,9.71-26.39t29.85-9.84l30.93-2.64v-8.64q0-9.6-4.19-13.44c-2.8-2.55-6.92-3.84-12.35-3.84q-15.35,0-38.36,1.92l-7.67.48-1-18.47q26.13-6.24,48.07-6.24t31.64,9.48Q1508.71,224.05,1508.7,244.68ZM1455,274.44q-16.55,1.44-16.54,18T1453.08,309a92.63,92.63,0,0,0,25.42-3.84l4.31-1.44V271.8Z"/><path d="M1567.68,327.71h-26.13v-120h25.89v7.44q17-10.08,31.17-10.08,20.85,0,30.45,11.76,21.81-11.76,43.39-11.76t30.45,13.32q8.86,13.31,8.87,45v64.31h-25.89V264.12q0-19.44-4-27.6t-16.42-8.16a65,65,0,0,0-23.26,4.8l-4.07,1.68q1.9,4.8,1.91,30.72v62.15h-25.89V266q0-21.36-3.83-29.52t-16.79-8.16a52.13,52.13,0,0,0-22.29,4.8l-3.6,1.44Z"/><path d="M1827.81,306.11l6.71-.72.48,19.44q-27.33,5.51-48.43,5.52-26.61,0-38.24-14.64t-11.63-46.79q0-63.83,52-63.83,50.34,0,50.35,55l-1.68,18.71h-74.32q.23,14.89,6.47,21.84t23.26,7Q1809.82,307.55,1827.81,306.11Zm-14.39-47.51q0-17.76-5.63-24.84t-19.06-7.08q-13.43,0-19.54,7.44t-6.35,24.48Z"/><path d="M1968.3,184q-30.45,0-30.45,21.36,0,11,7.19,15.71t31.77,11.52q24.57,6.84,34.64,16.32t10.07,29.87q0,25.92-14.74,38.76t-40.16,12.84a238.63,238.63,0,0,1-45.07-4.8l-8.63-1.68,2.63-21.36q32.37,4.32,49.39,4.32,29.73,0,29.73-26.4,0-10.31-6.71-15.23t-30.21-10.8q-23.51-5.88-35-16.2t-11.51-32.63q0-22.32,14.5-33.72t40.16-11.39q18.46,0,43.64,4.32l8.39,1.43-2.16,21.6Q1982.2,184,1968.3,184Z"/><path d="M2110,230h-33.09v52.79q0,14.64,2.16,19.44t11,4.8l19.65-.72,1.2,20.88q-16.07,3.11-24.45,3.12-20.39,0-27.93-9.36T2051,285.71V230h-15.35V207.73H2051v-34.8h25.89v34.8H2110Z"/><path d="M2204,207.73h25.9v120H2204v-7.44q-17.5,10.08-32.36,10.08-24.71,0-33.09-13.32t-8.39-46.67V207.73h26.13V270.6q0,21.58,3.6,29t16.78,7.44a57.79,57.79,0,0,0,23.74-4.8l3.59-1.44Z"/><path d="M2359.33,157.82V327.71h-25.89v-6.24q-17.51,8.88-32.13,8.88-23.49,0-34.4-14.16T2256,268.68q0-33.36,12.11-48.48t37.76-15.11q8.63,0,27.33,3.12V157.82Zm-30.21,144.93,4.08-1.68V230a163.58,163.58,0,0,0-26.61-2.4q-24.23,0-24.22,40.32,0,22.08,5.64,30.59t17.86,8.52A63.16,63.16,0,0,0,2329.12,302.75Z"/><path d="M2391,187.33V159.74h26.13v27.59Zm0,140.38v-120h26.13v120Z"/><path d="M2455.35,220.69q12.34-15.6,41.12-15.6t41.12,15.6q12.35,15.6,12.34,46.79t-12,47q-12,15.84-41.48,15.84T2455,314.51q-12-15.84-12-47T2455.35,220.69Zm19.54,78q5.52,9.6,21.58,9.6t21.58-9.6q5.5-9.59,5.51-31.43t-5.87-31q-5.88-9.12-21.22-9.12t-21.22,9.12q-5.88,9.12-5.87,31T2474.89,298.67Z"/><polyline points="399.85 43.89 363.53 73.75 327.2 103.62 290.87 133.23 254.55 163.09 217.96 192.96 217.96 252.17 217.96 311.64 217.7 370.85 254.03 340.99 290.61 311.38 326.94 281.52 363.27 251.65 363.27 310.86 326.68 340.73 290.35 370.59 254.03 400.46 217.7 430.32 217.44 489.54 253.77 459.67 290.35 429.81 326.68 400.2 363.01 370.33 399.33 340.47 399.59 281.26 399.59 221.78 399.85 162.57 363.27 192.44 326.94 222.04 290.61 251.91 254.29 281.77 254.29 222.56 290.87 192.7 327.2 162.83 363.53 132.97 399.85 103.1 399.85 43.89"/><polygon points="399.85 0 200.57 163.61 0 0 79.92 0 200.32 98.17 319.93 0 399.85 0"/><polyline points="183.45 192.96 146.86 163.09 110.28 133.23 73.69 103.62 37.1 73.75 0.52 43.89 0.26 103.36 0.26 162.57 0 221.78 0 281.26 0 340.47 36.59 370.33 73.17 400.2 109.76 429.81 146.34 459.67 182.93 489.54 183.19 430.32 183.19 370.85 183.45 311.64 146.6 281.77 110.02 251.91 73.43 222.04 73.43 281.52 110.02 311.38 146.6 340.99 146.6 400.46 109.76 370.59 73.17 340.73 36.59 310.86 36.85 251.65 36.85 192.44 37.1 132.97 73.69 162.83 110.28 192.7 146.86 222.56 183.45 252.17 183.45 192.96"/></svg>
                    </div>
                    <h1 className="left-card-heading">
                      Change
                      <br />
                      Password
                      <br />
                      💀
                    </h1>
                    <div className="contacts-wrapper">
                        <a href="https://www.facebook.com/vgsguc/"><svg className="contact-logo" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="500px" height="500px">    <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"/></svg></a>
                        <a href="https://www.instagram.com/vgsguc/"><svg className="contact-logo" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="500px" height="500px">    <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"/></svg></a>
                        <a href="mailto:vectorgamestudio2023@gmail.com"><svg className="contact-logo" xmlns="http://www.w3.org/2000/svg" width="514" height="362" viewBox="0 0 514 362"><path id="Mail" d="M29,4c3.279-.311,9.544-1.273,12-3H437c17.608,0,36.737-.932,49,4-0.333.333-199,200-212,213-4.6,4.593-9.93,13.372-22,10-8.113-2.267-13.608-11.608-19-17C219.335,197.335,28.667,4.333,29,4ZM159,182L5,27c-5.268,22.7-4,56.326-4,85V255c0,18.89-4.018,67.657,4,78C5,333.667,159,182,159,182ZM509,27c0.76,4.886,4,4.9,4,14V260c0,17.245,3.393,69.459-6,75-37.33-37.663-152-155-152-155S508.333,27,509,27ZM180,203c6.121,2.239,9.74,8.74,14,13,17.894,17.894,44.695,55.326,83,39,13.118-5.591,33.465-29.466,44-40,4.006-4.006,7.207-9.887,13-12l90,90c14.833,14.833,29.167,30.167,44,45l18,18-1,1c-6.289,4.863-19.015,4-30,4H61c-11.508,0-25.4,1.118-32-4l-1-1,18-18c14.833-14.833,29.167-30.167,44-45Z"/></svg></a>
                    </div>
                  </div>
                </div>
                <div className="right-card-wrapper">
                    <div className="right-card">
                        <h1 className="right-card-text-cp">Change Password.</h1>
                        <label className="input-label">New Password</label>
                        <input placeholder="********" type="password" style={{fontFamily:"sen"}} onChange={(event) => {setPassword(event.target.value)}} />
                        <label className="input-label">Confirm New Password</label>
                        <input placeholder="********" type="password" style={{fontFamily:"sen"}} onChange={(event) => {setPassword2(event.target.value)}} />
                        <div style={{height:'10px'}}></div>
                        {
                            showSpinner ? (<LoadingSpinner type="2" />) : (
                                <button className="btn-cp" style={{fontFamily:"sen", fontSize:"20px"}} onClick={changePassword}>Change Password</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}