<script>

    import axios from "axios";
    import {KASDMapsService} from "../services/KASD-Maps-service.js";
    import {invalidateAll} from "$app/navigation";

    export let passedImages

    async function deleteImage(url) {
        await KASDMapsService.deleteImage(url);
        invalidateAll();
    }
</script>

<div class="box has-text-centered">
    <h1 class="title is-5" >Images</h1>
    {#each passedImages.images as image}
        <img src={image.secure_url} class="m-2" alt="" width="500" height="600">
        <button  class="button is-danger" on:click={() => deleteImage(image.secure_url)}><i class="fas fa-trash"></i></button>
    {/each}
</div>
