import React, {useState, useEffect, useRef, useMemo} from "react";
import {postClothingItem} from "../helpers";
import {getCategories, getStores, StoreType, CategoryType} from "../helpers";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";

import "../styling/postingpage.css";

export default function PostingPage() {
    const [categories, setCategories] = useState<CategoryType[]>(undefined);
    const [connectedStores, setConnectedStores] = useState<StoreType[]>(undefined);

    useEffect(() => {
        getCategories().then((result) => {
            setCategories(result.categories);
        });
        getStores().then((result) => {
            setConnectedStores(result.stores);
        });
    }, []);

    const emptyForm = {
        title: {value: "", error: false},
        store: {value: {store: ""}, error: false},
        category: {value: {category: ""}, error: false},
        date: {value: "butterfly", error: false}, //need this because when we check for form validation this must be filled but its not filled here its filled on the serverside
        price: {value: "", error: false},
        image: {value: "", error: false}
    };

    const [formData, setFormData] = useState(emptyForm);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [postSubmitMsg, setPostSubmitMsg] = useState<
        {success: boolean; value: string} | undefined
    >();

    const fileUploadRef = useRef(null);

    const handleFormChange = (event, parameter, menuVal = undefined) => {
        postSubmitMsg && setPostSubmitMsg(undefined);

        let value = event.target.value;

        if (parameter === "image") {
            const file = event.target.files[0];
            setSelectedFile(file);
            value = file.name;
        } else if (["category", "store"].includes(parameter)) {
            value = menuVal;
        }

        setFormData({...formData, ...{[parameter]: {value: value, error: false}}});
    };

    const validateForm = () => {
        let formIsComplete = true;

        const errorUpdatedForm = Object.assign({}, emptyForm);

        for (const [field, data] of Object.entries(formData)) {
            errorUpdatedForm[field] = {value: data.value, error: !data.value};
            !data.value && (formIsComplete = false);
        }

        setFormData(errorUpdatedForm);

        return formIsComplete;
    };

    const handleSubmit = () => {
        setPostSubmitMsg({success: false, value: "loading"});

        if (validateForm()) {
            const formFileData = new FormData();
            formFileData.append("title", formData.title.value);
            formFileData.append("price", formData.price.value);
            formFileData.append("store", formData.store.value.store);
            formFileData.append("category", formData.category.value.category);
            formFileData.append(
                "fileName",
                `${formData.category.value.category}-${Date.now()}.${
                    selectedFile.type.split("/")[1]
                }`
            );
            formFileData.append("timeIndex", `${Date.now()}`);
            formFileData.append("files", selectedFile);

            postClothingItem(formFileData).then((apiResponse: {success: boolean}) => {
                const msg = apiResponse.success
                    ? "Success: Clothing Item is now live!"
                    : "Error: Something in the backend messed up sorry.";
                setPostSubmitMsg({success: apiResponse.success, value: msg});

                if (apiResponse.success) {
                    setFormData(emptyForm);
                    fileUploadRef.current.value = null;
                }
            });
        } else {
            setPostSubmitMsg({success: false, value: "Error: Form not complete."});
        }
    };

    const categoryFilter = createFilterOptions<CategoryType>();
    const storeFilter = createFilterOptions<StoreType>();

    return (
        <>
            <div className="bgCont" />
            <div className="formBackground">
                {categories && connectedStores && (
                    <div className="formCont">
                        <div className="formHeader">Upload New Clothing Item</div>
                        <div className="inputCont titleCont">
                            <div className="inputLabel">Title:</div>
                            <input
                                className={`formInput ${
                                    formData.title.error ? "formInput--error" : ""
                                }`}
                                value={formData.title.value}
                                onChange={(event) => {
                                    handleFormChange(event, "title");
                                }}
                            ></input>
                        </div>
                        <div className="inputCont priceCont">
                            <div className="inputLabel">Price:</div>
                            <input
                                className={`formInput ${
                                    formData.price.error ? "formInput--error" : ""
                                }`}
                                value={formData.price.value}
                                onChange={(event) => {
                                    handleFormChange(event, "price");
                                }}
                            ></input>
                        </div>
                        <div className="inputCont categoriesCont">
                            <Autocomplete
                                value={formData.category.value.category}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === "string") {
                                        handleFormChange(event, "category", {
                                            category: newValue
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        handleFormChange(event, "category", {
                                            category: newValue.inputValue
                                        });
                                    } else {
                                        handleFormChange(event, "category", {
                                            category: newValue
                                        });
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = categoryFilter(options, params);

                                    const {inputValue} = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some(
                                        (option) => inputValue === option.category
                                    );
                                    if (inputValue !== "" && !isExisting) {
                                        filtered.push({
                                            inputValue,
                                            category: `Add "${inputValue}"`
                                        });
                                    }

                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="category-selection-menu"
                                options={categories}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === "string") {
                                        return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                        return option.inputValue;
                                    }
                                    // Regular option
                                    return option.category;
                                }}
                                renderOption={(props, option) => (
                                    <li {...props}>{option.category}</li>
                                )}
                                sx={{width: 300}}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} label="Clothing Category" />
                                )}
                            />
                        </div>
                        <div className="inputCont locationCont">
                            <Autocomplete
                                value={formData.store.value.store}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === "string") {
                                        handleFormChange(event, "store", {
                                            store: newValue
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        handleFormChange(event, "store", {
                                            store: newValue.inputValue
                                        });
                                    } else {
                                        handleFormChange(event, "store", {
                                            store: newValue
                                        });
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = storeFilter(connectedStores, params);

                                    const {inputValue} = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some(
                                        (option) => inputValue === option.store
                                    );
                                    if (inputValue !== "" && !isExisting) {
                                        filtered.push({
                                            inputValue,
                                            store: `Add "${inputValue}"`
                                        });
                                    }

                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="category-selection-menu"
                                options={connectedStores}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === "string") {
                                        return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                        return option.inputValue;
                                    }
                                    // Regular option
                                    return option.store;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.store}</li>}
                                sx={{width: 300}}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} label="Store Location" />
                                )}
                            />
                        </div>
                        <div className="inputCont imageCont">
                            <div className="inputLabel">Image:</div>
                            <input
                                type="file"
                                id="clothingImg"
                                ref={fileUploadRef}
                                className={`formUpload${
                                    formData.image.error ? " formInput--error" : ""
                                }`}
                                name="clothingImg"
                                accept="image/png, image/jpeg"
                                onChange={(event) => {
                                    handleFormChange(event, "image");
                                }}
                            ></input>
                        </div>
                        <div className="submitCont">
                            <button className="formSubmitBtn" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                )}
                {postSubmitMsg && postSubmitMsg.value === "loading" ? (
                    <div className="loadingCont">
                        <CircularProgress color="inherit" />
                        <div className="loadingText">Uploading Item...</div>
                    </div>
                ) : postSubmitMsg ? (
                    <div className={`submitMsgCont`}>
                        <div
                            className={`submitMsgText${
                                postSubmitMsg.success
                                    ? " submitMsgText--success"
                                    : " submitMsgText--failure"
                            }`}
                        >
                            {postSubmitMsg.value}
                        </div>
                    </div>
                ) : undefined}
            </div>
        </>
    );
}
