import axios from "axios";

const TESTING = false;

export type SlideData = {
    category?: string;
    _id: unknown;
    title: string;
    store: string;
    date: string;
    price: string;
    image: string;
    timeIndex: string;
    likeCount: number;
    isSold: boolean;
};

interface CategoryData {
    [name: string]: SlideData[];
}

export interface StoreType {
    _id?: unknown;
    inputValue?: string;
    store: string;
}

export interface CategoryType {
    _id?: unknown;
    inputValue?: string;
    category: string;
}

const getBaseURL = () => {
    return TESTING ? "http://localhost:3030" : "https://thrifty-co-backend.vercel.app";
};

export const getImgSrc = (imageSrc) => {
    return `${getBaseURL()}/images/${imageSrc}`;
};

export const getCategories = (): Promise<{categories: CategoryType[]}> => {
    return new Promise((resolve) => {
        axios.get(`${getBaseURL()}/getCategories`).then((result) => {
            resolve(result.data);
        });
    });
};

export const getStores = (): Promise<{stores: StoreType[]}> => {
    return new Promise((resolve) => {
        axios.get(`${getBaseURL()}/getStores`).then((result) => {
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

export const getItemFromId = (category, id): Promise<SlideData> => {
    const data = {collection: category, clothingId: id};

    return new Promise((resolve, reject) => {
        axios.get(`${getBaseURL()}/getItemFromId`, {params: data}).then((result) => {
            resolve(result.data.item);
        });
    });
};

export const markItemSold = (collection, id) => {
    const data = {collection: collection, clothingId: id};

    return new Promise((resolve, reject) => {
        axios
            .post(`${getBaseURL()}/markItemSold`, data)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const updateItemLikes = (collection, id, increase: boolean) => {
    const data = {collection: collection, clothingId: id, increase: increase};

    return new Promise((resolve, reject) => {
        axios
            .post(`${getBaseURL()}/updateItemLikes`, data)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const postClothingItem = (fileFormData) => {
    return new Promise((resolve, reject) => {
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
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};
