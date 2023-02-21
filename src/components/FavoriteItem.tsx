import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {updateItemLikes} from "../helpers";
import "../styling/favoriteitem.css";

export default function FavoriteItem({
    objRef,
    category,
    liked,
    setLiked,
    likedCount,
    setLikedCount,
    id
}) {
    const handleClick = () => {
        setLikedCount(!liked ? likedCount + 1 : likedCount - 1);
        setLiked(!liked);
        updateItemLikes(category, id, !liked);
    };

    return (
        <div ref={objRef} className="favItemBufferCont favIconArea">
            <div className="favoriteItemCont favIconArea" onClick={handleClick}>
                <FavoriteIcon className={`favIcon favIconArea${liked ? " favIcon--liked" : ""}`} />
                <div className={`favIconArea favoriteCount`}>{likedCount}</div>
            </div>
        </div>
    );
}
