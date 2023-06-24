import { db } from "../model/db.js";
import { imageStore} from "../model/image-store.js";

export const placemarkController = {

    index: {
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const loggedInUser = request.auth.credentials;
            const ableToEdit = (placemark.createdById.equals(loggedInUser._id));
            const viewData = {
                title: "Placemark",
                placemark: placemark,
                ableToEdit: ableToEdit
            };
            return h.view("placemark-page", viewData);
        },
    },

    updatePlacemark: {
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const loggedInUser = request.auth.credentials;
            // is not necessary, because only Admins or Creators have the option to press the button
            if (!placemark.createdById.equals(loggedInUser._id) && !loggedInUser.isAdmin) {
                // not authorized to change anything -> early out condition
                console.log("not authorized to Edit the Placemark");
                return h.redirect(`/placemark/${request.params.id}`);
            }
            const updatedPlacemark = {
                name: request.payload.name,
                description: request.payload.description,
                location: {
                    latitude: request.payload.latitude,
                    longitude: request.payload.longitude
                },
                category: request.payload.category,
            };
            await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
            return h.redirect(`/placemark/${request.params.id}`);
        },
    },

    uploadImage: {
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const file = request.payload.imagefile;
                const loggedInUser = request.auth.credentials;
                if (placemark.createdById.equals(loggedInUser._id) || loggedInUser.isAdmin) {
                    if (Object.keys(file).length > 0) {
                        const url = await imageStore.uploadImage(request.payload.imagefile);
                        placemark.image.push(url); // changed
                        await db.placemarkStore.updatePlacemarkImage(placemark);
                    }
                }
                return h.redirect(`/placemark/${request.params.id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/placemark/${request.params.id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
    // discontinued for now
    deleteImage: {
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (placemark.createdById.equals(loggedInUser._id) || loggedInUser.isAdmin) {
                    await imageStore.deleteImage(placemark.image);
                    placemark.image = "";
                    await db.placemarkStore.updatePlacemarkImage(placemark);
                }
                return h.redirect(`/placemark/${request.params.id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/placemark/${request.params.id}`);
            }
        },
    }
};
