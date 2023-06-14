import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { groupApi } from "./api/group-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/user", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/user/{id}", config: userApi.findOne },

    { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
    { method: "POST", path: "/api/user/{id}/placemark", config: placemarkApi.create }, //cant use api
    { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
    { method: "DELETE", path: "/api/placemark/{id}", config: placemarkApi.deleteOne },
    { method: "GET", path: "/api/placemark/{id}", config: placemarkApi.findOne },

    // group.create id in route
    { method: "GET", path: "/api/groups", config: groupApi.find },
    { method: "POST", path: "/api/user/{id}/group", config: groupApi.create },
    { method: "DELETE", path: "/api/groups", config: groupApi.deleteAll },
    { method: "DELETE", path: "/api/group/{id}", config: groupApi.deleteOne },
    { method: "GET", path: "/api/group/{id}", config: groupApi.findOne },

    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

];
