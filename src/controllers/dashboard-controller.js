import { db } from "../model/db.js";
import { PlacemarkSpec } from "../model/joi-schemas.js";

export const dashboardController = {
    index: {
        // in dashboard view there are all Placemarks displayed, but only the groups of the logged in user
        // Only the user (or admin) who created the Placemarks or Groups should be able to edit them
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const viewData = {
                title: "Dashboard",
                user: request.auth.credentials,
                placemarks: await db.placemarkStore.getAllPlacemarks(),
                groups: await db.groupStore.getUserGroups(loggedInUser._id),
            };
            return h.view("dashboard", viewData);
        },
    },

    addPlacemark: {
        validate: {
            payload: PlacemarkSpec,
            options: { abortEarly: false },
            failAction: async function (request, h, error) {
                // does not return desired result because viewData is missing
                return h.view("dashboard", { title: "Add Playlist error", errors: error.details }).takeover().code(400);
            },
        },
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

    addGroup: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const user = await db.userStore.getUserById(loggedInUser._id);

            const group = {
                title: request.payload.title
            };
            await db.groupStore.addGroup(loggedInUser._id, group);
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

    deleteGroup: {
        handler: async function (request, h) {
            const GroupToDelete = await db.groupStore.getGroupById(request.params.id);
            await db.groupStore.deleteGroupById(GroupToDelete._id);
            return h.redirect("/dashboard");
        },
    },

};
