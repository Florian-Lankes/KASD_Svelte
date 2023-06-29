import { c as create_ssr_component } from "../../../chunks/index2.js";
import { K as KASDMapsService } from "../../../chunks/KASD-Maps-service.js";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const goto = /* @__PURE__ */ client_method("goto");
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  KASDMapsService.logout();
  goto("/");
  return ``;
});
export {
  Page as default
};
