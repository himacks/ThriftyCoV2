import React, {useEffect, useState} from "react";

import Slider from "../components/Slider";

import {getClothingFromCategory, getCategories} from "../helpers";

export default function AppPage() {
    const [categories, setCategories] = useState(undefined);
    const [clothing, setClothing] = useState(undefined);

    useEffect(() => {
        getCategories().then((result) => {
            const retrievedCategories = result.categories;

            setCategories(retrievedCategories);
            retrievedCategories.forEach((category) => {
                getClothingFromCategory(category, 5).then((result) => {
                    setClothing((clothing) => {
                        return {...clothing, ...{[category]: result.items}};
                    });
                });
            });
        });
    }, []);

    return (
        <div className="appCont">
            {categories && clothing && <Slider categories={categories} clothing={clothing} />}
        </div>
    );
}
