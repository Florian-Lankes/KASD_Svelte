// @ts-nocheck
import { KASDMapsService } from "../../../../services/KASD-Maps-service.js";

export const load = async ({ params }) => {
    const groups = await KASDMapsService.getGroupById(params.id);
    // console.log("groups: ")
    // console.log(groups);
    return {
        group: groups
    }
}