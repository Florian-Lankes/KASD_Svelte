<script lang="ts">
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import EditPlacemarkForm from "$lib/EditPlacemarkForm.svelte";
    import DisplayImages from "$lib/DisplayImages.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {KASDMapsService} from "../../../../services/KASD-Maps-service";
    import type {Placemark} from "../../../../services/types";
    import {latestRoute} from "../../../../stores";

    export let data; // TODO ts
    // $: data = data;

    let placemark:Placemark;

    onMount(async () => {
        console.log(data.placemark._id);
        placemark = await KASDMapsService.getPlacemark(data.placemark._id);
    });


    let fileName = "";
    let files;

    async function addImages() {
        if (files.length > 0) {
            fileName = "";
            for (const element of files) {
                fileName += element.name + ", ";
            }
        }
    }

    async function uploadImages() {
        await KASDMapsService.uploadImage(placemark._id, files);
        const route = "/dashboard/placemark/" + placemark._id;
        latestRoute.update(() => route);
        await goto("/reload");
    }

</script>

<Header>
    <MainNavigator/>
</Header>

<div>
    <div class="box has-text-centered">
        <EditPlacemarkForm passedData={data}/>
        <form on:submit|preventDefault={uploadImages} enctype="multipart/form-data">
            <div id="file-select" class="file has-name is-fullwidth">
                <label class="file-label">
                    <input bind:files on:change={addImages} class="file-input"
                           name="imagefile" type="file" accept="image/png, image/jpeg">
                    <span class="file-cta">
                        <span class="file-icon">
                              <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file…
                        </span>
                    </span>
                    <span class="file-name">{fileName}</span>
                </label>
                <button type="submit" class="button is-info">Upload</button>
            </div>
        </form>
    </div>
    <DisplayImages passedData={data}/>

</div>








