const getRandomCards = () => {
    const cards = [
        {
            imageSrc:
                "https://media-photos.depop.com/b0/22911501/1318568877_7b5b115c28a2460da2c61d36368f677d/P0.jpg",
            title: "Cool Jacket",
            store: "Orange Circle Antique Mall",
            address: "118 S Glassell St, Orange, CA 92866",
            date: "12/05/2022 5:30PM",
            lat: 33.7874969,
            lng: -117.8510215,
            price: "$5.99",
            rating: "5.0",
            reviews: 87,
            url: "#"
        },
        {
            imageSrc:
                "https://media-photos.depop.com/b0/36117628/1297742682_1934bb64fa3e4e2bb497bf101b126309/P0.jpg",
            title: "Awesome Jacket",
            store: "Orange Circle Antique Mall",
            address: "118 S Glassell St, Orange, CA 92866",
            date: "12/05/2022 5:30PM",
            lat: 33.7874969,
            lng: -117.8510215,
            price: "$2.99",
            rating: "4.8",
            reviews: 32,
            url: "#"
        },
        {
            imageSrc:
                "https://media-photos.depop.com/b0/10634385/858539930_74c3df9a154040ae9139acb6d06a3d94/P0.jpg",
            title: "Great Jacket",
            store: "Orange Circle Antique Mall",
            address: "118 S Glassell St, Orange, CA 92866",
            date: "12/05/2022 5:30PM",
            lat: 33.7874969,
            lng: -117.8510215,
            price: "$7.99",
            rating: "4.9",
            reviews: 89,
            url: "#"
        },
        {
            imageSrc:
                "https://media-photos.depop.com/b0/33456429/1303601520_0872ded128734933b10c621afd941348/P0.jpg",
            title: "Fantastic Jacket",
            store: "Orange Circle Antique Mall",
            address: "118 S Glassell St, Orange, CA 92866",
            date: "12/05/2022 5:30PM",
            lat: 33.7874969,
            lng: -117.8510215,
            price: "$8.99",
            rating: "4.6",
            reviews: 12,
            url: "#"
        },
        {
            imageSrc:
                "https://media-photos.depop.com/b0/16245975/1302160292_78e135ef035e4d2aa4681f1704eed9c9/P0.jpg",
            title: "Aesthetic Jacket",
            store: "Orange Circle Antique Mall",
            address: "118 S Glassell St, Orange, CA 92866",
            date: "12/05/2022 5:30PM",
            lat: 33.7874969,
            lng: -117.8510215,
            price: "$7.99",
            rating: "4.2",
            reviews: 19,
            url: "#"
        },
        {
            imageSrc:
                "https://media-photos.depop.com/b0/9437779/1278175646_5da5ffa2dd8c4efa8f2a1fd13f1f9e21/P0.jpg",
            title: "Nice Jacket",
            store: "Orange Circle Antique Mall",
            address: "118 S Glassell St, Orange, CA 92866",
            date: "12/05/2022 5:30PM",
            lat: 33.7874969,
            lng: -117.8510215,
            price: "$2.99",
            rating: "5.0",
            reviews: 61,
            url: "#"
        },
        {
            imageSrc:
                "https://media-photos.depop.com/b0/27722912/1025200380_a01b2c07b4ae40fcb954675ec83e4dab/P0.jpg",
            title: "Bad Jacket",
            store: "Orange Circle Antique Mall",
            address: "118 S Glassell St, Orange, CA 92866",
            date: "12/05/2022 5:30PM",
            lat: 33.7874969,
            lng: -117.8510215,
            price: "$3.99",
            rating: "4.2",
            reviews: 95,
            url: "#"
        },
        {
            imageSrc:
                "https://media-photos.depop.com/b0/3250448/616739410_1d437cc04db14aa28f396ea0296a6e5b/P0.jpg",
            title: "Stunning Jacket",
            store: "Orange Circle Antique Mall",
            address: "118 S Glassell St, Orange, CA 92866",
            date: "12/05/2022 5:30PM",
            lat: 33.7874969,
            lng: -117.8510215,
            price: "$3.99",
            rating: "3.9",
            reviews: 26,
            url: "#"
        }
    ];

    // Shuffle array
    return cards.sort(() => Math.random() - 0.5);
};

