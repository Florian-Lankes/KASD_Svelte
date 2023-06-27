import { KASDMapsService } from "../../services/KASD-Maps-service";
/** @type {import('./$types').PageServerLoad} */
export const load = async () => { // TODO ts
    const result = await KASDMapsService.getAllImages();
    return {
        placemark: null,
        images: result
    }
};