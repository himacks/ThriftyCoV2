import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../styling/favoriteitem.css";

export default function FavoriteItem({objRef, liked, handleLike, likedCount}) {
    return (
        <div ref={objRef} className="favItemBufferCont favIconArea">
            <div className="favoriteItemCont favIconArea" onClick={handleLike}>
                <FavoriteIcon className={`favIcon favIconArea${liked ? " favIcon--liked" : ""}`} />
                <div className={`favIconArea favoriteCount`}>{likedCount}</div>
            </div>
        </div>
    );
}
