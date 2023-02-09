import React, {useEffect, useState} from "react";

import Slider from "../components/Slider";

import {tabs, getInitialData} from "../helpers";

export default function AppPage() {
    const [categories, setCategories] = useState(undefined);
    const [clothing, setClothing] = useState(undefined);

    useEffect(() => {
        getInitialData().then((result) => {
            setCategories(result.categories);
            setClothing(result.clothing);
        });
    }, []);

    return (
        <div className="appCont">
            {categories && clothing && <Slider categories={categories} clothing={clothing} />}
        </div>
    );
}
