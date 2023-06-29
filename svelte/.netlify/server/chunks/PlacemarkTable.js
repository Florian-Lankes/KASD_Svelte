import { c as create_ssr_component, e as escape, d as each, b as add_attribute } from "./index2.js";
const PlacemarkTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let placemarks = [];
  let groups = [];
  let title = "Placemarks:";
  let { propValue } = $$props;
  let { titlePage } = $$props;
  let placemarkId;
  if ($$props.propValue === void 0 && $$bindings.propValue && propValue !== void 0)
    $$bindings.propValue(propValue);
  if ($$props.titlePage === void 0 && $$bindings.titlePage && titlePage !== void 0)
    $$bindings.titlePage(titlePage);
  return `<div class="column box has-text-centered m-4"><h1 class="title is-5">${escape(title)}</h1>
    <table class="table is-fullwidth"><thead><th>Name</th>
        <th>Category</th>
        <th>Description</th>
        <th>Location</th>
        <th>Edit</th></thead>
        <tbody>${each(placemarks, (placemark) => {
    return `<tr><td>${escape(placemark.name)}</td>
                <td>${escape(placemark.category)}</td>
                <td>${escape(placemark.description)}</td>
                <td>${escape(placemark.location.latitude)}, ${escape(placemark.location.longitude)}</td>
                <td><a href="${"/dashboard/placemark/" + escape(placemark._id, true)}" class="button"><i class="fas fa-folder-open"></i>
                    </a></td>
                <td><button><i class="fas fa-trash fa-2x"></i>
                    </button></td>
                <td><form><select>${each(groups, (group) => {
      return `<option${add_attribute("value", group, 0)}>${escape(group.title)}
                                </option>`;
    })}</select>

                        <input type="hidden"${add_attribute("value", placemarkId, 0)}>

                    </form></td>
                ${propValue ? `<td><button><i class="fas fa-folder-minus fa-2x"></i></button>
                    </td>` : ``}
            </tr>`;
  })}</tbody></table></div>`;
});
export {
  PlacemarkTable as P
};
