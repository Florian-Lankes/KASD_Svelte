import { c as create_ssr_component, b as add_attribute, v as validate_component, e as escape } from "../../../../../chunks/index2.js";
import { H as Header } from "../../../../../chunks/Header.js";
import { M as MainNavigator } from "../../../../../chunks/MainNavigator.js";
import { D as DisplayImages } from "../../../../../chunks/DisplayImages.js";
const EditPlacemarkForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { passedData } = $$props;
  let name = "";
  let description = "";
  let latitude = 0;
  let longitude = 0;
  if ($$props.passedData === void 0 && $$bindings.passedData && passedData !== void 0)
    $$bindings.passedData(passedData);
  return `<form><label>Edit Placemark:
        <div class="field is horizontal"><div class="field-body"><div class="field"><label class="label">Title
                        <input class="input" type="text" name="name"${add_attribute("value", name, 0)}></label></div>
                <div class="field"><label class="label">Description
                        <input class="input" type="text" name="description"${add_attribute("value", description, 0)}></label></div>
                <div class="field"><label class="label">Latitude
                        <input class="input" type="number" min="-90" max="90" name="latitude" step="0.000000000000001"${add_attribute("value", latitude, 0)}></label></div>
                <div class="field"><label class="label">Longitude
                        <input class="input" type="number" min="-180" max="180" name="longitude" step="0.000000000000001"${add_attribute("value", longitude, 0)}></label></div>
                <div class="field"><label class="label">Category
                        <div class="control"><div class="select"><select class="input" name="category"><option value="Soccer field">Soccer field</option><option value="World wonder">World wonder</option><option value="River">River</option><option value="Bridge">Bridge</option><option value="Town">Town</option><option value="City">City</option><option value="Forest">Forest</option><option value="Landscape feature">Landscape feature</option><option value="National monument">National monument</option><option value="Walking Trail">Walking Trail</option><option value="Tree">Tree</option><option value="Entertainment Venue">Entertainment Venue</option><option value="Island">Island</option><option value="Archaeological Feature">Archaeological Feature</option><option value="Others">Others</option></select></div></div></label></div></div></div></label>
    <button formaction="?/editPlacemark">Change Placemark</button></form>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let conditions;
  let fileName = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div><div class="box has-text-centered">${validate_component(EditPlacemarkForm, "EditPlacemarkForm").$$render($$result, { passedData: data }, {}, {})}
        <form enctype="multipart/form-data"><div id="file-select" class="file has-name is-fullwidth"><label class="file-label"><input class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg">
                    <span class="file-cta"><span class="file-icon"><i class="fas fa-upload"></i></span>
                        <span class="file-label">Choose a file…
                        </span></span>
                    <span class="file-name">${escape(fileName)}</span></label>
                <button type="submit" class="button is-info">Upload</button></div></form></div>
    <div class="columns m-0"><div class="column box"><h1>Weather in ${escape(conditions?.name)}: </h1>
            <h2 class="is-size-1">${escape(conditions?.main.temp)}°C</h2>
            <h3 class="is-size-3">Feels like ${escape(conditions?.main.feels_like)}°C</h3>
            <p>${escape(conditions?.weather[0].description)}</p>
            <p>Humidity: ${escape(conditions?.main.humidity)}%</p></div></div>


    ${validate_component(DisplayImages, "DisplayImages").$$render($$result, { passedData: data }, {}, {})}</div>`;
});
export {
  Page as default
};
