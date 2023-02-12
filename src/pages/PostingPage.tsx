import React, {useState, useEffect} from "react";
import {postClothingItem} from "../helpers";
import {getCategories} from "../helpers";
import {InfinitySpin} from "react-loader-spinner";

import "../styling/postingpage.css";

export default function PostingPage() {
    const [categories, setCategories] = useState(undefined);

    useEffect(() => {
        getCategories().then((result) => {
            setCategories(result.categories);
        });
    }, []);

    const emptyForm = {
        title: {value: "", error: false},
        store: {value: "", error: false},
        category: {value: "", error: false},
        date: {value: "butterfly", error: false},
        price: {value: "", error: false},
        image: {value: "", error: false}
    };

    const [formData, setFormData] = useState(emptyForm);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [postSubmitMsg, setPostSubmitMsg] = useState<
        {success: boolean; value: string} | undefined
    >();

    const handleFormChange = (event, parameter) => {
        postSubmitMsg && setPostSubmitMsg(undefined);

        let value = event.target.value;

        if (parameter === "image") {
            const file = event.target.files[0];
            setSelectedFile(file);
            value = file.name;
        }
        setFormData({...formData, ...{[parameter]: {value: value, error: false}}});
    };

    const validateForm = () => {
        let formIsComplete = true;

        const errorUpdatedForm = emptyForm;

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
            formFileData.append("store", formData.store.value);
            formFileData.append("category", formData.category.value);
            formFileData.append(
                "fileName",
                `${formData.category.value}-${Date.now()}.${selectedFile.type.split("/")[1]}`
            );
            formFileData.append("timeIndex", `${Date.now()}`);
            formFileData.append("files", selectedFile);

            postClothingItem(formFileData).then((apiResponse: {success: boolean}) => {
                const msg = apiResponse.success
                    ? "Success: Clothing Item is now live!"
                    : "Error: Something in the backend messed up sorry.";
                setPostSubmitMsg({success: apiResponse.success, value: msg});
            });
            setFormData(emptyForm);
        } else {
            setPostSubmitMsg({success: false, value: "Error: Form not complete."});
        }
    };

    return (
        <div className="formBackground">
            <div className="formCont">
                <div className="formHeader">Upload New Clothing Item</div>
                <div className="inputCont titleCont">
                    <div className="inputLabel">Title:</div>
                    <input
                        className={`formInput ${formData.title.error ? "formInput--error" : ""}`}
                        value={formData.title.value}
                        onChange={(event) => {
                            handleFormChange(event, "title");
                        }}
                    ></input>
                </div>
                <div className="inputCont categoriesCont">
                    <div className="inputLabel">Category:</div>
                    {categories && (
                        <select
                            className={`formInput formSelect${
                                formData.category.error ? " formInput--error" : ""
                            }`}
                            name="categories"
                            id="categories"
                            onChange={(event) => {
                                handleFormChange(event, "category");
                            }}
                            value={formData.category.value}
                        >
                            <option value="" disabled hidden>
                                Choose Category
                            </option>
                            {categories.map((category, index) => {
                                return (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                </div>
                <div className="inputCont priceCont">
                    <div className="inputLabel">Price:</div>
                    <input
                        className={`formInput ${formData.price.error ? "formInput--error" : ""}`}
                        value={formData.price.value}
                        onChange={(event) => {
                            handleFormChange(event, "price");
                        }}
                    ></input>
                </div>
                <div className="inputCont locationCont">
                    <div className="inputLabel">Location:</div>
                    <select
                        className={`formInput formSelect${
                            formData.store.error ? " formInput--error" : ""
                        }`}
                        name="locations"
                        id="locations"
                        onChange={(event) => {
                            handleFormChange(event, "store");
                        }}
                        value={formData.store.value}
                    >
                        <option value="" disabled hidden>
                            Choose Location
                        </option>
                        <option value="Orange Circle Antique Mall">
                            Orange Circle Antique Mall
                        </option>
                        <option value="Orange Circle Antique Mall">{`McFly's Thrift Store`}</option>
                    </select>
                </div>
                <div className="inputCont imageCont">
                    <div className="inputLabel">Image:</div>
                    <input
                        type="file"
                        id="clothingImg"
                        className={`formUpload${formData.image.error ? " formInput--error" : ""}`}
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
            {postSubmitMsg && postSubmitMsg.value === "loading" ? (
                <div className="loadingCont">
                    <InfinitySpin width="200" color="#000" />
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
    );
}
