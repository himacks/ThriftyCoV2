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

export const getInitialData = (): Promise<{categories: string[]; clothing: CategoryData}> => {
    return new Promise((resolve) => {
        axios.get(TESTING ? "https://localhost:3030" : "https://thrifty-co-backend.vercel.app" + "/getInitialData").then((result) => {
            resolve(result.data);
        });
    });
};
