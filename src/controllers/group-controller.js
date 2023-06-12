import { db } from "../model/db.js";

export const groupController = {
    index: {
        handler: async function (request, h) {
            const group = await db.groupStore.getGroupById(request.params.id);
            const placemarks = null; // -----------------------------------------------------------------<<

            group.arrayOfPlacemarkIds.forEach( (placemarkId) => {
                placemarks.push(db.placemarkStore.getPlacemarkById(placemarkId));
            })
            const viewData = {
                title: "Group",
                group: group,
                placemarks: placemarks,
            };
            return h.view("group-page", viewData);
        },
    },

    addPlacemark: {
        handler: async function (request, h) {
            // not finished
            return h.redirect("/dashboard");
        },
    },
};
