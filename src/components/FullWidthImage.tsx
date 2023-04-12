// FullWidthImage.tsx
import React from "react";
import "../styling/fullwidthimage.css";

export default function FullWidthImage() {
    const imageUrl = "https://d17vv5kmac4tms.cloudfront.net/banner2.png";

    return (
        <div className="full-width-image-container">
            <img src={imageUrl} alt="Full Width" className="full-width-image" />
        </div>
    );
}
