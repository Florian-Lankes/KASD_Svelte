import { c as create_ssr_component, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainNavigator } from "../../../chunks/MainNavigator.js";
import { P as PlacemarkMap } from "../../../chunks/PlacemarkMap.js";
const AddPlacemark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  let description = "";
  let latitude = 0;
  let longitude = 0;
  let categories = [
    "Soccer field",
    "World wonder",
    "River",
    "Bridge",
    "Town",
    "City",
    "Forest",
    "Landscape feature",
    "National monument",
    "Walking Trail",
    "Tree",
    "Entertainment Venue",
    "Island",
    "Archaeological Feature",
    "Others"
  ];
  let message = "";
  return `<form><div class="field"><label class="label" for="name">Enter Name</label>
        <input class="input" id="name" name="name" type="text"${add_attribute("value", name, 0)}></div>
    <div class="field"><label class="label" for="description">Enter Description</label>
        <input class="input" id="description" name="description" type="text"${add_attribute("value", description, 0)}></div>
    <div><div class="field"><label class="label" for="latitude">Enter Latitude</label>
            <input class="input" id="latitude" name="latitude" type="number" min="-90" max="90" step="0.000000000000001"${add_attribute("value", latitude, 0)}></div>
        <div class="field"><label class="label" for="longitude">Enter Longitude</label>
            <input class="input" id="longitude" name="longitude" type="number" min="-180" max="180" step="0.000000000000001"${add_attribute("value", longitude, 0)}></div></div>
    <div class="field"><div class="select"><select>${each(categories, (category) => {
    return `<option${add_attribute("value", category, 0)}>${escape(category)}</option>`;
  })}</select></div></div>
    <div class="field"><div class="control"><button class="button is-link is-light">Add Placemark</button></div></div>
    <div class="box">${escape(message)}</div></form>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns"><div class="column box has-text-centered columns"><div class="column has-text-centered">${validate_component(PlacemarkMap, "PlacemarkMap").$$render(
    $$result,
    {
      mapName: "placemark-map",
      layerControl: true,
      activeLayer: false
    },
    {},
    {}
  )}</div>
        <div class="column box has-text-centered"><h1 class="title is-4">Add Placemark</h1>
            ${validate_component(AddPlacemark, "AddPlacemark").$$render($$result, {}, {}, {})}</div></div></div>`;
});
export {
  Page as default
};
