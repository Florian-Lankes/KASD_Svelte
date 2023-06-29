// @ts-nocheck
import { KASDMapsService } from "../../../../services/KASD-Maps-service.ts";
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
    const returnedPlacemark = await KASDMapsService.getPlacemark(params.id);
    const images = await KASDMapsService.getPlacemarkImages(placemark2._id); //test
    return {
        placemark: returnedPlacemark,
        images: images
    }
};