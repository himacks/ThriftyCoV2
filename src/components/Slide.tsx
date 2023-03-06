import React, {useState, useRef} from "react";

import FavoriteItem from "./FavoriteItem";
import InfoPopup from "./InfoPopup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlarmIcon from "@mui/icons-material/Alarm";
import Cookies from "universal-cookie";

const cookies = new Cookies();

import {SlideData, StoreData, updateItemLikes} from "../helpers";

import "../styling/slide.css";

export default function Slide({
    category,
    minimal,
    storeData,
    slideData,
    likedItems,
    flaggedMissingItems
}: {
    category: string;
    minimal: boolean;
    storeData: StoreData;
    slideData: SlideData;
    likedItems?: React.RefObject<string[]>;
    flaggedMissingItems?: React.RefObject<string[]>;
}) {
    const [liked, setLiked] = useState(
        likedItems ? likedItems.current.includes(slideData._id) : false
    );
    const [likedCount, setLikedCount] = useState(slideData.likeCount);
    const [missingCount, setMissingCount] = useState(slideData.missingCount);
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

    const handleLike = () => {
        setLikedCount(!liked ? likedCount + 1 : likedCount - 1);
        setLiked(!liked);
        !liked
            ? likedItems.current.push(slideData._id)
            : likedItems.current.splice(likedItems.current.indexOf(slideData._id), 1);

        cookies.set("likedItems", JSON.stringify(likedItems.current), {path: "/"});

        updateItemLikes(category, slideData._id, !liked);
    };

    return (
        <>
            <div
                className={`slideCont${slideData.isSold ? " slideCont--sold" : ""}${
                    missingCount > 2 ? " slideCont--missing" : ""
                }`}
                onClick={minimal ? undefined : handleClick}
            >
                <div className="slideImgCont">
                    <img
                        className={`slideImg ${slideData.isSold ? "slideImg--sold" : ""}`}
                        alt="image"
                        src={slideData.image}
                    />
                    {slideData.isSold && <div className="itemSoldText">SOLD</div>}
                    {missingCount > 2 && <div className="itemMissingText">!</div>}
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
                                liked={liked}
                                handleLike={handleLike}
                                likedCount={likedCount}
                            />
                        )}
                    </div>
                    <div className="slideStoreCont">
                        <LocationOnIcon />
                        <span className="slideStore">{slideData.store}</span>
                    </div>
                    <div className="slideTimeStampCont">
                        <AlarmIcon />
                        <span className="slideTimeStamp">{slideData.date}</span>
                    </div>
                </div>
            </div>
            {openPopup && (
                <InfoPopup
                    slideData={slideData}
                    storeData={storeData}
                    category={category}
                    missingCount={missingCount}
                    setMissingCount={setMissingCount}
                    flaggedMissingItems={flaggedMissingItems}
                    togglePopup={setOpenPopup}
                    cookies={cookies}
                />
            )}
        </>
    );
}
