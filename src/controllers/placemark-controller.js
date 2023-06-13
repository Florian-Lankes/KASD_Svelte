import { db } from "../model/db.js";
import { imageStore} from "../model/image-store.js";

export const placemarkController = {

    index: {
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const viewData = {
                title: "Placemark",
                placemark: placemark,
            };
            return h.view("placemark-page", viewData);
        },
    },

    uploadImage: {
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(request.payload.imagefile);
                    placemark.image = url;
                    await db.placemarkStore.updatePlacemark(placemark);
                }
                return h.redirect(`/placemark/${placemark._id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/placemark/${placemark._id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
};
