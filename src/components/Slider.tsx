import React, {useEffect, useState, useRef} from "react";

import Category from "./Category";

import SearchIcon from "@mui/icons-material/Search";

import {getClothingFromCategory, getClothingFromSearch} from "../helpers";

import "../styling/slider.css";

export default function Slider({setClothing, categories, stores, clothing}) {
    const [activeSlide, setActiveSlide] = useState(categories[0]);
    const [searchValue, setSearchValue] = useState("");

    const queriedSearchVal = useRef("");

    function onKeyDownHandler(event) {
        if (event.keyCode === 13 && searchValue) {
            getClothingFromSearch(searchValue).then((foundItems) => {
                setClothing((clothing) => {
                    setActiveSlide("SearchQuery");
                    queriedSearchVal.current = searchValue;
                    return {...clothing, ...{SearchQuery: foundItems}};
                });
            });
        } else {
            setSearchValue(event.currentTarget.value);
        }
    }

    useEffect(() => {
        // adjust this to trigger if scrolled to far aswell, modify function to account for start index and end index
        if (!clothing[activeSlide]) {
            getClothingFromCategory(activeSlide, 5).then((result) => {
                setClothing((clothing) => {
                    return {...clothing, ...{[activeSlide]: result.items}};
                });
            });
        }
    }, [activeSlide, clothing, setClothing]);

    return (
        <>
            <div className="sliderHeaderCont">
                <div className="categoryListCont">
                    <div
                        className={`categorySearchCont${
                            activeSlide === "SearchQuery" ? " categorySearchCont--active" : ""
                        }`}
                    >
                        <input
                            value={searchValue}
                            onChange={onKeyDownHandler}
                            onKeyDown={onKeyDownHandler}
                            className="categorySearchBox"
                            placeholder="Search for item"
                        />
                        <SearchIcon className="categorySearchIcon" />
                    </div>
                    {categories.map((category, index) => {
                        return (
                            category !== "SearchQuery" && (
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
                            )
                        );
                    })}
                </div>
                <div className="categoryTitleCont">
                    <div className="categoryTitle">
                        {activeSlide === "SearchQuery"
                            ? `Results for "${queriedSearchVal.current}"`
                            : activeSlide}
                    </div>
                </div>
            </div>
            <div className="itemCont">
                {categories.map((category, index) => {
                    return (
                        <Category
                            key={index}
                            id={index}
                            stores={stores}
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
