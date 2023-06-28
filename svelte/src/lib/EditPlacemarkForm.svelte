<script lang="ts">
    import type {Location, PassedDataForImage} from "../services/types";
    import {KASDMapsService} from "../services/KASD-Maps-service.ts";
    import {onMount} from "svelte";

    export let passedData: PassedDataForImage;

    let name = "";
    let category = "";
    let description = "";
    let latitude = 0;
    let longitude = 0;
    let message = "";
    onMount(async () => {
        name = passedData.placemark.name;
        category = passedData.placemark.category;
        description = passedData.placemark.description;
        latitude = passedData.placemark.location.latitude;
        longitude = passedData.placemark.location.longitude;
    });

    async function editPlacemark() {
        // edit the placemark
        if(name && category && description){
            const updatedPlacemark = {
                name: name,
                category: category,
                description: description,
                location: {latitude: latitude, longitude: longitude},
                image: passedData.placemark.image
            }
            await KASDMapsService.editPlacemark(passedData.placemark._id, updatedPlacemark);
        }else{
            message = "Please select all required fields";
        }
    }

</script>

<form on:submit|preventDefault={editPlacemark}>
    <label>Edit Placemark:
        <div class="field is horizontal">
            <div class="field-body">
                <div class="field">
                    <label class="label">Title
                        <input class="input" bind:value={name} type="text" name="name" >
                    </label>
                </div>
                <div class="field">
                    <label class="label">Description
                        <input class="input" bind:value={description} type="text" name="description" >
                    </label>

                </div>
                <div class="field">
                    <label class="label">Latitude
                        <input class="input" bind:value={latitude} type="number" min="-90" max="90" name="latitude" step="0.000000000000001" >
                    </label>

                </div>
                <div class="field">
                    <label class="label">Longitude
                        <input class="input" bind:value={longitude} type="number" min="-180" max="180" name="longitude" step="0.000000000000001">
                    </label>

                </div>
                <div class="field">
                    <label class="label">Category
                        <div class="control">
                            <div class="select">
                                <select class="input" bind:value={category} name="category" >
                                    <option>Soccer field</option>
                                    <option>World wonder</option>
                                    <option>River</option>
                                    <option>Bridge</option>
                                    <option>Town</option>
                                    <option>City</option>
                                    <option>Forest</option>
                                    <option>Landscape feature</option>
                                    <option>National monument</option>
                                    <option>Walking Trail</option>
                                    <option>Tree</option>
                                    <option>Entertainment Venue</option>
                                    <option>Island</option>
                                    <option>Archaeological Feature</option>
                                    <option>Others</option>
                                </select>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </label>
    <button formaction="?/editPlacemark">Change Placemark</button>
</form>