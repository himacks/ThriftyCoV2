import React, {useEffect, useState} from "react";

import Slider from "../components/Slider";

export default function AppPage({categories, clothing}) {
    const categoryList = categories
        ? categories.map((categoryObj) => categoryObj.category)
        : undefined;

    return (
        <>
            <div className="bgCont" />
            <div className="appCont">
                {categories && clothing && <Slider categories={categoryList} clothing={clothing} />}
            </div>
        </>
    );
}
