import { c as create_ssr_component, d as each, e as escape, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainNavigator } from "../../../chunks/MainNavigator.js";
import { P as PlacemarkTable } from "../../../chunks/PlacemarkTable.js";
const GroupTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userGroups = [];
  return `<div class="column box has-text-centered m-4"><h1 class="title is-5">Groups: </h1>
    <table class="table is-fullwidth"><thead><th>Name</th>
        <th>Edit</th></thead>
        <tbody>${each(userGroups, (group) => {
    return `<tr><td>${escape(group.title)}</td>
                <td><a href="${"/dashboard/group/" + escape(group._id, true)}" class="button"><i class="fas fa-folder-open"></i>
                    </a></td>
                <td><button><i class="fas fa-trash fa-2x"></i>
                    </button></td>
            </tr>`;
  })}</tbody></table></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let udef = void 0;
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns"><div class="column box has-text-centered columns">${validate_component(PlacemarkTable, "PlacemarkTable").$$render($$result, { propValue: udef, titlePage: udef }, {}, {})}
        ${validate_component(GroupTable, "GroupTable").$$render($$result, {}, {}, {})}</div></div>`;
});
export {
  Page as default
};
