<script>
    import {onMount} from "svelte";
    import {KASDMapsService} from "../services/KASD-Maps-service.js";
    let placemarks = [];
    onMount(async () => {
        placemarks = await KASDMapsService.getAllPlacemarks();
    });
</script>
<h1 class="title is-5" >Placemarks: </h1>
<table class="table is-fullwidth">
    <thead>
    <th>Name</th>
    <th>Category</th>
    <th>Description</th>
    <th>Location</th>
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
        </tr>
    {/each}
    </tbody>
</table>