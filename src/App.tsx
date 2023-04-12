import React, {useEffect, useState, useRef} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppPage from "./pages/AppPage";
import FAQPage from "./pages/FAQPage";
import PostingPage from "./pages/PostingPage";
import ScanningPage from "./pages/ScanningPage";
import IntroPopup from "./components/IntroPopup";
import Cookies from "universal-cookie";

import {getCategories, getStores, getClothingFromCategory, StoreType, initGA} from "./helpers";

import "./styling/app.css";

import "./fonts/aAbstractGroovy.ttf";

const cookies = new Cookies();

export default function App() {
    const [categories, setCategories] = useState(undefined);
    const [clothing, setClothing] = useState(undefined);
    const [showPopup, setShowPopup] = useState(false);
    const [connectedStores, setConnectedStores] = useState<StoreType[]>(undefined);
    const likedItems = useRef([]);
    const flaggedMissingItems = useRef([]);

    useEffect(() => {
        initGA();

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

        if (cookies.get("likedItems")) {
            likedItems.current = cookies.get("likedItems");
        } else {
            cookies.set("likedItems", "[]", {path: "/"});
        }

        if (cookies.get("flaggedMissingItems")) {
            flaggedMissingItems.current = cookies.get("flaggedMissingItems");
        } else {
            cookies.set("flaggedMissingItems", "[]", {path: "/"});
        }

        if (!cookies.get("loadedBefore")) {
            setShowPopup(true);
        }
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
                                likedItems={likedItems}
                                flaggedMissingItems={flaggedMissingItems}
                                connectedStores={connectedStores}
                            />
                        }
                    />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/scan/:urlCategory?/:urlId?" element={<ScanningPage />} />
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
            {showPopup && <IntroPopup cookies={cookies} setShow={setShowPopup} />}
        </>
    );
}
