import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppPage from "./pages/AppPage";
import FAQPage from "./pages/FAQPage";
import PostingPage from "./pages/PostingPage";

import {getCategories, getStores, getClothingFromCategory, StoreType} from "./helpers";

import "./styling/app.css";

export default function App() {
    const [categories, setCategories] = useState(undefined);
    const [clothing, setClothing] = useState(undefined);
    const [connectedStores, setConnectedStores] = useState<StoreType[]>(undefined);

    useEffect(() => {
        getStores().then(({stores}) => {
            setConnectedStores(stores);
        });
        getCategories().then(({categories}) => {
            setCategories(categories);

            const retrievedCategories = categories.map((categoryObj) => categoryObj.category);

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
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<AppPage categories={categories} clothing={clothing} />}
                    />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route
                        path="/post"
                        element={
                            <PostingPage
                                categories={categories}
                                connectedStores={connectedStores}
                            />
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}
