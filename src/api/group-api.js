import Boom from "@hapi/boom";
import { db } from "../model/db.js";
import {
    GroupArraySpec,
    GroupSpecPlus,
    IdSpec,
    GroupSpec,
    PlacemarkSpecReal,
    PlacemarkSpecPlus, GroupCredentialsSpec
} from "../model/joi-schemas.js";
import {validationError} from "./logger.js";


// missing swagger
export const groupApi = {
    find: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                const groups = await db.groupStore.getAllGroups();
                return groups;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: GroupArraySpec, failAction: validationError },
        description: "Get all groups",
        notes: "Returns all groups",
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },

        async handler(request) {
            try {
                // use getGroupPlusPlacemarkInfoById if you want the placemarks not only by id array, but by object array
                const group = await db.groupStore.getGroupById(request.params.id);
                if (!group) {
                    return Boom.notFound("No Group with this id");
                }
                return group;
            } catch (err) {
                return Boom.serverUnavailable("No Group with this id");
            }
        },
        tags: ["api"],
        description: "Find a group",
        notes: "Returns a group",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: GroupSpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                const group = request.payload;
                const userId = request.auth.credentials._id;
                const newGroup = await db.groupStore.addGroup(userId ,group);
                if (newGroup) {
                    return h.response(newGroup).code(201);
                }
                return Boom.badImplementation("error creating group");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a group",
        notes: "Returns the newly created group",
        validate: { payload: GroupCredentialsSpec, failAction: validationError }, //PlacemarkSpecPlus
        // response: { schema: GroupSpecPlus, failAction: validationError }, // "$__" is now allowed

    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                // use getGroupPlusPlacemarkInfoById if you want the placemarks not only by id array, but by object array
                const group = await db.groupStore.getGroupById(request.params.id);
                if (!group) {
                    return Boom.notFound("No Group with this id");
                }
                await db.groupStore.deleteGroupById(group._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No Group with this id");
            }
        },
        tags: ["api"],
        description: "Delete a group",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },

        handler: async function (request, h) {
            try {
                await db.groupStore.deleteAllGroups();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all GroupApi",
    },
};
