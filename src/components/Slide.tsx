import React, {useState, useRef} from "react";

import FavoriteItem from "./FavoriteItem";
import InfoPopup from "./InfoPopup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlarmIcon from "@mui/icons-material/Alarm";

import {SlideData} from "../helpers";

import "../styling/slide.css";

export default function Slide({
    category,
    minimal,
    stores,
    slideData
}: {
    category: string;
    minimal: boolean;
    stores: unknown;
    slideData: SlideData;
}) {
    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(slideData.likeCount);
    const [openPopup, setOpenPopup] = useState(false);

    const likeRef = useRef(null);

    const handleClick = (event) => {
        if (event.target.className.includes) {
            if (!event.target.className.includes("favIconArea")) {
                setOpenPopup(true);
            }
        } else if (event.target.tagName !== "path") {
            setOpenPopup(true);
        }
    };

    return (
        <>
            <div
                className={`slideCont${slideData.isSold ? " slideCont--sold" : ""}`}
                onClick={minimal ? undefined : handleClick}
            >
                <div className="slideImgCont">
                    <img
                        className={`slideImg ${slideData.isSold ? "slideImg--sold" : ""}`}
                        alt="image"
                        src={slideData.image}
                    />
                    {slideData.isSold && <div className="itemSoldText">SOLD</div>}
                </div>
                <div className="slideInfoCont">
                    <div className="slideHeaderCont">
                        <div className="slideTitleCont">
                            <span className="slideTitle">{slideData.title}</span>
                            <span className="slidePrice">{slideData.price}</span>
                        </div>
                        {!minimal && (
                            <FavoriteItem
                                objRef={likeRef}
                                category={category}
                                liked={liked}
                                setLiked={setLiked}
                                likedCount={likedCount}
                                setLikedCount={setLikedCount}
                                id={slideData._id}
                            />
                        )}
                    </div>
                    <div className="slideStoreCont">
                        <LocationOnIcon />
                        <span className="slideStore">{slideData.store}</span>
                    </div>
                    <div className="slideTimeStampCont">
                        <AlarmIcon />
                        <span className="slideTimeStamp">{slideData.timeIndex}</span>
                    </div>
                </div>
            </div>
            {openPopup && (
                <InfoPopup slideData={slideData} category={category} togglePopup={setOpenPopup} />
            )}
        </>
    );
}
