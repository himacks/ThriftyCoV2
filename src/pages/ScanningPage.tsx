import React, {useState, useEffect} from "react";
import {QrReader} from "react-qr-reader";

import {getItemFromId, SlideData, markItemSold} from "../helpers";
import Slide from "../components/Slide";

import "../styling/scanningpage.css";

export default function ScanningPage() {
    const [itemData, setItemData] = useState<SlideData>(undefined);
    const [itemSold, setItemSold] = useState(false);

    const handleQRConfirm = () => {
        markItemSold(itemData.category, itemData._id).then(() => {
            setItemSold(true);

            setTimeout(() => {
                setItemData(undefined);
            }, 3000);
        });
    };

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
                        stores={undefined}
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
                        <button onClick={handleQRCancel} className="scanButton cancelSoldBtn">
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
