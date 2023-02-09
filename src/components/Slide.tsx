import React from "react";

import "../styling/slide.css";

export default function Slide({name, imageSrc, store, timestamp, price}) {
    const getImgSrc = (imageSrc) => {
        return `http://localhost:3030/images/${imageSrc}`;
    };

    return (
        <div className="slideCont">
            <div className="slideImgCont">
                <img className="slideImg" alt="image" src={getImgSrc(imageSrc)} />
            </div>
            <span className="slideTitle">{name}</span>
            <span className="slideStore">{store}</span>
            <span className="slideTimeStamp">{timestamp}</span>
            <span className="slidePrice">{price}</span>
        </div>
    );
}
