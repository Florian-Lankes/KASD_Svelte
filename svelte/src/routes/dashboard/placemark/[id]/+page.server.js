// @ts-nocheck
import { KASDMapsService } from "../../../../services/KASD-Maps-service.js";

export const load = async ({ params }) => {
    const placemarks = await KASDMapsService.getPlacemark(params.id);
    return {
        placemark: placemarks
    }
}