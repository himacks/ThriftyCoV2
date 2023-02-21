import React, {useRef, useEffect} from "react";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "qrcode";

import "../styling/infopopup.css";

export default function InfoPopup({itemName, category, id, togglePopup}) {
    const bgRef = useRef(null);
    const canvasRef = useRef();

    const handleClick = (event) => {
        event.target === bgRef.current && togglePopup(false);
    };

    useEffect(() => {
        QRCode.toCanvas(canvasRef.current, JSON.stringify({category, id}) || " ");
    }, [category, id]);

    return (
        <div ref={bgRef} onClick={handleClick} className="popupBackground">
            <div className="popupCont">
                <div className="closePopUpCont">
                    <CloseIcon
                        className="closePopUpBtn"
                        fontSize="medium"
                        onClick={() => {
                            togglePopup(false);
                        }}
                    />
                </div>
                <div className="popupHeader">
                    {/* This is going to contain, the item picture, a map pin of the store, a forward
                    button to send you straight to google maps or apple maps to get directions,
                    store address, etc. */}
                    <div className="popupTitle">{itemName}</div>
                </div>
                <div className="qrCodeCont">
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    );
}
