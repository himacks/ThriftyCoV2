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
                            category={category}
                            likeCount={slideData.likeCount}
                            id={slideData._id}
                            name={slideData.title}
                            imageSrc={slideData.image}
                            store={slideData.store}
                            timestamp={slideData.date}
                            price={slideData.price}
                        />
                    );
                })}
        </div>
    );
}
