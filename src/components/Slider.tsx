import React, {useEffect, useState} from "react";

import Slide from "./Slide";

import {SlideData, AllSlideData} from "../helpers";

import "../styling/slider.css";

export default function Slider({allSlideData}) {
    const [slideDataList, setSlideDataList] = useState<AllSlideData>(allSlideData);
    const [activeSlide, setActiveSlide] = useState(0);

    const categories = Object.entries(slideDataList).map(([idk, {category}], index) => {
        return category;
    });

    const setActive = (category) => {
        setActiveSlide(categories.indexOf(category));
    };

    useEffect(() => {
        console.log(activeSlide);
    }, [activeSlide]);

    return (
        <>
            <div className="categoryCont">
                {categories.map((category, index) => {
                    return (
                        <div
                            className="categoryButton"
                            onClick={() => {
                                setActive(category);
                            }}
                            key={index}
                        >
                            {category}
                        </div>
                    );
                })}
            </div>
            <div className="itemCont">
                {slideDataList[activeSlide].data.map((slideData, i) => {
                    return (
                        <>
                            <Slide
                                key={i}
                                name={slideData.title}
                                imageSrc={slideData.imageSrc}
                                store={slideData.store}
                                timestamp={slideData.timestamp}
                                price={slideData.price}
                            />
                        </>
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
