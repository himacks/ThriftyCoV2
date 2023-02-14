import React, {useState} from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {updateItemLikes} from "../helpers";
import "../styling/favoriteitem.css";

export default function FavoriteItem({count, category, id}) {
    const [likeCount, setLikeCount] = useState(count);
    const [liked, setLiked] = useState(false);

    console.log(category, count);

    const handleClick = () => {
        setLikeCount(!liked ? likeCount + 1 : likeCount - 1);
        setLiked(!liked);
        updateItemLikes(category, id, !liked);
    };

    return (
        <div className="favoriteItemCont">
            <FavoriteIcon
                className={`favIcon ${liked ? " favIcon--liked" : ""}`}
                onClick={handleClick}
            />
            <div className={`favoriteCount`}>{likeCount}</div>
        </div>
    );
}
