import { c as create_ssr_component } from "./index2.js";
const MainNavigator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="box has-text-centered columns m-2"><a href="/dashboard" class="column"><i class="fas fa-home fa-3x" style="color:rgb(153, 196, 74)"></i></a>
    <a href="/addPlacemark" class="column"><i class="fas fa-th-list fa-3x" style="color:rgb(63, 122, 139)"></i></a>
    <a href="/addGroup" class="column"><i class="fas fa-solid fa-folder-plus fa-3x" style="color:rgb(63, 40, 139)"></i></a>
    <i class="fa-solid fa-location-plus"></i>
    <a href="/analytics" class="column"><i class="fas fa-chart-bar fa-3x" style="color:rgb(149, 93, 176)"></i></a>
    <a href="/map" class="column "><i class="fas fa-map-marked-alt fa-3x" style="color:rgb(102, 153, 255)"></i></a>
    <a href="/imageGallery" class="column"><i class="fas fa-images fa-3x" style="color:rgb(70, 156, 128)"></i></a>
    <a href="/logout" class="column"><i class="fas fa-sign-out-alt fa-3x" style="color:rgb(156, 70, 128)"></i></a></div>`;
});
export {
  MainNavigator as M
};
