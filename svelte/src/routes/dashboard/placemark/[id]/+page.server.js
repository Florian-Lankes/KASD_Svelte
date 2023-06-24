// @ts-nocheck
import { KASDMapsService } from "../../../../services/KASD-Maps-service.js";
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
    const placemarks = await KASDMapsService.getPlacemark(params.id);
    return {
        placemark: placemarks
    }
};

/** @type {import('./$types').Actions} */
export const actions = {

    editPlacemark: async ({ cookies, request }) => {
        // edit the placemark
        console.log("inside edit placemark _--------------------");
        const data = await request.formData();
        const updatedPlacemark = {
            name: data.get('name'),
            category: data.get('category'),
            description: data.get('description'),
            location: {latitude: data.get('latitude'), longitude: data.get('longitude')},
            // image: data.get('imagefile')?.valueOf()
        }
        const image = data.get('imagefile');
        const placemarkId = data.get('placemarkId');
        const response = await KASDMapsService.addImageToPlacemark(image, placemarkId)

        return {success: true};
    },
};