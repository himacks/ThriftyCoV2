import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppPage from "./pages/AppPage";
import FAQPage from "./pages/FAQPage";
import PostingPage from "./pages/PostingPage";
import ScanningPage from "./pages/ScanningPage";

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
            const adjCategories = categories.concat({category: "SearchQuery"});

            setCategories(adjCategories);

            const retrievedCategories = adjCategories.map((categoryObj) => categoryObj.category);

            const initialCategory = retrievedCategories[0];

            getClothingFromCategory(initialCategory, 10).then((result) => {
                setClothing((clothing) => {
                    return {...clothing, ...{[initialCategory]: result.items}};
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
                        element={
                            <AppPage
                                setClothing={setClothing}
                                categories={categories}
                                clothing={clothing}
                                connectedStores={connectedStores}
                            />
                        }
                    />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/scan" element={<ScanningPage />} />
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
