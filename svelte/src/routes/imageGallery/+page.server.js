import { KASDMapsService } from "../../services/KASD-Maps-service.js";
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
    const result = await KASDMapsService.getAllImages();
    console.log(result);
    return {
        images: result
    }
};