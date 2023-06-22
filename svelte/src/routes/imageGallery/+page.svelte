<script>
    import Header from '$lib/Header.svelte';
    import MainNavigator from '$lib/MainNavigator.svelte';
    import {onMount} from "svelte";
    import { KASDMapsService } from "../../services/KASD-Maps-service.js";

    let images = [];

    onMount(async () => {
        images = await KASDMapsService.getAllImages();
    });
</script>

<Header>
    <MainNavigator />
</Header>


{#each images as image}
    <img src={image.secure_url} alt="" width="500" height="600">
{/each}