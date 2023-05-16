// import controllers

import { placemarkListController } from "./controllers/placemark-list-controller.js";
export const webRoutes = [
    {method: "GET", path: "/", config: placemarkListController.index}

];
