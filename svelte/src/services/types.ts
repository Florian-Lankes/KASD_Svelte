export interface LoggedInUser {

    email: string;
    token: string;
    userId: string;
}

export interface User{
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    isAdmin: string,
};

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
    image: Array<string>;
}

export interface Group{
    title:string;
    userId: string;
    arrayOfPlacemarkIds: Array<string>;
    _id: string;
}
export interface ReturnedPlacemark extends Placemark {
    createdById: string,
    _id: string,
}

export interface Chart{
    selected: string;
}

export interface Location{
    location: {
        latitude: number;
        longitude: number;
    };
}

export interface PassedDataForImage{
    placemark: Array<ReturnedPlacemark>;
    images: Array<{ secure_url: string }>;
}
