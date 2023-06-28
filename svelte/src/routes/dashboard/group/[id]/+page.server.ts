// @ts-nocheck
import { KASDMapsService } from "../../../../services/KASD-Maps-service.ts";

export const load = async ({ params }) => {
    const returnedGroup = await KASDMapsService.getGroupById(params.id);
    return {
        group: returnedGroup
    }
}