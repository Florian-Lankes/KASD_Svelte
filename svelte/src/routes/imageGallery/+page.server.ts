import { KASDMapsService } from "../../services/KASD-Maps-service";
/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    const result = await KASDMapsService.getAllImages();
    return {
        placemark: null,
        images: result
    }
};