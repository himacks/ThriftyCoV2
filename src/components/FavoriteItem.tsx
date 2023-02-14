import React, {useState} from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {updateItemLikes} from "../helpers";
import "../styling/favoriteitem.css";

export default function FavoriteItem({category, liked, setLiked, likedCount, setLikedCount, id}) {
    const handleClick = () => {
        setLikedCount(!liked ? likedCount + 1 : likedCount - 1);
        setLiked(!liked);
        updateItemLikes(category, id, !liked);
    };

    return (
        <div className="favoriteItemCont">
            <FavoriteIcon
                className={`favIcon ${liked ? " favIcon--liked" : ""}`}
                onClick={handleClick}
            />
            <div className={`favoriteCount`}>{likedCount}</div>
        </div>
    );
}
