import React, {useState} from "react";

import FavoriteItem from "./FavoriteItem";
import InfoPopup from "./InfoPopup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlarmIcon from "@mui/icons-material/Alarm";

import "../styling/slide.css";

export default function Slide({category, name, imageSrc, store, timestamp, price, likeCount, id}) {
    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(likeCount);
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <>
            <div
                className="slideCont"
                onClick={() => {
                    setOpenPopup(true);
                }}
            >
                <div className="slideImgCont">
                    <img className="slideImg" alt="image" src={imageSrc} />
                </div>
                <div className="slideInfoCont">
                    <div className="slideHeaderCont">
                        <span className="slideTitle">{name}</span>
                        <FavoriteItem
                            category={category}
                            liked={liked}
                            setLiked={setLiked}
                            likedCount={likedCount}
                            setLikedCount={setLikedCount}
                            id={id}
                        />
                    </div>
                    <span className="slidePrice">{price}</span>
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
            {openPopup && <InfoPopup togglePopup={setOpenPopup} />}
        </>
    );
}
