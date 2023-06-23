<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { KASDMapsService } from "../services/KASD-Maps-service.js";
    import { user } from "../stores.js"

    let name = "";
    let description = "";
    let latitude = 0;
    let longitude = 0;

    let placemarkList = [];

    let categories = ["Soccer field", "World wonder", "River", "Bridge", "Town", "City", "Forest", "Landscape feature", "National monument", "Walking Trail", "Tree", "Entertainment Venue", "Island", "Archaeological Feature", "Others"];
    let selectedCategory = "";
    let message = "";

    onMount(async () => {
        placemarkList = await KASDMapsService.getAllPlacemarks();
    });

    async function add() {
        if (name && description && latitude && longitude && selectedCategory) {
            // const candidate = candidateList.find((candidate) => candidate.lastName == candidateNames[0] && candidate.firstName == candidateNames[1]);
            const placemark = {
                name: name,
                category: selectedCategory,
                description: description,
                image: "",
                location: {latitude: latitude, longitude: longitude},
            };
            console.log(placemark);
            const success = await KASDMapsService.addPlacemark(placemark);
            if (!success) {
                message = "Couldn't add Placemark. Something went wrong";
                return;
            }
            message = `You added Placemark ${name}`;
        } else {
            message = "Please select all required fields";
        }
    }
</script>

<form on:submit|preventDefault={add}>
    <div class="field">
        <label class="label" for="name">Enter Name</label>
        <input bind:value={name} class="input" id="name" name="name" type="text" />
    </div>
    <div class="field">
        <label class="label" for="description">Enter Description</label>
        <input bind:value={description} class="input" id="description" name="description" type="text" />
    </div>
    <div>
        <div class="field">
            <label class="label" for="latitude">Enter Latitude</label>
            <input bind:value={latitude} class="input" id="latitude" name="latitude" type="number" min=-90 max=90 step="0.000000000000001"/>
        </div>
        <div class="field">
            <label class="label" for="longitude">Enter Longitude</label>
            <input bind:value={longitude} class="input" id="longitude" name="longitude" type="number" min=-180 max=180 step="0.000000000000001"/>
        </div>
    </div>
    <div class="field">
        <div class="select">
            <select bind:value={selectedCategory}>
                {#each categories as category}
                    <option>{category}</option>
                {/each}
            </select>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Add Placemark</button>
        </div>
    </div>
    <div class="box">
        {message}
    </div>
</form>
