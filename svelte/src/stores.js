import {writable} from "svelte/store";

export const user = writable({
    email: "",
    token: "",
    userId: "",
    // isAdmin: "",
});


export const latestPlacemark = writable(null);

export const latestChartType = writable(0);

export const secureURL = writable(null);