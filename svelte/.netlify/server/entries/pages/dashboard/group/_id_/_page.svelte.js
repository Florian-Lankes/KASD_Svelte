import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/index2.js";
import { H as Header } from "../../../../../chunks/Header.js";
import { M as MainNavigator } from "../../../../../chunks/MainNavigator.js";
import { P as PlacemarkTable } from "../../../../../chunks/PlacemarkTable.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<section class="section">${validate_component(PlacemarkTable, "PlacemarkTable").$$render(
    $$result,
    {
      propValue: data,
      titlePage: data.group.title
    },
    {},
    {}
  )}</section>`;
});
export {
  Page as default
};
