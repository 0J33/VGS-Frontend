import "../css/blog-page.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import App from "../App";

export default function BlogPage() {

    return (
        <div className="body">
            <div className="container">
                <p style={{color: "white", fontFamily: "sen", fontSize: "24px", fontWeight: "500"}}>Work in progress... 🛠️🏗️🚧</p>
            </div>
        </div>
    )
}