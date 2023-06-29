import { K as KASDMapsService } from "../../../chunks/KASD-Maps-service.js";
const load = async () => {
  const result = await KASDMapsService.getAllImages();
  return {
    placemark: null,
    images: result
  };
};
export {
  load
};
