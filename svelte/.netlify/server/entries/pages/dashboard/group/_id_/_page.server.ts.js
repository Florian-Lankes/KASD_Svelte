import { K as KASDMapsService } from "../../../../../chunks/KASD-Maps-service.js";
const load = async ({ params }) => {
  const returnedGroup = await KASDMapsService.getGroupById(params.id);
  return {
    group: returnedGroup
  };
};
export {
  load
};
