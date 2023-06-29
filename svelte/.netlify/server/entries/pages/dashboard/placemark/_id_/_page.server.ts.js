import { K as KASDMapsService } from "../../../../../chunks/KASD-Maps-service.js";
const load = async ({ params }) => {
  const placemark2 = await KASDMapsService.getPlacemark(params.id);
  const images = await KASDMapsService.getPlacemarkImages(placemark2._id);
  return {
    placemark: placemark2,
    images
  };
};
export {
  load
};
