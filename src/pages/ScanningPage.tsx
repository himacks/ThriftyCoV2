import React, {useState, useEffect} from "react";
import {QrReader} from "react-qr-reader";
import {useParams} from "react-router-dom";

import {getItemFromId, SlideData, markItemSold, TrackGAPageview, TrackGAEvent} from "../helpers";
import Slide from "../components/Slide";
import AccessDenied from "components/AccessDenied";
import {verifyToken} from "../helpers";

import "../styling/scanningpage.css";

export default function ScanningPage() {
    const [itemData, setItemData] = useState<SlideData>(undefined);
    const [itemSold, setItemSold] = useState(false);
    const [isVerified, setVerified] = useState<boolean | null>(null);

    const {urlCategory, urlId} = useParams();

    useEffect(() => {
        if (urlCategory && urlId) {
            console.log(urlCategory, urlId);
            getItemFromId(urlCategory, urlId).then((itemData) => {
                console.log(itemData);
                if (itemData.isSold) {
                    setItemSold(true);
                    console.log("item is already sold");
                }
                setItemData({...{category: urlCategory}, ...itemData});
            });
        }
    }, [urlCategory, urlId]);

    const handleQRConfirm = () => {
        markItemSold(itemData.category, itemData._id).then(() => {
            setItemSold(true);

            TrackGAEvent(itemData.category, "qrCodeScan", itemData.title);

            setTimeout(() => {
                setItemData(undefined);
            }, 3000);
        });
    };

    useEffect(() => {
        TrackGAPageview(window.location.pathname, "Scanning Page Visit");

        verifyToken().then((result) => {
            setVerified(result);
        });
    }, []);

    const handleQRCancel = () => {
        setItemData(undefined);
    };

    const handleQRFind = (data) => {
        getItemFromId(data.category, data.id).then((itemData) => {
            if (itemData.isSold) {
                setItemSold(true);
                console.log("item is already sold");
            }
            setItemData({...{category: data.category}, ...itemData});
        });
    };

    return (
        <>
            <div className="bgCont" />
            {isVerified === true && (
                <div className="qrReaderCont">
                    {!itemData ? (
                        <>
                            <QrReader
                                constraints={{
                                    facingMode: "environment"
                                }}
                                scanDelay={1000}
                                onResult={(result) => {
                                    if (result) {
                                        handleQRFind(JSON.parse(result.getText()));
                                    }
                                }}
                                className="qrReader"
                            />
                        </>
                    ) : (
                        <>
                            <Slide
                                category={itemData.category}
                                storeData={undefined}
                                minimal={true}
                                slideData={itemData}
                            />
                            <div className="soldButtonCont">
                                <button
                                    onClick={handleQRConfirm}
                                    className={`scanButton confirmSoldBtn${
                                        itemSold ? " scanButton--inactive" : ""
                                    }`}
                                >
                                    Mark Item Sold
                                </button>
                                <button
                                    onClick={handleQRCancel}
                                    className="scanButton cancelSoldBtn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
            {isVerified === false && <AccessDenied />}
        </>
    );
}
