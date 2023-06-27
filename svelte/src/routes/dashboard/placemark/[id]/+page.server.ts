// @ts-nocheck
import { KASDMapsService } from "../../../../services/KASD-Maps-service.ts";
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => { // TODO ts
    const placemark2 = await KASDMapsService.getPlacemark(params.id);
    const images = await KASDMapsService.getPlacemarkImages(placemark2._id); //test
    return {
        placemark: placemark2,
        images: images
    }
};

/** @type {import('./$types').Actions} */
export const actions = {

    editPlacemark: async ({ cookies, request }) => { // TODO ts
        // edit the placemark
        const data = await request.formData();
        const updatedPlacemark = {
            name: data.get('name'),
            category: data.get('category'),
            description: data.get('description'),
            location: {latitude: Number(data.get('latitude')), longitude: Number(data.get('longitude'))},
        }
        const placemarkId = data.get('placemarkId');
        const response = await KASDMapsService.editPlacemark(placemarkId, updatedPlacemark);

        return {success: true};
    },
};