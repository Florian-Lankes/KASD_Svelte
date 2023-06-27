export interface User {

    email: string;
    token: string;
    userId: string;
}

export interface Mapconf {
    location: { latitude: number, longitude: number };
    zoom: number;
    minZoom: number;
};

export interface Placemark{
    name: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    category: string;
    image: string[];
}

export interface Location{
    location: {
        latitude: number;
        longitude: number;
    };
}