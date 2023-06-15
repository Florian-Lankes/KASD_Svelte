import { db } from "../model/db.js";
import { PlacemarkSpec } from "../model/joi-schemas.js";
import { Group } from "../model/mongo/group.js";

export const dashboardController = {
    index: {
        // in dashboard view there are all Placemarks displayed, but only the groups of the logged in user
        // Only the user (or admin) who created the Placemarks or Groups should be able to edit them

        // Maybe I can solve the issue with the placemark options better in the Future
        // Fix duplicate from index and adminDashboard
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const viewData = {
                title: "Dashboard",
                user: request.auth.credentials,
                placemarks: await db.placemarkStore.getAllPlacemarks(), // placemarks from every user
                groups: await db.groupStore.getUserGroups(loggedInUser._id), // groups from loggedIn User
                loggedInUserIsAdmin: loggedInUser.isAdmin
            };
            // adding options to placemark for group adding
            const array = [];
            for (let i = 0; i < viewData.groups.length; i++) {
                const element = {title: "",
                                id: null};
                element.title = viewData.groups[i].title;
                element.id = viewData.groups[i]._id;
                array.push(element);
            }
            for (let i = 0; i < viewData.placemarks.length; i++) {
                viewData.placemarks[i].groupsToAdd = array;
            }
            return h.view("dashboard", viewData);
        },
    },

    adminDashboard: {
        // in dashboard view there are all Placemarks displayed, but only the groups of the logged in user
        // Only the user (or admin) who created the Placemarks or Groups should be able to edit them
        // Maybe I can solve the issue with the placemark options better in the Future
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const viewData = {
                title: "Admin Dashboard",
                user: request.auth.credentials,
                users: await db.userStore.getAllUsers(),
                loggedInUserIsAdmin: loggedInUser.isAdmin
            };
            return h.view("admin-dashboard", viewData);
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
            const placemark = {
                name: request.payload.name,
                category: request.payload.category,
                description: request.payload.description,
                image: "",
                location: {latitude: request.payload.latitude, longitude: request.payload.longitude},
            };
            console.log(placemark);
            await db.placemarkStore.addPlacemark(loggedInUser._id, placemark); // Function from mongo store name conflict
            return h.redirect("/dashboard");
        },
    },

    //joi validation
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

    addPlacemarkToGroup: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const user = await db.userStore.getUserById(loggedInUser._id);
            const placemark = await db.placemarkStore.getPlacemarkById(request.payload.placemarkId);
            const group = await db.groupStore.getGroupById(request.payload.groupId);

            // check if placemark is already in group
            const isInArray = group.arrayOfPlacemarkIds.some(function (placemarkId) {
                return placemarkId.equals(placemark._id);
            });
            // console.log(isInArray);
            // console.log(placemark);
            // console.log(group);
            // console.log(placemark._id);
            // console.log(group.arrayOfPlacemarkIds);
            if(!isInArray){
                group.arrayOfPlacemarkIds.push(placemark._id);  // console.log(group.arrayOfPlacemarkIds);
            };
            await group.save();
            // group.markModified("arrayOfPlacemarkIds");
            // group.save();

            // console.log(group);

            return h.redirect("/dashboard");
        },
    },

    deletePlacemark: {
        handler: async function (request, h) {
            const placemarkToDelete = await db.placemarkStore.getPlacemarkById(request.params.id);
            const loggedInUser = request.auth.credentials;
            if(placemarkToDelete.createdById.equals(loggedInUser._id) || loggedInUser.isAdmin){
                await db.placemarkStore.deletePlacemarkById(placemarkToDelete._id);
            }
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
