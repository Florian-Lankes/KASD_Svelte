import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { groupApi } from "./api/group-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/user", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/user/{id}", config: userApi.findOne },
    { method: "GET", path: "/api/analytics", config: userApi.getAnalytics },

    { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
    { method: "POST", path: "/api/user/placemark", config: placemarkApi.create }, //cant use api
    { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
    { method: "DELETE", path: "/api/placemark/{id}", config: placemarkApi.deleteOne },
    { method: "GET", path: "/api/placemark/{id}", config: placemarkApi.findOne },
    { method: "GET", path: "/api/allImages", config: placemarkApi.allImages },
    { method: "POST", path: "/api/placemark/{id}/uploadImage", config: placemarkApi.uploadImage },
    { method: "POST", path: "/api/placemark/{id}/update", config: placemarkApi.updatePlacemark },
    { method: "GET", path: "/api/placemark/{id}/images", config: placemarkApi.placemarkImages },
    { method: "DELETE", path: "/api/placemark/{id}/image/{imageId}/{publicId}/delete", config: placemarkApi.deleteImage },

    // group.create id in route
    { method: "GET", path: "/api/groups", config: groupApi.find },

    // removed id from route /api/user/${id}/group because it is requested from auth.credentials so it is not used
    { method: "POST", path: "/api/user/group", config: groupApi.create },
    { method: "DELETE", path: "/api/groups", config: groupApi.deleteAll },
    { method: "DELETE", path: "/api/group/{id}", config: groupApi.deleteOne },
    { method: "GET", path: "/api/group/{id}", config: groupApi.findOne },
    { method: "GET", path: "/api/groups/user", config: groupApi.findByUserId },
    { method: "GET", path: "/api/addPlacemark/{placemarkId}/group/{groupId}", config: groupApi.addPlacemarkToGroup },
    { method: "DELETE", path: "/api/group/{groupId}/placemark/{placemarkId}", config: groupApi.deletePlacemarkFromGroup },
    // { method: "GET", path: "/api/group/{id}", config: groupApi.findFullGroupById },

    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },


];
