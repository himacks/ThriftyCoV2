import React from "react";

import Slider from "../components/Slider";

import {tabs} from "../helpers";

export default function AppPage() {
    return (
        <div className="appCont">
            <Slider allSlideData={tabs} />
        </div>
    );
}
