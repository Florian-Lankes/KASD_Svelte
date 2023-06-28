import Boom from "@hapi/boom";
import { db } from "../model/db.js";
import {IdSpec, JwtAuth, UserArray, UserCredentialsSpec, UserSpec, UserSpecPlus} from "../model/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";



export const userApi = {
    find: {
        auth: {
          strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                const users = await db.userStore.getAllUsers();
                return users;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all userApi",
        notes: "Returns details of all userApi",
        response: { schema: UserArray, failAction: validationError },
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                const user = await db.userStore.getUserById(request.params.id);
                if (!user) {
                    return Boom.notFound("No User with this id");
                }
                return user;
            } catch (err) {
                return Boom.serverUnavailable("No User with this id");
            }
        },
        tags: ["api"],
        description: "Get a specific user",
        notes: "Returns user details",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: UserSpecPlus, failAction: validationError },
    },

    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const user = await db.userStore.addUser(request.payload);
                if (user) {
                    return h.response(user).code(201);
                }
                return Boom.badImplementation("error creating user");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a User",
        notes: "Returns the newly created user",
        validate: { payload: UserSpec, failAction: validationError }, // UserSpecPlus
        response: { schema: UserSpecPlus, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                await db.userStore.deleteAllUsers();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all userApi",
        notes: "All userApi removed from KASDMaps",
    },

    authenticate: {
        auth: false,
        handler: async function (request, h) {
            try {
                const user = await db.userStore.getUserByEmail(request.payload.email);
                if (!user) {
                    return Boom.unauthorized("User not found");
                }
                if (user.password !== request.payload.password) {
                    return Boom.unauthorized("Invalid password");
                }
                const token = createToken(user);
                return h.response({ success: true, token: token, userId: user._id }).code(201);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Authenticate  a User",
        notes: "If email and password valid return a JWT token",
        validate: { payload: UserCredentialsSpec, failAction: validationError },
        response: { schema: JwtAuth, failAction: validationError },
    },

    getAnalytics: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const userCount = await db.userStore.getUserCount();
                const placemarkCount = await db.placemarkStore.getPlacemarkCount();
                const soccerFieldCount = await db.placemarkStore.getPlacemarksCountByCategory("Soccer field");
                const worldWonderCount = await db.placemarkStore.getPlacemarksCountByCategory("World wonder");
                const riverCount = await db.placemarkStore.getPlacemarksCountByCategory("River");
                const bridgeCount = await db.placemarkStore.getPlacemarksCountByCategory("Bridge");
                const townCount = await db.placemarkStore.getPlacemarksCountByCategory("Town");
                const cityCount = await db.placemarkStore.getPlacemarksCountByCategory("City");
                const forestCount = await db.placemarkStore.getPlacemarksCountByCategory("Forest");
                const landscapeFeatureCount = await db.placemarkStore.getPlacemarksCountByCategory("Landscape feature");
                const nationalMonumentCount = await db.placemarkStore.getPlacemarksCountByCategory("National monument");
                const walkingTrailCount = await db.placemarkStore.getPlacemarksCountByCategory("Walking Trail");
                const treeCount = await db.placemarkStore.getPlacemarksCountByCategory("Tree");
                const entertainmentVenueCount = await db.placemarkStore.getPlacemarksCountByCategory("Entertainment Venue");
                const islandCount = await db.placemarkStore.getPlacemarksCountByCategory("Island");
                const archaeologicalFeatureCount = await db.placemarkStore.getPlacemarksCountByCategory("Archaeological Feature");
                const othersCount = await db.placemarkStore.getPlacemarksCountByCategory("Others");
                const analyticsData = {
                    userCount: userCount,
                    placemarkCount: placemarkCount,
                    soccerFieldCount: soccerFieldCount,
                    worldWonderCount: worldWonderCount,
                    riverCount: riverCount,
                    bridgeCount: bridgeCount,
                    townCount: townCount,
                    cityCount: cityCount,
                    forestCount: forestCount,
                    landscapeFeatureCount: landscapeFeatureCount,
                    nationalMonumentCount: nationalMonumentCount,
                    walkingTrailCount: walkingTrailCount,
                    treeCount: treeCount,
                    entertainmentVenueCount: entertainmentVenueCount,
                    islandCount: islandCount,
                    archaeologicalFeatureCount: archaeologicalFeatureCount,
                    othersCount: othersCount
                }
                return analyticsData;
                // return h.response({ analytics: analyticsData}).code(201);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get analytics",
        notes: "Returns analytics of specific Counts",
    },
};
