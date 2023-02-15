import React from "react";

import "../styling/infopopup.css";

export default function InfoPopup({togglePopup}) {
    return (
        <div
            className="popupBackground"
            onClick={() => {
                togglePopup(false);
            }}
        >
            <div className="popupCont">
                <div className="popupHeader">
                    This is going to contain, the item picture, a map pin of the store, a forward
                    button to send you straight to google maps or apple maps to get directions,
                    store address, etc.
                </div>
            </div>
        </div>
    );
}
