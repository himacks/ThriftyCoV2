import React from "react";

import "../styling/slide.css";

export default function Slide({name, imageSrc, store, timestamp, price}) {
    return (
        <div className="slideCont">
            <div className="slideImgCont">
                <img className="slideImg" alt="image" src={imageSrc} />
            </div>
            <span className="slideTitle">{name}</span>
            <span className="slideStore">{store}</span>
            <span className="slideTimeStamp">{timestamp}</span>
            <span className="slidePrice">{price}</span>
        </div>
    );
}
