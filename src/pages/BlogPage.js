import "../css/blog-page.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import App from "../App";

export default function AdminPage() {

    return (
        <div className="body">
            <div className="container">
                <p className="wip-text">Work in progress... 🛠️🏗️🚧</p>
            </div>
        </div>
    )
}