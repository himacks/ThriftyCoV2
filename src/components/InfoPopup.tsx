import React, {useRef, useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QRCode from "qrcode";
import {SlideData, StoreData, updateMissingCount, TrackGAEvent} from "../helpers";
import DirectionsIcon from "@mui/icons-material/Directions";
import {Cookie} from "universal-cookie";

import "../styling/infopopup.css";

export default function InfoPopup({
    slideData,
    category,
    storeData,
    missingCount,
    setMissingCount,
    togglePopup,
    flaggedMissingItems,
    cookies
}: {
    slideData: SlideData;
    category: string;
    storeData: StoreData;
    missingCount: number;
    setMissingCount: React.Dispatch<React.SetStateAction<number>>;
    togglePopup: React.Dispatch<React.SetStateAction<boolean>>;
    flaggedMissingItems: React.RefObject<string[]>;
    cookies: Cookie;
}) {
    const bgRef = useRef(null);
    const canvasRef = useRef();
    const [missing, setMissing] = useState(
        flaggedMissingItems.current.includes(slideData._id) || false
    );

    const handleBgClick = (event) => {
        event.target === bgRef.current && togglePopup(false);
    };

    const handleDirClick = () => {
        TrackGAEvent(slideData.store, "getDirectionsClick", slideData.title);
    };

    const handleMissingClick = () => {
        setMissingCount(!missing ? missingCount + 1 : missingCount - 1);
        setMissing(!missing);
        if (!missing) {
            flaggedMissingItems.current.push(slideData._id);
            TrackGAEvent(slideData.store, "itemMarkedMissing", slideData.title);
        } else {
            flaggedMissingItems.current.splice(
                flaggedMissingItems.current.indexOf(slideData._id),
                1
            );
        }

        cookies.set("flaggedMissingItems", JSON.stringify(flaggedMissingItems.current), {
            path: "/"
        });

        updateMissingCount(category, slideData._id, !missing);
    };

    useEffect(() => {
        QRCode.toCanvas(canvasRef.current, JSON.stringify({category, id: slideData._id}) || " ");
    }, [category, slideData._id]);

    return (
        <div ref={bgRef} onClick={handleBgClick} className="popupBackground">
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
                            <div
                                className={`popupMissingButton${
                                    missing ? " popupMissingButton--clicked" : ""
                                }`}
                                onClick={handleMissingClick}
                            >
                                Report Missing
                            </div>
                            <div className={"popupMissingCount"}>
                                {`${missingCount} Thrifter(s) flagged as missing.`}
                            </div>
                            <div className="popupLocationCont">
                                <div className="popupStoreCont">
                                    <LocationOnIcon className="locationIcon" />
                                    <div className="popupStoreName">{slideData.store}</div>
                                </div>
                                <div className="popupStoreAddy">{storeData.address}</div>

                                <a
                                    href={`https://www.google.com/maps?saddr=Your+Location&daddr=${storeData.address.replace(
                                        " ",
                                        "+"
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="gMapsFwdBtn"
                                    onClick={handleDirClick}
                                >
                                    <DirectionsIcon className="popDirectionsIcon" />
                                    Get Directions
                                </a>
                            </div>
                        </div>
                        <div className={"popupHelpCont"}>
                            <div className="popupHelpText">
                                {/* Show this QR Code to the cashier for a discount! */}
                                In the future, this QR code may be used for discounts.
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
