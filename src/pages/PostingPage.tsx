import React, {useState, useEffect} from "react";
import {postClothingItem} from "../helpers";
import {getCategories} from "../helpers";

export default function PostingPage() {
    const [categories, setCategories] = useState(undefined);

    useEffect(() => {
        getCategories().then((result) => {
            setCategories(result.categories);
        });
    }, []);

    const emptyForm = {
        title: "",
        store: "",
        category: "",
        date: "",
        price: "",
        image: ""
    };

    const [formData, setFormData] = useState(emptyForm);
    const [selectedFile, setSelectedFile] = useState<File>();

    const handleFormChange = (event, parameter) => {
        let value = event.target.value;

        if (parameter === "image") {
            const file = event.target.files[0];
            setSelectedFile(file);
            value = file.name;
        }
        setFormData({...formData, ...{[parameter]: value}});
    };

    const handleSubmit = () => {
        if (
            formData.title &&
            formData.price &&
            formData.store &&
            formData.category &&
            formData.image
        ) {
            console.log(formData);

            const formFileData = new FormData();
            formFileData.append("title", formData.title);
            formFileData.append("price", formData.price);
            formFileData.append("store", formData.store);
            formFileData.append("category", formData.category);
            formFileData.append(
                "fileName",
                `${formData.category}-${Date.now()}.${selectedFile.type.split("/")[1]}`
            );
            formFileData.append("timeIndex", `${Date.now()}`);
            formFileData.append("files", selectedFile);

            postClothingItem(formFileData);

            setFormData(emptyForm);
        } else {
            console.log("form not complete");
        }
    };

    return (
        <div className="formCont">
            <div className="titleCont">
                Clothing Title:
                <input
                    value={formData.title}
                    onChange={(event) => {
                        handleFormChange(event, "title");
                    }}
                ></input>
            </div>
            <div className="categoriesCont">
                Clothing Category:
                {categories && (
                    <select
                        name="categories"
                        id="categories"
                        onChange={(event) => {
                            handleFormChange(event, "category");
                        }}
                        defaultValue={""}
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
            <div className="priceCont">
                Clothing Price:
                <input
                    value={formData.price}
                    onChange={(event) => {
                        handleFormChange(event, "price");
                    }}
                ></input>
            </div>
            <div className="locationCont">
                Clothing Location:
                <select
                    name="locations"
                    id="locations"
                    onChange={(event) => {
                        handleFormChange(event, "store");
                    }}
                    defaultValue={""}
                >
                    <option value="" disabled hidden>
                        Choose Location
                    </option>
                    <option value="Orange Circle Antique Mall">Orange Circle Antique Mall</option>
                    <option value="Orange Circle Antique Mall">{`McFly's Thrift Store`}</option>
                </select>
            </div>
            <div className="imageCont">
                Clothing Image:
                <input
                    type="file"
                    id="clothingImg"
                    name="clothingImg"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                        handleFormChange(event, "image");
                    }}
                ></input>
            </div>
            <div className="submitCont">
                <button className="submitButton" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}
