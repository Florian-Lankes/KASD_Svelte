import Boom from "@hapi/boom";
import { db } from "../model/db.js";

export const placemarkApi = {
    find: {
        auth: false,
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getAllPlacemarks();
                return placemark;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    findOne: {
        auth: false,
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
    },

    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const placemark = request.payload;
                const userId = request.params.id;
                const newPlacemark = await db.placemarkStore.addPlacemark(userId, placemark);
                if (newPlacemark) {
                    return h.response(newPlacemark).code(201);
                }
                return Boom.badImplementation("error creating Placemark");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    deleteOne: {
        auth: false,
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
    },

    deleteAll: {
        auth: false,
        handler: async function (request, h) {
            try {
                await db.placemarkStore.deleteAllPlacemarks();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};
