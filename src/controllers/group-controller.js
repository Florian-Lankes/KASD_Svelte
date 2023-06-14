import { db } from "../model/db.js";

export const groupController = {
    index: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupPlusPlacemarkInfoById(request.params.id);
            /*
            const placemarks = []; // -----------------------------------------------------------------<<

            for(let i = 0; i < group.arrayOfPlacemarkIds.length; i++){
                placemarks.push(await db.placemarkStore.getPlacemarkById(group.arrayOfPlacemarkIds[i]));
            };
            */
            const viewData = {
                title: "GroupPage",
                group: group,
                placemarks: group.placemarks, // only placemarks from group
            };
            return h.view("group-page", viewData);
        },
    },

    //not necessary anymore. Can add Placemarks in Dashboard
    addPlacemark: {
        handler: async function (request, h) {
            // not finished
            return h.redirect("/dashboard");
        },
    },
    removePlacemark: {
        handler: async function (request, h) {
            const groupId = request.params.id;
            const placemarkId = request.params.placemarkId;
            await db.groupStore.deletePlacemarkWithIdFromGroupWithId(groupId, placemarkId);
            return h.redirect(`/group/${groupId}`);
        },
    },

};
