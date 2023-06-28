import {writable} from "svelte/store";
import type {LoggedInUser} from "./services/types";

/*
export const user = writable({
    email: "",
    token: "",
    userId: "",
    // isAdmin: "",
});
 */
export const user = writable<LoggedInUser>();


export const latestPlacemark = writable(null);

export const latestChartType = writable("line");

export const latestRoute = writable("");