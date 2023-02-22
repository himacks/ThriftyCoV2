import React from "react";
import Slide from "./Slide";

import "../styling/category.css";

export default function Category({id, clothingData, category, isActive}) {
    return (
        <div key={id} className={`categoryCont${isActive ? " categoryCont--active" : ""}`}>
            {clothingData &&
                clothingData.map((slideData, index) => {
                    return (
                        <Slide
                            key={index}
                            minimal={false}
                            category={category}
                            slideData={slideData}
                        />
                    );
                })}
        </div>
    );
}
