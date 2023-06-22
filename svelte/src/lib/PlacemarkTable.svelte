<script>
    import {onMount} from "svelte";
    import {KASDMapsService} from "../services/KASD-Maps-service.js";
    let placemarks = [];

    export let propValue;

    onMount(async () => {
        placemarks = await KASDMapsService.getAllPlacemarks();

        console.log("propValue: ");
        console.log(propValue);
        if(propValue != undefined) {
            placemarks = propValue.group.placemarks;
        }
    });
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
            </tr>
        {/each}
        </tbody>
    </table>
</div>
