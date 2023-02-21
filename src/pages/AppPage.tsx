import React, {useEffect, useState} from "react";

import Slider from "../components/Slider";

export default function AppPage({setClothing, categories, clothing}) {
    const categoryList = categories
        ? categories.map((categoryObj) => categoryObj.category)
        : undefined;

    return (
        <>
            <div className="bgCont" />
            <div className="appCont">
                {categories && clothing && (
                    <Slider
                        setClothing={setClothing}
                        categories={categoryList}
                        clothing={clothing}
                    />
                )}
            </div>
        </>
    );
}
