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
                const loggedInUser = request.auth.credentials;
                if(placemark.createdById.equals(loggedInUser._id) || loggedInUser.isAdmin){
                    await db.placemarkStore.deletePlacemarkById(placemark._id);
                    return h.response().code(204);
                }
                return h.response().code(401);
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

    uploadImage: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const file = Object.values(request.payload)[0];

                if (placemark.createdById.equals(loggedInUser._id) || loggedInUser.isAdmin) {
                    if (Object.keys(file).length > 0) {
                        const url = await imageStore.uploadImage(file);
                        await db.placemarkStore.imagePush(placemark, url);
                        return true;
                    }
                }
                return false;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },

    updatePlacemark: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const updatedPlacemark = request.payload;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id) // id from api route
                const loggedInUser = request.auth.credentials;
                if (placemark.createdById.equals(loggedInUser._id) || loggedInUser.isAdmin) {
                    await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
                    return true;
                }
                return false;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    deleteImage: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
          try {
              // implement delete not finished
              const imageId = request.params.imageId;
              const delId = imageId.split(".")[0];
              const placemarkId = request.params.id;
              const publicId = request.params.publicId;
              const url = `http://res.cloudinary.com/dp5ce5pmu/image/upload/${  publicId  }/${  imageId}`;
              await imageStore.deleteImageById(delId);
              await db.placemarkStore.deleteImageByUrl(url, placemarkId);
              return {imageId: imageId};
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
                return images;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};
