import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { groupApi } from "./api/group-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

    { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
    { method: "POST", path: "/api/users/{id}/placemarks", config: placemarkApi.create },
    { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
    // bugfix need to add { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
    { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },

    // group.create id in route
    { method: "GET", path: "/api/groups", config: groupApi.find },
    { method: "POST", path: "/api/users/{id}/groups", config: groupApi.create },
    { method: "DELETE", path: "/api/groups", config: groupApi.deleteAll },
    { method: "DELETE", path: "/api/groups/{id}", config: groupApi.deleteOne },
    { method: "GET", path: "/api/groups/{id}", config: groupApi.findOne },
];
