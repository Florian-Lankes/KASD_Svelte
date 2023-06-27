<script lang="ts">
    import { onMount} from "svelte";
    // import { secureURL } from "../stores.ts";
    import {KASDMapsService} from "../services/KASD-Maps-service.ts";
    import {invalidateAll} from "$app/navigation";

    let widget; // TODO ts
    export let passedData; // TODO ts

    onMount(async () => {
        if ('cloudinary' in window) {
           widget = window.cloudinary.createUploadWidget({
              cloudName: 'dp5ce5pmu',
              uploadPreset: 'gvtyao2h'
           }, async (error, result) => {
               if (result.info.secure_url != undefined) {
                   // secureURL.update(() => result.info.secure_url);
                   await KASDMapsService.addImageToPlacemark(result.info.secure_url, passedData.placemark._id);
                   invalidateAll();
               }
           });
       }
    });

    function handleClick() {
        if(widget) {
            widget.open();
        }
    }
</script>

<button on:click|preventDefault={handleClick}>Upload Image</button>