export const tabs = [
    {
        category: "Jackets",
        data: [
            {
                imageSrc:
                    "https://media-photos.depop.com/b0/22911501/1318568877_7b5b115c28a2460da2c61d36368f677d/P0.jpg",
                title: "Cool Jacket",
                store: "Orange Circle Antique Mall",
                address: "118 S Glassell St, Orange, CA 92866",
                date: "12/05/2022 5:30PM",
                price: "$5.99",
                rating: "5.0",
                reviews: 87,
                url: "#"
            },
            {
                imageSrc:
                    "https://media-photos.depop.com/b0/36117628/1297742682_1934bb64fa3e4e2bb497bf101b126309/P0.jpg",
                title: "Awesome Jacket",
                store: "The Collection by Casa Teresa",
                address: "234 N Glassell St, Orange, CA 92866",
                date: "12/04/2022 3:29PM",
                price: "$2.99",
                rating: "4.8",
                reviews: 32,
                url: "#"
            },
            {
                imageSrc:
                    "https://media-photos.depop.com/b0/10634385/858539930_74c3df9a154040ae9139acb6d06a3d94/P0.jpg",
                title: "Great Jacket",
                store: "Orange Circle Antique Mall",
                address: "118 S Glassell St, Orange, CA 92866",
                date: "12/05/2022 5:30PM",
                lat: 33.7874969,
                lng: -117.8510215,
                price: "$7.99",
                rating: "4.9",
                reviews: 89,
                url: "#"
            },
            {
                imageSrc:
                    "https://media-photos.depop.com/b0/33456429/1303601520_0872ded128734933b10c621afd941348/P0.jpg",
                title: "Fantastic Jacket",
                store: "Orange Circle Antique Mall",
                address: "118 S Glassell St, Orange, CA 92866",
                date: "12/05/2022 5:30PM",
                lat: 33.7874969,
                lng: -117.8510215,
                price: "$8.99",
                rating: "4.6",
                reviews: 12,
                url: "#"
            },
            {
                imageSrc:
                    "https://media-photos.depop.com/b0/16245975/1302160292_78e135ef035e4d2aa4681f1704eed9c9/P0.jpg",
                title: "Aesthetic Jacket",
                store: "Orange Circle Antique Mall",
                address: "118 S Glassell St, Orange, CA 92866",
                date: "12/05/2022 5:30PM",
                lat: 33.7874969,
                lng: -117.8510215,
                price: "$7.99",
                rating: "4.2",
                reviews: 19,
                url: "#"
            },
            {
                imageSrc:
                    "https://media-photos.depop.com/b0/9437779/1278175646_5da5ffa2dd8c4efa8f2a1fd13f1f9e21/P0.jpg",
                title: "Nice Jacket",
                store: "Orange Circle Antique Mall",
                address: "118 S Glassell St, Orange, CA 92866",
                date: "12/05/2022 5:30PM",
                lat: 33.7874969,
                lng: -117.8510215,
                price: "$2.99",
                rating: "5.0",
                reviews: 61,
                url: "#"
            },
            {
                imageSrc:
                    "https://media-photos.depop.com/b0/27722912/1025200380_a01b2c07b4ae40fcb954675ec83e4dab/P0.jpg",
                title: "Bad Jacket",
                store: "Orange Circle Antique Mall",
                address: "118 S Glassell St, Orange, CA 92866",
                date: "12/05/2022 5:30PM",
                lat: 33.7874969,
                lng: -117.8510215,
                price: "$3.99",
                rating: "4.2",
                reviews: 95,
                url: "#"
            },
            {
                imageSrc:
                    "https://media-photos.depop.com/b0/3250448/616739410_1d437cc04db14aa28f396ea0296a6e5b/P0.jpg",
                title: "Stunning Jacket",
                store: "Orange Circle Antique Mall",
                address: "118 S Glassell St, Orange, CA 92866",
                date: "12/05/2022 5:30PM",
                lat: 33.7874969,
                lng: -117.8510215,
                price: "$3.99",
                rating: "3.9",
                reviews: 26,
                url: "#"
            }
        ]
    },
    {category: "Pants", data: getRandomCards()},
    {category: "Shirts", data: getRandomCards()},
    {category: "Top", data: getRandomCards()}
];

export type SlideData = {
    title: string;
    imageSrc: string;
    store: string;
    timestamp: string;
    price: string;
};

type SliderInfo = {
    category: string;
    data: SlideData[];
};

export type AllSlideData = Array<SliderInfo>;
