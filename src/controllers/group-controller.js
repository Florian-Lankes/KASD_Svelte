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
            console.log("group2");
             console.log(group);
            const viewData = {
                group: group,
                placemarks: group.placemarks,
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
