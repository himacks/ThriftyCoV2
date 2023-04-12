import React from "react";
import "../styling/AccessDenied.css";

const AccessDenied = () => {
    return (
        <div className="access-denied-container">
            <div className="access-denied-message">Access Denied. Login to admin first.</div>
        </div>
    );
};

export default AccessDenied;
