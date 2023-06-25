<script>

    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {latestRoute, latestChartType} from "../../stores.js";

    let route;
    latestRoute.subscribe((value) => {
        route = value;
    });

    onMount(async () => {
        console.log(route);
        await goto(route);
    });
</script>