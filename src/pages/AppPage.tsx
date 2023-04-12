import React, {useEffect, useState} from "react";

import {TrackGAPageview} from "../helpers";
import HeaderNavBar from "components/HeaderNavBar";
import FullWidthImage from "components/FullWidthImage";
import QuoteDisplay from "components/QuoteDisplay";

import Slider from "../components/Slider";

export default function AppPage({
    setClothing,
    categories,
    likedItems,
    flaggedMissingItems,
    connectedStores,
    clothing
}) {
    const categoryList = categories
        ? categories.map((categoryObj) => categoryObj.category)
        : undefined;

    useEffect(() => {
        TrackGAPageview(window.location.pathname, "App Page Visit");
    }, []);

    return (
        <>
            <div className="bgCont" />
            <div className="appCont">
                <HeaderNavBar
                    bannerImage="https://d17vv5kmac4tms.cloudfront.net/thriftylogo.png"
                    shopElName="sliderHeaderCont"
                />
                <FullWidthImage />
                <QuoteDisplay quote="We need to responsibly manage our planet so that there is a sustainable future for future generations. When clothing trends change faster than ice turns to liquid, clothing turns into a dispensable commodity: merely a piece of trash." />
                <div className="functionalAppCont">
                    {categories && clothing && connectedStores && (
                        <Slider
                            setClothing={setClothing}
                            categories={categoryList}
                            likedItems={likedItems}
                            flaggedMissingItems={flaggedMissingItems}
                            stores={connectedStores}
                            clothing={clothing}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
