
import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController} from "./controllers/accounts-controller.js";
import { placemarkController} from "./controllers/placemark-controller.js";
import {groupController} from "./controllers/group-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index},
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },

    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },
    { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlacemark },
    { method: "POST", path: "/dashboard/addgroup", config: dashboardController.addGroup},
    { method: "GET", path: "/dashboard/deletegroup/{id}", config: dashboardController.deleteGroup },

    { method: "GET", path: "/placemark/{id}", config: placemarkController.index },
    { method: "GET", path: "/group/{id}", config: groupController.index }

];
