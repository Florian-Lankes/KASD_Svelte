import { c as create_ssr_component, b as add_attribute } from "./index2.js";
import "leaflet";
import { a as latestPlacemark } from "./stores.js";
const PlacemarkMap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { layerControl } = $$props;
  let { activeLayer = "" } = $$props;
  let { mapName = "" } = $$props;
  let map;
  latestPlacemark.subscribe((placemark) => {
    if (placemark && map) {
      map.addMarker(
        {
          latitude: placemark.location.latitude,
          longitude: placemark.location.longitude
        },
        placemark.name,
        "Placemarks",
        placemark._id
      );
    }
  });
  if ($$props.layerControl === void 0 && $$bindings.layerControl && layerControl !== void 0)
    $$bindings.layerControl(layerControl);
  if ($$props.activeLayer === void 0 && $$bindings.activeLayer && activeLayer !== void 0)
    $$bindings.activeLayer(activeLayer);
  if ($$props.mapName === void 0 && $$bindings.mapName && mapName !== void 0)
    $$bindings.mapName(mapName);
  return `<div class="box"${add_attribute("id", mapName, 0)} style="height:75vh"></div>`;
});
export {
  PlacemarkMap as P
};
