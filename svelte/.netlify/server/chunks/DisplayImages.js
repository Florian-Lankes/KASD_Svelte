import { c as create_ssr_component, d as each, b as add_attribute } from "./index2.js";
const DisplayImages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { passedData } = $$props;
  if ($$props.passedData === void 0 && $$bindings.passedData && passedData !== void 0)
    $$bindings.passedData(passedData);
  return `<div class="box has-text-centered"><h1 class="title is-5">Images</h1>
    ${each(passedData.images, (image) => {
    return `<img${add_attribute("src", image.secure_url, 0)} class="m-2" alt="" width="500" height="600">
        ${passedData.placemark != null ? `<button class="button is-danger"><i class="fas fa-trash"></i></button>` : ``}`;
  })}</div>`;
});
export {
  DisplayImages as D
};
