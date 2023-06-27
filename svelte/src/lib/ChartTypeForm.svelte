<script lang="ts">
    import {latestChartType, latestRoute} from "../stores.ts";
    import {goto} from "$app/navigation";


    let charttypes = ["bar", "line", "pie"];

    let selectedchart = "";
    function getChartType() {
        // latestChartType.update(() => charttypes.indexOf(selectedchart));
        latestChartType.update(() => selectedchart);
        const route = "/analytics";
        latestRoute.update(() => route);
        goto("/reload");
    }

</script>

<form on:submit|preventDefault={getChartType}>
    <div class="columns">
        <div class="column has-text-centered">
            <label for="charttype" class="title is-5">Charttype:</label>
            <div class="select">
                <select bind:value={selectedchart} id="charttype">
                    {#each charttypes as chart}
                        <option>{chart}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="column">
            <div class="field">
                <div class="control">
                    <button class="button is-link is-light">Submit</button>
                </div>
            </div>
        </div>
    </div>
</form>