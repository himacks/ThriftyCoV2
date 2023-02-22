import React, {useState, useRef} from "react";

import FavoriteItem from "./FavoriteItem";
import InfoPopup from "./InfoPopup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlarmIcon from "@mui/icons-material/Alarm";

import "../styling/slide.css";

export default function Slide({
    category,
    minimal,
    name,
    imageSrc,
    store,
    timestamp,
    isSold,
    price,
    likeCount,
    id
}) {
    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(likeCount);
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
                className={`slideCont${isSold ? " slideCont--sold" : ""}`}
                onClick={minimal ? undefined : handleClick}
            >
                <div className="slideImgCont">
                    <img
                        className={`slideImg ${isSold ? "slideImg--sold" : ""}`}
                        alt="image"
                        src={imageSrc}
                    />
                    {isSold && <div className="itemSoldText">SOLD</div>}
                </div>
                <div className="slideInfoCont">
                    <div className="slideHeaderCont">
                        <div className="slideTitleCont">
                            <span className="slideTitle">{name}</span>
                            <span className="slidePrice">{price}</span>
                        </div>
                        {!minimal && (
                            <FavoriteItem
                                objRef={likeRef}
                                category={category}
                                liked={liked}
                                setLiked={setLiked}
                                likedCount={likedCount}
                                setLikedCount={setLikedCount}
                                id={id}
                            />
                        )}
                    </div>
                    <div className="slideStoreCont">
                        <LocationOnIcon />
                        <span className="slideStore">{store}</span>
                    </div>
                    <div className="slideTimeStampCont">
                        <AlarmIcon />
                        <span className="slideTimeStamp">{timestamp}</span>
                    </div>
                </div>
            </div>
            {openPopup && (
                <InfoPopup itemName={name} category={category} id={id} togglePopup={setOpenPopup} />
            )}
        </>
    );
}
