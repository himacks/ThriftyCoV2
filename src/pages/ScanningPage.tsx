import React, {useState} from "react";
import QrReader from "react-qr-scanner";

import "../styling/scanningpage.css";

export default function ScanningPage() {
    const [qrData, setQrData] = useState(undefined);

    const handleScan = (data) => {
        console.log(data);

        if (data) {
            setQrData(JSON.parse(data.text));
        }
    };
    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="qrReaderCont">
            {!qrData ? (
                <QrReader
                    delay={2000}
                    className="qrReader"
                    facingMode="rear"
                    onError={handleError}
                    onScan={handleScan}
                />
            ) : (
                <div className="itemCont">{`Category: ${qrData.category}, ID: ${qrData.id}`}</div>
            )}
        </div>
    );
}
