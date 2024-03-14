import React from "react";
import "../css/loading-spinner.css";

export default function LoadingSpinner(props) {
  return (
    <div className="spinner-container">
      <div className={props.type === "1" ? "loading-spinner" : "loading-spinner2"}>
      </div>
    </div>
  );
}