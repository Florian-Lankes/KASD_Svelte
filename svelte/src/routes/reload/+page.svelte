<script>

    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {latestRoute, latestChartType} from "../../stores.ts";

    let route;
    latestRoute.subscribe((value) => {
        route = value;
    });

    onMount(async () => {
        await goto(route);
    });
</script>