import axios from "axios";
import ReactGA from "react-ga4";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const TESTING = !process.env.PRODUCTION;

export type SlideData = {
    category?: string;
    _id: string;
    title: string;
    store: string;
    date: string;
    price: string;
    image: string;
    timeIndex: string;
    likeCount: number;
    isSold: boolean;
    missingCount: number;
};

export type StoreData = {
    _id: unknown;
    store: string;
    address: string;
    location: {lat: number; lng: number};
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

export const initGA = () => {
    ReactGA.initialize("G-PK9CGSCM42");
};

export const TrackGAPageview = (path: string, title: string) => {
    console.log("sending page hit");
    ReactGA.send({hitType: "pageview", page: path, title: title});
};

export const TrackGAEvent = (category: string, action: string, label?: string) => {
    console.log("sending event");
    ReactGA.event({
        category: category,
        action: action,
        label: label
    });
};

export const getBaseURL = () => {
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

export const updateMissingCount = (collection, id, increase: boolean) => {
    const data = {collection: collection, clothingId: id, increase: increase};

    return new Promise((resolve, reject) => {
        axios
            .post(`${getBaseURL()}/updateMissingCount`, data)
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

export const getClothingFromSearch = (query) => {
    const data = {searchQuery: query};

    return new Promise((resolve, reject) => {
        axios.get(`${getBaseURL()}/getItemsFromSearch`, {params: data}).then((result) => {
            resolve(result.data.items);
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

const login = async (username, password) => {
    try {
        const response = await axios.post(`${getBaseURL()}/api/login`, {username, password});
        const token = response.data.token;
        console.log(response);
        cookies.set("jwtToken", token, {path: "/"});
        if (token) {
            return true;
        }
    } catch (err) {
        console.error(err);
        return false;
    }

    return false;
};

async function verifyToken() {
    const jwt = cookies.get("jwtToken");
    if (jwt) {
        try {
            const response = await fetch(`${getBaseURL()}/api/admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            });

            if (response.ok) {
                return true;
            } else {
                throw new Error("Failed to authenticate user");
            }
        } catch (error) {
            console.error("Error authenticating user:", error);
            return false;
        }
    }

    return false;
}

export {login, verifyToken};
