import React, {useRef, useEffect} from "react";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "qrcode";
import {SlideData, StoreData} from "../helpers";
import DirectionsIcon from "@mui/icons-material/Directions";

import "../styling/infopopup.css";

export default function InfoPopup({
    slideData,
    category,
    storeData,
    togglePopup
}: {
    slideData: SlideData;
    category: string;
    storeData: StoreData;
    togglePopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const bgRef = useRef(null);
    const canvasRef = useRef();

    const handleClick = (event) => {
        event.target === bgRef.current && togglePopup(false);
    };

    useEffect(() => {
        QRCode.toCanvas(canvasRef.current, JSON.stringify({category, id: slideData._id}) || " ");
    }, [category, slideData._id]);

    return (
        <div ref={bgRef} onClick={handleClick} className="popupBackground">
            <div className="popupContBackground">
                <div className="closePopUpCont">
                    <CloseIcon
                        className="closePopUpBtn"
                        fontSize="medium"
                        onClick={() => {
                            togglePopup(false);
                        }}
                    />
                </div>
                <div className="popupCont">
                    <div className={"popupImgCont"}>
                        <img className={`popupImg`} alt="image" src={slideData.image} />
                    </div>
                    <div className={"popupInfoCont"}>
                        <div className="popupHeaderCont">
                            {/* This is going to contain, the item picture, a map pin of the store, a forward
                    button to send you straight to google maps or apple maps to get directions,
                    store address, etc. */}
                            <div className="popupTitle">{slideData.title}</div>
                            <div className="popupPrice">{slideData.price}</div>
                            <div className="popupLocationCont">
                                <div className="popupStoreName">{slideData.store}</div>
                                <a
                                    href={`https://www.google.com/maps?saddr=Your+Location&daddr=${storeData.address.replace(
                                        " ",
                                        "+"
                                    )}`}
                                    className="gMapsFwdBtn"
                                >
                                    <DirectionsIcon />
                                    Get Directions
                                </a>
                            </div>
                        </div>
                        <div className={"popupHelpCont"}>
                            <div className="popupHelpText">
                                Show this QR Code to the cashier for a discount!
                            </div>
                        </div>
                        <div className="qrCodeCont">
                            <canvas className="qrCodeDisplay" ref={canvasRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
