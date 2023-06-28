<script lang="ts">
    import {onMount} from "svelte";
    import {KASDMapsService} from "../services/KASD-Maps-service.ts";
    import {latestRoute} from "../stores.ts";
    import {goto} from "$app/navigation";
    import type {Group} from "../services/types";
    let placemarks = [];
    let groups = [];
    let title = "Placemarks:"
    export let propValue: object;
    export let titlePage: string;

    onMount(async () => {
        placemarks = await KASDMapsService.getAllPlacemarks();
        groups = await KASDMapsService.getUserGroups();
        if(propValue != undefined) {
            placemarks = propValue.group.placemarks;
        }
        if(titlePage != undefined){
            title = titlePage;
        }

    });

    let group: Group;
    let placemarkId:string;
    async function addToGroup() {
        // group is null for standard value
        if(group != null){
            const response = await KASDMapsService.addPlacemarkToGroup(placemarkId, group._id);
        }

    }

    async function deletePlacemark(placemarkId: string) {
        // add placemarkId to group._id
        const response = await KASDMapsService.deletePlacemark(placemarkId);
        if(response){
            const route = "/dashboard";
            latestRoute.update(() => route);
            await goto("/reload");
        }
    }
</script>
<div class="column box has-text-centered m-4">
    <h1 class="title is-5" >{title} </h1>
    <table class="table is-fullwidth">
        <thead>
        <th>Name</th>
        <th>Category</th>
        <th>Description</th>
        <th>Location</th>
        <th>Edit</th>
        </thead>
        <tbody>
        {#each placemarks as placemark}
            <tr>
                <td>
                    {placemark.name}
                </td>
                <td>
                    {placemark.category}
                </td>
                <td>
                    {placemark.description}
                </td>
                <td>
                    {placemark.location.latitude}, {placemark.location.longitude}
                </td>
                <td>
                    <a href="/dashboard/placemark/{placemark._id}" class="button">
                        <i class="fas fa-folder-open"></i>
                    </a>
                </td>
                <td>
                    <button on:click={() => deletePlacemark(placemark._id)}>
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td>
                    <form on:click={addToGroup}>
                        <select bind:value={group} on:change="{() => placemarkId = placemark._id}">
                            {#each groups as group}
                                <option value={group}>
                                    {group.title}
                                </option>
                            {/each}
                        </select>

                        <input type="hidden" bind:value={placemarkId} />

                    </form>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
