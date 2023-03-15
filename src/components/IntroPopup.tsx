import React from "react";

import "../styling/intropopup.css";

export default function IntroPopup({cookies, setShow}) {
    const handleClick = () => {
        cookies.set("loadedBefore", true, {path: "/"});
        setShow(false);
    };

    return (
        <div className="introBgCont">
            <div className="contentCont">
                <div className="thriftyHeader">THRIFTY</div>
                <button className="enterPageBtn" onClick={handleClick}>
                    Enter
                </button>
                <div className="thriftyDesc">
                    Enter to join a force that is inspired by sustainability and makes thrifting
                    easier for you.
                </div>
            </div>
        </div>
    );
}
