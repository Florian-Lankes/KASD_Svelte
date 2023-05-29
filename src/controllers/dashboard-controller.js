import { db } from "../model/db.js";

export const dashboardController = {
    index: {
        handler: async function (request, h) {
            const viewData = {
              title: "Dashboard",
              user: request.auth.credentials,
              placemarks: await db.placemarkStore.getAllPlacemarks(),
            };
            return h.view("dashboard", viewData);
        },
    },

    addPlacemark: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const user = await db.userStore.getUserById(loggedInUser._id);
            // console.log(user._id);
            const placemark = {
                name: request.payload.name,
                category: "",
                description: request.payload.description,
                image: "",
                location: {latitude: request.payload.latitude, longitude: request.payload.longitude},
            };
            await db.placemarkStore.addPlacemark(loggedInUser._id, placemark); // Function from mongo store name conflict
            return h.redirect("/dashboard");
        },
    },

    deletePlacemark: {
        handler: async function (request, h) {
            const placemarkToDelete = await db.placemarkStore.getPlacemarkById(request.params.id);
            await db.placemarkStore.deletePlacemarkById(placemarkToDelete._id);
            return h.redirect("/dashboard");
        },
    },
};
