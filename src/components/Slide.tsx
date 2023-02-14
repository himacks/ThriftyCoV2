import React from "react";

import FavoriteItem from "./FavoriteItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "../styling/slide.css";

export default function Slide({category, name, imageSrc, store, timestamp, price, likeCount, id}) {
    return (
        <div className="slideCont">
            <div className="slideImgCont">
                <img className="slideImg" alt="image" src={imageSrc} />
            </div>
            <div className="slideInfoCont">
                <div className="slideHeaderCont">
                    <span className="slideTitle">{name}</span>
                    <FavoriteItem key={timestamp} category={category} count={likeCount} id={id} />
                </div>
                <span className="slidePrice">{price}</span>
                <span className="slideTimeStamp">{timestamp}</span>
                <div className="slideStoreCont">
                    <LocationOnIcon />
                    <span className="slideStore">{store}</span>
                </div>
            </div>
        </div>
    );
}
