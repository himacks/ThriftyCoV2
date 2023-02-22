import React, {useState, useEffect} from "react";
import {QrReader} from "react-qr-reader";

import {getItemFromId, SlideData} from "../helpers";
import Slide from "../components/Slide";

import "../styling/scanningpage.css";

export default function ScanningPage() {
    const [itemData, setItemData] = useState<SlideData>(undefined);

    // useEffect(() => {
    //     !itemData &&
    //         setItemData({
    //             _id: "63ed4d6ebfb417406cee3a4d",
    //             title: "Sick Tote Bag",
    //             store: "Goodwill RARE",
    //             date: "2/15/2023 1:23PM",
    //             price: "$12.99",
    //             image: "https://d1vwklfh6dc59p.cloudfront.net/Bags-1676496237347.jpeg",
    //             timeIndex: "1676496237347",
    //             likeCount: 0
    //         });
    // }, [itemData]);

    const handleQRFind = (data) => {
        getItemFromId(data.category, data.id).then((itemData) => {
            setItemData(itemData);
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
                        onResult={(result, error) => {
                            if (result) {
                                handleQRFind(JSON.parse(result.getText()));
                            }
                        }}
                        className="qrReader"
                    />
                </>
            ) : (
                <Slide
                    category={undefined}
                    minimal={true}
                    likeCount={itemData.likeCount}
                    id={itemData._id}
                    name={itemData.title}
                    imageSrc={itemData.image}
                    store={itemData.store}
                    timestamp={itemData.date}
                    price={itemData.price}
                />
            )}
        </div>
    );
}
