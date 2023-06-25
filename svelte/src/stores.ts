import {writable} from "svelte/store";
import type { User } from "./services/types";

/*
export const user = writable({
    email: "",
    token: "",
    userId: "",
    // isAdmin: "",
});
 */
export const user = writable<User>();


export const latestPlacemark = writable(null);

export const latestChartType = writable("line");

export const latestRoute = writable("");