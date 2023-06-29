import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainNavigator } from "../../../chunks/MainNavigator.js";
import { P as PlacemarkMap } from "../../../chunks/PlacemarkMap.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns"><div class="column">${validate_component(PlacemarkMap, "PlacemarkMap").$$render(
    $$result,
    {
      mapName: "placemark-map1",
      layerControl: false,
      activeLayer: false
    },
    {},
    {}
  )}</div>
    <div class="column">${validate_component(PlacemarkMap, "PlacemarkMap").$$render(
    $$result,
    {
      mapName: "placemark-map2",
      layerControl: false,
      activeLayer: "Topographic"
    },
    {},
    {}
  )}</div>
    <div class="column">${validate_component(PlacemarkMap, "PlacemarkMap").$$render(
    $$result,
    {
      mapName: "placemark-map3",
      layerControl: false,
      activeLayer: "Satellite"
    },
    {},
    {}
  )}</div></div>`;
});
export {
  Page as default
};
