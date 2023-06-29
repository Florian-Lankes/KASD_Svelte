import { c as create_ssr_component, b as add_attribute, e as escape, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainNavigator } from "../../../chunks/MainNavigator.js";
const AddGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title = "";
  let message = "";
  return `<form><div class="field"><label class="label" for="title">Enter Title</label>
        <input class="input" id="title" name="title" type="text"${add_attribute("value", title, 0)}></div>
    <div class="field"><div class="control"><button class="button is-link is-light">Add Group</button></div></div>
    <div>${escape(message)}</div></form>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="column box has-text-centered"><h1 class="title is-4">Add Group</h1>
        ${validate_component(AddGroup, "AddGroup").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
