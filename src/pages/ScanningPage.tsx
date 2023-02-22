import React, {useState, useRef} from "react";
import {QrReader} from "react-qr-reader";

import "../styling/scanningpage.css";

export default function ScanningPage() {
    const [qrData, setQrData] = useState(undefined);

    const qrReaderRef = useRef(null);

    const handleScan = (data) => {
        if (data) {
            setQrData(JSON.parse(data.text));
        }
    };
    const handleError = (err) => {
        console.error(err);
    };

    const openImageDialog = () => {
        qrReaderRef.current.openImageDialog();
    };

    return (
        <div className="qrReaderCont">
            {!qrData ? (
                <>
                    <QrReader
                        constraints={{
                            facingMode: "environment"
                        }}
                        onResult={(result, error) => {
                            if (result) {
                                setQrData(JSON.parse(result.getText()));
                            }
                        }}
                        className="qrReader"
                    />
                </>
            ) : (
                <div className="itemCont">{`Category: ${qrData.category}, ID: ${qrData.id}`}</div>
            )}
        </div>
    );
}
