// @ts-nocheck
import { KASDMapsService } from "../../../../services/KASD-Maps-service.ts";

export const load = async ({ params }) => { // TODO ts
    const groups = await KASDMapsService.getGroupById(params.id);
    // console.log("groups: ")
    // console.log(groups);
    return {
        group: groups
    }
}