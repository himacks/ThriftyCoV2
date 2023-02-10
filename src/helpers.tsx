import axios from "axios";

const TESTING = false;

export type SlideData = {
    title: string;
    store: string;
    date: string;
    price: string;
    image: string;
};

interface CategoryData {
    [name: string]: SlideData[];
}

const getBaseURL = () => {
    return TESTING ? "http://localhost:3030" : "https://thrifty-co-backend.vercel.app";
};

export const getImgSrc = (imageSrc) => {
    return `${getBaseURL()}/images/${imageSrc}`;
};

export const getInitialData = (): Promise<{categories: string[]; clothing: CategoryData}> => {
    return new Promise((resolve) => {
        axios.get(`${getBaseURL()}/getInitialData`).then((result) => {
            resolve(result.data);
        });
    });
};

export const postClothingData = (clothingData) => {
    return new Promise((resolve) => {
        axios
            .post(`${getBaseURL()}/postClothingItem`, {
                clothingData: clothingData
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

export const postClothingImg = (fileFormData) => {
    return new Promise((resolve) => {
        axios
            .post(
                `${getBaseURL()}/postClothingItem`,

                fileFormData,
                {
                    headers: {
                        "Content-type": "multipart/form-data"
                    }
                }
            )
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};
