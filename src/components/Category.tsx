import React from "react";
import Slide from "./Slide";

import "../styling/category.css";

export default function Category({
    id,
    clothingData,
    likedItems,
    flaggedMissingItems,
    category,
    stores,
    isActive
}) {
    return (
        <div key={id} className={`categoryCont${isActive ? " categoryCont--active" : ""}`}>
            {clothingData &&
                clothingData.map((slideData, index) => {
                    const storeObj = stores.find((store) => store.store === slideData.store);

                    return (
                        <Slide
                            key={index}
                            minimal={false}
                            storeData={storeObj}
                            likedItems={likedItems}
                            flaggedMissingItems={flaggedMissingItems}
                            category={category}
                            slideData={slideData}
                        />
                    );
                })}
        </div>
    );
}
