import React, {useEffect, useState} from "react";

import Slider from "../components/Slider";

export default function AppPage({setClothing, categories, connectedStores, clothing}) {
    const categoryList = categories
        ? categories.map((categoryObj) => categoryObj.category)
        : undefined;

    return (
        <>
            <div className="bgCont" />
            <div className="appCont">
                {categories && clothing && connectedStores && (
                    <Slider
                        setClothing={setClothing}
                        categories={categoryList}
                        stores={connectedStores}
                        clothing={clothing}
                    />
                )}
            </div>
        </>
    );
}
