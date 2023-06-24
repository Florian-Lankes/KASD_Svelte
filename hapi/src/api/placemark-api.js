import Boom from "@hapi/boom";
import Joi from "joi";
import { db } from "../model/db.js";
import { IdSpec, PlacemarkArraySpec, PlacemarkSpecReal, PlacemarkSpecPlus } from "../model/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../model/image-store.js";

export const placemarkApi = {
    find: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getAllPlacemarks();
                return placemark;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: PlacemarkArraySpec, failAction: validationError },
        description: "Get all placemarks",
        notes: "Returns all placemarks",
    },

    // jwt auth missing
    findOne: {
        auth: false,
        /*
        auth: {
            strategy: "jwt",
        },
        */
        async handler(request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No Placemark with this id");
                }
                return placemark;
            } catch (err) {
                return Boom.serverUnavailable("No Placemark with this id");
            }
        },
        tags: ["api"],
        description: "Find a placemark",
        notes: "Returns a placemark",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                const placemark = request.payload;
                // console.log(placemark);
                const userId = request.auth.credentials._id;
                const newPlacemark = await db.placemarkStore.addPlacemark(userId, placemark);
                if (newPlacemark) {
                    return h.response(newPlacemark).code(201);
                }
                return Boom.badImplementation("error creating Placemark");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a placemark",
        notes: "Returns the newly created placemark",
        validate: { payload: PlacemarkSpecReal, failAction: validationError }, //PlacemarkSpecPlus
        response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No Placemark with this id");
                }
                await db.placemarkStore.deletePlacemarkById(placemark._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No Placemark with this id");
            }
        },
        tags: ["api"],
        description: "Delete a placemark",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                await db.placemarkStore.deleteAllPlacemarks();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all PlacemarkApi",
    },

    addImage: {
        auth: false,
        handler: async function (request, h) {
            try {
                const image = request.payload; // need from svelte
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id); // id from api route
                // const url = await imageStore.uploadImage(imageURL); already done in svelte
                const response = await db.placemarkStore.imagePush(placemark, image.url);
                return image.url;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    updatePlacemark: {
        auth: false,
        handler: async function (request, h) {
            try {
                const updatedPlacemark = request.payload;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id) // id from api route
                await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
                return true;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    deleteImage: {
        auth: false,
        handler: async function (request, h) {
          try {
              // implement delete not finished
              const placemark = await db.placemarkStore.getPlacemarkById(request.params.id); // id from api route
              const imageIndex = request.payload.imageIndex;
          }  catch (err) {
              return Boom.serverUnavailable("Database Error");
          }
        },
    },

    allImages: {
        auth: false,
        handler: async function (request, h) {
            try {
                const images= imageStore.getAllImages();
                return images;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    placemarkImages: {
        auth: false,
        handler: async function (request, h) {
            try {
                const placemarkId = request.params.id;
                const images= await imageStore.getPlacemarkImages(placemarkId);
                console.log(images);
                return images;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};
