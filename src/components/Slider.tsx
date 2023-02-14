import React, {useEffect, useState} from "react";

import Category from "./Category";

import "../styling/slider.css";

export default function Slider({categories, clothing}) {
    const [activeSlide, setActiveSlide] = useState(categories[0]);

    return (
        <>
            <div className="categoryListCont">
                {categories.map((category, index) => {
                    return (
                        <div
                            className={`categoryButton${
                                activeSlide === category ? " categoryButton--active" : ""
                            }`}
                            onClick={() => {
                                setActiveSlide(category);
                            }}
                            key={index}
                        >
                            {category}
                        </div>
                    );
                })}
            </div>
            <div className="categoryTitle">{activeSlide}</div>
            <div className="itemCont">
                {categories.map((category, index) => {
                    return (
                        <Category
                            key={index}
                            category={category}
                            clothingData={clothing[category]}
                            isActive={activeSlide === category}
                        />
                    );
                })}
            </div>
        </>
    );
}

// {Object.entries(slideDataList).map(([idk, {category, data}], index) => (
//     <div className="sliderCont" key={index}>
//         <>
//             <h1>{category}</h1>
//             {data.map((slideData, i) => {
//                 return (
//                     <>
//                         <Slide
//                             key={i}
//                             name={slideData.title}
//                             imageSrc={slideData.imageSrc}
//                             store={slideData.store}
//                             timestamp={slideData.timestamp}
//                             price={slideData.price}
//                         />
//                     </>
//                 );
//             })}
//         </>
//     </div>
// ))}
