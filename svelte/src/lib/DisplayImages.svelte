<script lang="ts">
    import {KASDMapsService} from "../services/KASD-Maps-service.ts";
    import {invalidateAll} from "$app/navigation";
    import type {PassedDataForImage} from "../services/types";
    import {onMount} from "svelte";

    export let passedData: PassedDataForImage;

    onMount(async () => {
        console.log(passedData);
    });
    async function deleteImage(url) {
        await KASDMapsService.deleteImage(url, passedData.placemark._id);
        invalidateAll();
    }
</script>

<div class="box has-text-centered">
    <h1 class="title is-5" >Images</h1>
    {#each passedData.images as image}
        <img src={image.secure_url} class="m-2" alt="" width="500" height="600">
        {#if passedData.placemark != null}
            <button  class="button is-danger" on:click={() => deleteImage(image.secure_url)}><i class="fas fa-trash"></i></button>
        {/if}
    {/each}
</div>
