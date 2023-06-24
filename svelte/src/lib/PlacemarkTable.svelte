<script>
    import {onMount} from "svelte";
    import {KASDMapsService} from "../services/KASD-Maps-service.js";
    let placemarks = [];
    let groups = [];

    export let propValue;

    onMount(async () => {
        placemarks = await KASDMapsService.getAllPlacemarks();
        const loggedInUserId = KASDMapsService.getUserId();
        groups = await KASDMapsService.getUserGroups(loggedInUserId);
        if(propValue != undefined) {
            placemarks = propValue.group.placemarks;
        }
    });

    let group;
    let placemarkId
    async function addToGroup() {
        // add placemarkId to group._id
        const response = await KASDMapsService.addPlacemarkToGroup(placemarkId, group._id);

    }
</script>
<div class="column box has-text-centered m-4">
    <h1 class="title is-5" >Placemarks: </h1>
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
