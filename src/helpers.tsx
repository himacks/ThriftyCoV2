import axios from "axios";

const TESTING = false;

export type SlideData = {
    _id: unknown;
    title: string;
    store: string;
    date: string;
    price: string;
    image: string;
    timeIndex: string;
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

export const getCategories = (): Promise<{categories: string[]}> => {
    return new Promise((resolve) => {
        axios.get(`${getBaseURL()}/getCategories`).then((result) => {
            resolve(result.data);
        });
    });
};

export const getClothingFromCategory = (
    category: string,
    numItems: number
): Promise<{items: CategoryData}> => {
    const data = {category: category, numItems: numItems};

    return new Promise((resolve) => {
        axios.get(`${getBaseURL()}/getClothingItems`, {params: data}).then((result) => {
            resolve(result.data);
        });
    });
};

export const postClothingItem = (fileFormData) => {
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
